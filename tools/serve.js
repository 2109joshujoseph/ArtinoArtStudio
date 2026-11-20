const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const port = Number(process.argv[2] || 4321);
const appPort = Number(process.argv[3] || 4200);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function proxy(req, res) {
  const target = req.url.replace(/^\/site/, '') || '/';
  const upstream = http.request(
    { hostname: 'localhost', port: appPort, path: target, method: req.method, headers: { ...req.headers, host: `localhost:${appPort}` } },
    (upstreamRes) => {
      const headers = { ...upstreamRes.headers };
      const isHtml = (headers['content-type'] || '').includes('text/html');
      if (!isHtml) {
        res.writeHead(upstreamRes.statusCode || 502, headers);
        upstreamRes.pipe(res);
        return;
      }

      const chunks = [];
      upstreamRes.on('data', (chunk) => chunks.push(chunk));
      upstreamRes.on('end', () => {
        const body = Buffer.concat(chunks)
          .toString('utf8')
          .replace(/<base href="\/"\s*\/>/, '<base href="/site/" />')
          .replace('src="/@vite/client"', 'src="/site/@vite/client"');
        delete headers['content-length'];
        headers['content-length'] = Buffer.byteLength(body);
        res.writeHead(upstreamRes.statusCode || 502, headers);
        res.end(body);
      });
    },
  );
  upstream.on('error', () => {
    res.writeHead(502, { 'content-type': 'text/plain' }).end('Proxy error');
  });
  req.pipe(upstream);
}

http
  .createServer((req, res) => {
    if ((req.url || '').startsWith('/site')) {
      proxy(req, res);
      return;
    }

    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'content-type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`serving ${root} on http://localhost:${port} (proxy /site -> ${appPort})`));
