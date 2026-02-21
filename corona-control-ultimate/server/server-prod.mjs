import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Request Logging for Debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(compression());

// Serve Static Files from 'dist'
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Game State
const players = new Map();

// WebSocket Logic
io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  players.set(socket.id, {
    id: socket.id,
    position: [0, 2, 0],
    rotation: [0, 0, 0],
    health: 100,
    lastUpdate: Date.now()
  });

  socket.emit("gameState", {
    players: Array.from(players.values()),
    tension: 0
  });

  socket.broadcast.emit("playerJoined", { id: socket.id });

  socket.on("updatePosition", (data) => {
    if (players.has(socket.id)) {
      const p = players.get(socket.id);
      p.position = data.pos;
      p.rotation = data.rot;
      p.lastUpdate = Date.now();
      socket.broadcast.emit("playerMoved", { id: socket.id, pos: data.pos, rot: data.rot });
    }
  });

  socket.on("cloudSave", (saveData) => {
    console.log(`☁️ Cloud Save from ${socket.id}`);
    socket.emit("cloudSaveSuccess");
  });

  socket.on("disconnect", () => {
    console.log('Player disconnected:', socket.id);
    players.delete(socket.id);
    io.emit("playerLeft", { id: socket.id });
  });
});

// Fallback for SPA Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 7860;

server.on('error', (err) => {
  console.error('❌ SERVER ERROR:', err);
});

server.listen(PORT, '0.0.0.0', () => {
  const addr = server.address();
  console.log(`🚀 Production Server running on ${addr.address}:${addr.port}`);
});
