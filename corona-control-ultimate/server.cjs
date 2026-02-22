'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '7860', 10);
const STATIC_DIR = path.join(__dirname, 'dist');

console.log(`===== Application Startup at ${new Date().toISOString()} =====`);
console.log(`📁 Static assets path: ${STATIC_DIR}`);
console.log(`📡 PORT=${PORT}, NODE_ENV=${process.env.NODE_ENV}`);

// Check if dist directory exists
if (!fs.existsSync(STATIC_DIR)) {
  console.error(`❌ FATAL: dist directory not found at ${STATIC_DIR}`);
  console.log('📂 Contents of __dirname:', fs.readdirSync(__dirname));
  process.exit(1);
}
console.log(`✅ dist directory found. Contents: ${fs.readdirSync(STATIC_DIR).join(', ')}`);

// MIME types
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.mp3':  'audio/mpeg',
  '.ogg':  'audio/ogg',
  '.wav':  'audio/wav',
  '.glb':  'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.hdr':  'image/vnd.radiance',
  '.ktx2': 'image/ktx2',
};

const server = http.createServer((req, res) => {
  // Health check endpoint for HuggingFace
  if (req.url === '/health' || req.url === '/healthz') {
    console.log('💓 Health check OK');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // Log every request
  console.log(`📡 ${req.method} ${req.url}`);

  // Decode URL and strip query string, then remove leading slash for safe join
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    urlPath = req.url.split('?')[0];
  }
  // Remove leading slash if present to avoid absolute path traversal
  if (urlPath.startsWith('/')) {
    urlPath = urlPath.slice(1);
  }

  // Serve static file or SPA fallback
  const exactPath = path.join(STATIC_DIR, urlPath);

  fs.stat(exactPath, (err, stat) => {
    if (!err && stat.isFile()) {
      serveFile(exactPath, res);
    } else {
      // SPA fallback only for routes (paths without extension)
      const hasExtension = path.extname(urlPath).length > 0;
      if (hasExtension) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
      } else {
          serveFile(path.join(STATIC_DIR, 'index.html'), res);
      }
    }
  });
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    // Cache control
    const isHashed = /\.[a-f0-9]{8,}\.(js|css)$/.test(filePath);
    const cacheControl = ext === '.html' || !isHashed
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=31536000, immutable';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
}

// Keep-alive settings
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.on('error', (err) => {
  console.error('❌ Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} already in use`);
    process.exit(1);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const address = server.address();
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Address: ${typeof address === 'string' ? address : JSON.stringify(address)}`);
});

// Prevent crashes
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received');
  server.close(() => process.exit(0));
});
