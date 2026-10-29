# Publishing checklist

Version 1.0.0 source is published in the public GitHub repository:
`https://github.com/huzhengcai471-crypto/cyber-red-ui`.

The repository includes the complete source and all bundled media assets.
The `*.tgz` package is intentionally excluded from Git; users can install
directly from the repository with:

```powershell
dsh plugin --profile desktop add github:huzhengcai471-crypto/cyber-red-ui
```

Add `dsh-cyber-red-ui` to `dsh.profile.bundles` in the target profile and
restart DSH.

## 1. Quick sanity checks

```powershell
node --check index.js
node --check client.js
node -e "for (const f of ['client.js','index.js']) { const s=require('fs').readFileSync(f,'utf8'); if (/\uFFFD/.test(s)) throw new Error('mojibake in '+f) }"
```

## 2. Pack

```powershell
pnpm pack
```

Expected: `dsh-cyber-red-ui-1.0.0.tgz`, ~82 MB.

## 3. Publish future changes to GitHub

```powershell
git add .
git commit -m "Describe the change"
git push -u origin main
```

> The tarball is git-ignored. Publish source; let users install from source.

## 4. Optional: release asset

If you also want a downloadable tarball, attach `dsh-cyber-red-ui-1.0.0.tgz`
to a GitHub Release. Users can then install with:

```powershell
dsh plugin --profile desktop add https://github.com/huzhengcai471-crypto/cyber-red-ui/releases/download/v1.0.0/dsh-cyber-red-ui-1.0.0.tgz
```

## Notes on size

77 MB of the 85 MB package is media (5 videos + 8 FLAC + 3 OGG + 1 WAV + 1 GIF).
A git clone therefore transfers ~82 MB. If that is too heavy, the options are:

- drop the largest audio tracks, or
- publish the tarball as a Release asset and keep the repo media-free.

The host half is already lazy: importing it costs ~3 MB of RSS regardless of
asset size, so runtime memory is not a concern.
