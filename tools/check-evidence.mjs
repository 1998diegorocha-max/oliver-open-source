import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const receipt = JSON.parse(await readFile(new URL('../evidence/turn-controller-v0.1.0/validation.json', import.meta.url), 'utf8'));
if (receipt.format !== 1 || !receipt.source_sha256 || Object.keys(receipt.source_sha256).length === 0) {
  throw new Error('Missing or unsupported source-validation receipt');
}
let checked = 0;
for (const [path, expected] of Object.entries(receipt.source_sha256)) {
  const target = resolve(root, path);
  if (!target.startsWith(root.endsWith(sep) ? root : root + sep)) throw new Error('Receipt path escapes checkout');
  const actual = createHash('sha256').update(await readFile(target)).digest('hex');
  if (actual !== expected) throw new Error(`Source differs from recorded validation: ${path}`);
  checked++;
}
console.log(`PASS: ${checked} source files match the validation receipt. Run node --test to reproduce the tests.`);
