import { before, after, test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createDemoServer } from '../examples/turn-lab/server.mjs';

let server;
let base;
before(async () => {
  server = createDemoServer(); server.listen(0, '127.0.0.1');
  await once(server, 'listening'); base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  const closed = once(server, 'close'); server.close(); server.closeAllConnections(); await closed;
});
test('the demo serves its explicit simulation notice and entry module', async () => {
  const response = await fetch(base); assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /This is a simulation/); assert.match(html, /src="\/app.mjs"/);
});
test('the demo serves the actual reusable controller as a JavaScript module', async () => {
  const response = await fetch(`${base}/turn-controller.mjs`);
  assert.equal(response.status, 200); assert.match(response.headers.get('content-type'), /javascript/);
  assert.match(await response.text(), /export function createTurnController/);
});
test('both browser UI assets are available from the local server', async () => {
  for (const path of ['/app.mjs', '/style.css']) assert.equal((await fetch(base + path)).status, 200);
});
test('the HTTP policy blocks external connections, inline scripts, and form submission', async () => {
  const response = await fetch(base);
  const csp = response.headers.get('content-security-policy');
  assert.match(csp, /connect-src 'none'/); assert.match(csp, /form-action 'none'/);
  assert.match(csp, /script-src 'self'/); assert.doesNotMatch(csp, /unsafe-inline/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
});
test('HTTP requests cannot retrieve the repository license or parent files through the demo', async () => {
  for (const path of ['/LICENSE', '/package.json', '/%2e%2e%2fLICENSE', '/private-cache/token', '/unknown']) {
    assert.equal((await fetch(base + path)).status, 404);
  }
});
test('the demo rejects mutation methods and has no request-submission API', async () => {
  for (const method of ['POST', 'PUT', 'DELETE']) {
    const response = await fetch(base, { method }); assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'GET, HEAD');
  }
});
test('HEAD reports an asset type without returning the asset body', async () => {
  const response = await fetch(base, { method: 'HEAD' }); assert.equal(response.status, 200);
  assert.equal(await response.text(), ''); assert.match(response.headers.get('content-type'), /text\/html/);
});
