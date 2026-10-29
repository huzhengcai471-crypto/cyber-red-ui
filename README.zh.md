# cyber-red-ui

面向 DeepSeek Harness 的赛博红控台插件，包含实验状态栏、动态会话背景、播放器和设置页。内置静态背景包括「第一次接触」「一号船闸」等选项。

设置页支持上传自定义头像，以及图片、GIF 或视频会话背景；自定义媒体保存在浏览器 IndexedDB 中，可从对应列表删除。

## 从 GitHub 安装

```powershell
dsh plugin --profile desktop add github:huzhengcai471-crypto/cyber-red-ui
```

然后在 DSH profile 的 `dsh.profile.bundles` 中加入 `dsh-cyber-red-ui`，重启 DSH。

本项目的媒体、头像和字体资源都随安装包分发，插件运行不依赖开发机的绝对路径。GitHub Release 提供完整源码和可直接安装的 `dsh-cyber-red-ui-1.2.0.tgz`。

## 关于 Git LFS

仓库里的媒体文件（`assets/`）使用 **Git LFS** 存储。如果没有安装 git-lfs 就克隆，
拿到的只是指针文本而不是真实文件，插件将无法播放任何壁纸和音轨。

```powershell
git lfs install          # 每台机器执行一次
git clone https://github.com/huzhengcai471-crypto/cyber-red-ui.git
```

已经用普通方式克隆过的话，就地补齐：

```powershell
git lfs install
git lfs pull
```

**安装插件不需要克隆仓库。** Release 里的 `dsh-cyber-red-ui-1.2.0.tgz`
本身就包含真实媒体文件，这是推荐的安装方式（见上文）。只有在需要开发时才需要克隆。
