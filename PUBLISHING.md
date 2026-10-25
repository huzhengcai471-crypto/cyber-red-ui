# Publishing

The project is published at `https://github.com/huzhengcai471-crypto/cyber-red-ui`.
The repository contains the complete source and bundled media assets. The
versioned install tarball is attached to each GitHub Release and excluded from
Git history.

Install the current release with:

```powershell
dsh plugin --profile desktop add https://github.com/huzhengcai471-crypto/cyber-red-ui/releases/download/v1.1.0/dsh-cyber-red-ui-1.1.0.tgz
```

Add `dsh-cyber-red-ui` to `dsh.profile.bundles` in the target profile and
restart DSH.

## Verify and package

```powershell
npm run check
node tests/plan-features.mjs
node tests/settings-isolation.mjs
npm run check:package
npm pack
```

The package should be named `dsh-cyber-red-ui-1.1.0.tgz` and contain the
18 bundled media assets.

## Publish a release

Commit the source and push `main`, then create and push the matching version
tag. Attach the generated tarball to the GitHub Release for that tag.

```powershell
git add .
git commit -m "Release 1.1.0"
git push origin main
git tag -a v1.1.0 -m "dsh-cyber-red-ui 1.1.0"
git push origin v1.1.0
gh release create v1.1.0 dsh-cyber-red-ui-1.1.0.tgz --title "dsh-cyber-red-ui 1.1.0" --notes-file RELEASE_NOTES_v1.1.0.md
```
