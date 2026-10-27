import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const routes = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
  ['/turn-controller.mjs', ['../../packages/turn-controller/src/turn-controller.mjs', 'text/javascript; charset=utf-8']],
]);
export function createDemoServer() {
  return createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'none'; img-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }); response.end('Method not allowed'); return;
    }
    let path;
    try { path = new URL(request.url, 'http://127.0.0.1').pathname; }
    catch { response.writeHead(400); response.end('Bad request'); return; }
    const route = routes.get(path);
    if (!route) { response.writeHead(404); response.end('Not found'); return; }
    try {
      const body = await readFile(new URL(route[0], import.meta.url));
      response.writeHead(200, { 'Content-Type': route[1] });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(500); response.end('Demo asset unavailable');
    }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new RangeError('PORT must be between 1 and 65535');
  const server = createDemoServer();
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`OLIVER Turn Lab: http://127.0.0.1:${port}\nLocal simulation; no microphone, model, or external requests.`));
}
