const express = require('express');
const compression = require('compression');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
let db = null;
try {
  db = require('./server/database.cjs');
} catch (e) {
  db = null;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // PRODUCTION: Set CORS_ORIGIN env var!
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 7860;
const distPath = path.join(__dirname, 'dist');
const ONE_YEAR = 31536000;

app.use(compression());

app.get('/health', (_, res) => {
  console.log('💓 Health check received');
  res.status(200).send('ok');
});

// Trust proxy for Hugging Face
app.set('trust proxy', 1);

// --- SECURITY HEADERS ---
app.use((req, res, next) => {
    // ENHANCED CSP (V6 Hybrid): Relaxed for HF iframe compatibility
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "connect-src 'self' wss: https://*.google.com https://*.googleapis.com https://raw.githack.com https://raw.githubusercontent.com; " +
        "img-src 'self' data: blob: https://*.google.com https://*.gstatic.com https://raw.githack.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "frame-src 'self' https://*.huggingface.co; " +
        "worker-src 'self' blob:; " +
        "object-src 'none';"
    );
    
    // Permissions-Policy: Suppress console noise for unrecognized features
    res.setHeader('Permissions-Policy', 'ambient-light-sensor=(), battery=(), document-domain=(), layout-animations=(), legacy-image-formats=(), oversized-images=(), vr=(), wake-lock=()');

    // Headers (Relaxed for Iframe compatibility)
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');

    // Robust MIME Mapping (V6 Hybrid)
    const ext = path.extname(req.path).toLowerCase();
    const mimeMap = {
        '.wasm': 'application/wasm',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.hdr': 'image/vnd.radiance',
        '.ktx2': 'image/ktx2',
        '.glb': 'model/gltf-binary',
        '.ttf': 'font/ttf',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
    };
    if (mimeMap[ext]) {
        res.type(mimeMap[ext]);
    }
    next();
});

// Robust Asset Routing: Prevent index.html fallback for missing static files
app.use(['/assets', '/src', '/node_modules', '/@fs'], (req, res, next) => {
    const filePath = path.join(distPath, req.baseUrl, req.path);
    // If it's a file request (has extension) but doesn't exist, kill it here with 404
    if (req.path.includes('.')) {
        res.status(404).send('Asset not found');
    } else {
        next();
    }
});

// Static serving mit gezielten Cache-Headern
app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.glb') || filePath.endsWith('.ktx2') || filePath.endsWith('.wasm')) {
      res.setHeader('Cache-Control', `public, max-age=${ONE_YEAR}, immutable`);
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (filePath.endsWith('.js')) {
      res.type('application/javascript');
    }
  }
}));

// SPA-Fallback (React Router) - ONLY for non-file requests
app.get('*', (req, res) => {
  // Prevent fallback for files (anything with a dot in the last segment)
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return res.status(404).send('Not Found');
  }
  if (req.path.startsWith('/socket.io')) return;
  res.sendFile(path.join(distPath, 'index.html'));
});

// --- MULTIPLAYER LOGIK ---
const players = new Map();
let tensionLevel = 0;
const MAX_DISTANCE_PER_TICK = 5.0;

function validateMovement(oldPos, newPos) {
    if (!oldPos) return true;
    const dx = newPos[0] - oldPos[0];
    const dy = newPos[1] - oldPos[1];
    const dz = newPos[2] - oldPos[2];
    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    return dist <= MAX_DISTANCE_PER_TICK;
}

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);
  if (db && typeof db.updateUser === 'function') db.updateUser(socket.id, { online: true });

  players.set(socket.id, {
    id: socket.id,
    position: [0, 2, 0],
    rotation: [0, 0, 0],
    health: 100,
    lastUpdate: Date.now(),
    violations: 0
  });

  socket.emit("gameState", {
    players: Array.from(players.values()),
    tension: tensionLevel,
    highscores: db && typeof db.getHighscores === 'function' ? db.getHighscores() : []
  });

  socket.broadcast.emit("playerJoined", { id: socket.id });

  socket.on("updatePosition", (data) => {
    if (players.has(socket.id)) {
      const p = players.get(socket.id);
      if (validateMovement(p.position, data.pos)) {
          p.position = data.pos;
          p.rotation = data.rot;
          p.lastUpdate = Date.now();
          socket.broadcast.emit("playerMoved", { id: socket.id, pos: data.pos, rot: data.rot });
      } else {
          p.violations = (p.violations || 0) + 1;
          console.warn(`⚠️ Violation from ${socket.id} (${p.violations}/5)`);
          
          if (p.violations >= 5) {
              console.log(`🚫 KICKING Player ${socket.id} for cheating.`);
              socket.emit("kick", { reason: "Speed Hack detected" });
              socket.disconnect();
          } else {
              socket.emit("correction", { pos: p.position });
          }
      }
    }
  });

  // Cloud Save Events (Integrated from server/server.js)
  socket.on("cloudSave", (saveData) => {
      console.log(`☁️ Cloud Save from ${socket.id}`);
      if (db && typeof db.saveCloudData === 'function') {
          db.saveCloudData(socket.id, saveData);
          socket.emit("cloudSaveSuccess");
      }
  });

  socket.on("getCloudSave", () => {
      if (db && typeof db.getCloudData === 'function') {
          const data = db.getCloudData(socket.id);
          socket.emit("cloudData", data);
      }
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
    if (db && typeof db.updateUser === 'function') db.updateUser(socket.id, { online: false });
    io.emit("playerLeft", { id: socket.id });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Robust Production Server running on port ${PORT} (Bound to 0.0.0.0)`);
});
