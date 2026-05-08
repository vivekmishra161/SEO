// UrbanVibe – Simple Static Server (Node.js)
// Run: node server.js
// Then open: http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  // Remove trailing slash
  if (urlPath !== '/' && urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1);

  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try adding .html
      fs.readFile(filePath + '.html', (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 – Page Not Found</h1><p><a href="/">← Home</a></p>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🔥 UrbanVibe is live!`);
  console.log(`   http://localhost:${PORT}\n`);
  console.log(`   Pages:`);
  console.log(`   → Home:    http://localhost:${PORT}/`);
  console.log(`   → Shop:    http://localhost:${PORT}/pages/shop.html`);
  console.log(`   → About:   http://localhost:${PORT}/pages/about.html`);
  console.log(`   → Contact: http://localhost:${PORT}/pages/contact.html`);
  console.log(`   → Cart:    http://localhost:${PORT}/pages/cart.html`);
  console.log(`\n   Press Ctrl+C to stop.\n`);
});
