// Run the publish check when it is available.
//
// Why this indirection exists: `prepack` points at scripts/check-package.mjs,
// but that script only ships when `files` includes scripts/*.mjs. Someone who
// unpacks an .tgz and runs `npm pack` again starts from a tree that may not
// have the script, and a bare `prepack` would fail with MODULE_NOT_FOUND even
// though there is nothing wrong with the package. This wrapper treats a missing
// checker as "nothing to verify here" and lets the pack proceed, while still
// failing the pack if the checker exists and reports a problem.
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const checker = path.join(here, 'check-package.mjs')

if (!existsSync(checker)) {
  console.log('check-package.mjs not present (packed tree); skipping publish check')
  process.exit(0)
}

// The checker sets exitCode rather than throwing, so just run it in-process.
await import(pathToFileURL(checker).href)
if (process.exitCode) {
  console.error('publish check failed; refusing to pack')
  process.exit(process.exitCode)
}
