import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await fs.readFile(path.join(root, 'client.js'), 'utf8');
const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));

assert.match(source, /function fetchJsonWithTimeout\(url, options, timeoutMs\)/);
assert.match(source, /controller\.abort\(\)/);
assert.match(source, /fetchJsonWithTimeout\('\/cyber-red-ui\/metrics'/);
assert.match(source, /fetchJsonWithTimeout\('\/cyber-red-ui\/world-status'/);
assert.match(source, /failedSource/);
assert.match(source, /setTimeout\(function \(\) \{[\s\S]{0,500}failedSource = ''/);
assert.match(source, /data-cr-performance-mode/);
assert.match(source, /cr-performance-mode/);
assert.match(source, /低性能模式/);
assert.equal(pkg.scripts.prepack, 'node scripts/check-package.mjs');

console.log('ok: RPC timeout, video fallback cooldown, performance switch and prepack guard are present');
