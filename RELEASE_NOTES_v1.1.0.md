# dsh-cyber-red-ui 1.1.0

This release improves plan lifecycle behavior and ships a self-contained
install package with the plugin's bundled media.

## Highlights

- Enabling the Long March plan switches DSH appearance to dark and restores
  the previous light or system preference when the plan is disabled.
- The lab status rail and DSH's native right sidebar are mutually exclusive,
  including after the startup-animation gate re-arms the plan.
- Disabling the plan restores the original DSH new-session headline, including
  when the host re-renders that title while the plan is active.
- The package includes the plugin's background videos, music, avatars, and
  other referenced assets; installation does not depend on local asset paths.

## Install

```powershell
dsh plugin --profile desktop add https://github.com/huzhengcai471-crypto/cyber-red-ui/releases/download/v1.1.0/dsh-cyber-red-ui-1.1.0.tgz
```

Add `dsh-cyber-red-ui` to `dsh.profile.bundles` in the DSH profile and restart
DSH.
