# dsh-cyber-red-ui · 长征机

A crimson-neon Long March Machine theme for **DeepSeek Harness (DSH)** — black base, blood-red
glow, scanlines, a lab status rail, dynamic video wallpapers, a music player, and its own
settings page.

Static conversation wallpapers include First Contact, Lock No. 1, and The Sun Rises as Usual.

黑底正红霓虹主题：扫描线叠加、实验状态栏、动态视频壁纸、音乐播放器，并提供独立设置页。

> Screenshots live in `docs/` once published.

---

## 安装

这个插件带 197 MB 媒体资源，安装包约 200 MB。直接把下面整段提示词交给 AI，
它会替你完成探测、下载、校验和安装；也可以照着里面的步骤自己做。

```text
帮我把 WorkBuddy（DSH）的长征机主题插件 dsh-cyber-red-ui 装到我本机。

## 背景
这是 DSH 客户端插件，装在 DSH 的 profile 里，不是 npm 全局包。
它带 197 MB 媒体资源，安装包约 200 MB，所以下载可能较慢。

## 第一步：探测环境，别急着装
1. 找到 DSH 的 profile 目录：
   - Windows: C:\Users\<用户名>\.dsh\profiles\
   - macOS/Linux: ~/.dsh/profiles/
   列出其中所有子目录名（通常有 desktop 或 default）。
2. 读目标 profile 里的 package.json，告诉我现在的
   dependencies 和 dsh.profile.bundles 分别有什么。
3. 备份 package.json 和 pnpm-lock.yaml。
4. 确认磁盘剩余空间 > 1 GB。
做完这步停下来，把结果给我看，等我确认后再继续。

## 第二步：下载安装包
GitHub 直连在大陆可能只有 0.04 MB/s，200 MB 要一个多小时。
用镜像下载，实测 132 秒完成：

https://ghfast.top/https://github.com/huzhengcai471-crypto/cyber-red-ui/releases/download/v1.2.0/dsh-cyber-red-ui-1.2.0.tgz

备选镜像（把前缀换成）：https://gh-proxy.com/

下载命令示例：
curl.exe -L --max-time 900 -o dsh-cyber-red-ui-1.2.0.tgz "<上面的地址>"

## 第三步：校验文件（必做）
正确的 SHA256：
18ab6466b852e97f9fae029d24b9f12dca51c52ee889298c56cfe0d487679c84

Windows:  Get-FileHash dsh-cyber-red-ui-1.2.0.tgz -Algorithm SHA256
macOS:    shasum -a 256 dsh-cyber-red-ui-1.2.0.tgz

不匹配就不要安装，换镜像重下或改直连。
通过后再确认哈希本身是真的（走 api.github.com，不要经镜像）：
https://api.github.com/repos/huzhengcai471-crypto/cyber-red-ui/releases/tags/v1.2.0
看 assets[0].digest 是否等于上面的值。

## 第四步：安装
dsh plugin --profile <profile名> add file:<tgz绝对路径>

例如：
dsh plugin --profile desktop add file:C:/Users/me/Downloads/dsh-cyber-red-ui-1.2.0.tgz

如果命令提示 profile 被桌面端独占管理而拒绝执行，改用手动安装：
1. 解压 tgz（tar -xzf 或改名 .zip 后解压），会得到 package 目录
2. 把 package 里的内容整个复制到 <profile目录>/node_modules/dsh-cyber-red-ui/
3. 继续第五步
注意：DSH 运行中可能占用文件，复制失败就先关掉 DSH。

## 第五步：注册插件
打开 profile 的 package.json，确认两处：
1. dependencies 里有 "dsh-cyber-red-ui": "file:<tgz路径>"
2. dsh.profile.bundles 数组里有 "dsh-cyber-red-ui"，没有就追加

## 第六步：重启并验证
重启 DSH。设置里能看到「长征计划」页面（主开关、头像、壁纸、音轨）即成功。
界面左下方会出现「实验状态」按钮。

## 如果没效果
1. Ctrl+Shift+R 强制刷新（浏览器可能缓存旧 bundle）
2. 确认 bundles 里有 "dsh-cyber-red-ui"
3. 检查 node_modules/dsh-cyber-red-ui/client.js 是否约 8.2 MB。
   如果只有几百字节，那是指针文件，说明下到了仓库源码而不是 Release 包，重下
4. 看 DSH 启动日志有无 dsh-cyber-red-ui 报错
5. 确认 DSH 版本是 0.2.x

## 已知问题
不要用 dsh plugin add github:... 或 pnpm 直接指向仓库源码。
仓库媒体文件用 Git LFS 存储，没装 git-lfs 会拿到指针文本，
插件装上了但壁纸和音乐都不响。必须用 Release 里的 tgz。

## 请遵守
每步做完告诉我结果，不要一口气跑完。改文件前先备份。
校验不通过就停下来问我，不要硬装。
```

### 也可以手动一步步来

提示词里的六个步骤本身就是完整流程。如果不需要 AI 代劳，按顺序做即可，
关键只有三点：

1. **用镜像下载**，直连会非常慢
2. **校验 SHA256**，且校验值要从 `api.github.com` 取，不要从镜像取
3. **只装 Release 里的 tgz**，不要从仓库源码安装（媒体是 LFS 指针）

### 安装完成后

刷新界面，左下角出现「实验状态」按钮即安装成功。

### 开发模式

需要改代码时链接源码目录：

```powershell
git lfs install
git clone https://github.com/huzhengcai471-crypto/cyber-red-ui.git
dsh plugin --profile desktop add link:C:/path/to/cyber-red-ui
```

克隆前务必先装 git-lfs，否则媒体文件是指针文本。

---

## Git LFS

The bundled media (`assets/`) is stored with **Git LFS**. A clone without it
produces pointer text instead of real files, and the plugin will not play any
wallpaper or track.

```powershell
git lfs install          # once per machine
git clone https://github.com/huzhengcai471-crypto/cyber-red-ui.git
```

If you already cloned without LFS, fetch the objects in place:

```powershell
git lfs install
git lfs pull
```

**Installing the plugin does not require cloning the repo.** The release
tarball `dsh-cyber-red-ui-1.2.0.tgz` already contains the real media and is the
recommended install path (see above). Clone only when you want to develop.

---

## 功能

| 功能 | 说明 |
|---|---|
| **主题令牌** | 黑底 + 正红霓虹，覆盖文字、边框、背景与状态色 |
| **扫描线 / 暗角** | 全窗口装饰层，纯 CSS 绘制，不拦截点击 |
| **实验状态栏** | 右侧可收起面板：系统监控、世界状态、代码滚动、指标矩阵 |
| **动态视频壁纸** | 9 段内置视频背景，支持 Range 流式播放 |
| **静态壁纸** | 多张内置图片背景，包含「第一次接触」「一号船闸」 |
| **音乐播放器** | 15 首内置曲目 |
| **自定义媒体** | 设置页可上传音频、头像图片/GIF 与会话背景图片/GIF/视频；文件保存在浏览器 IndexedDB 中，可在对应列表中删除 |
| **实验状态栏顶部标语** | 自定义文案，仿宋加粗 |
| **设置页** | 「长征计划」：主开关、文案编辑、头像、品牌图案、壁纸、亮度、音轨 |

### 关闭主题

在「长征计划」设置页顶部切换主开关，或清除 Local Storage 的 `cr-plan-enabled`。
关闭后所有改写的文案都会还原成 DSH 原文。

---

## 兼容性

- DSH `0.2.x`
- Node `^22.15.0 || >=24.0.0`
- 平台：`web`（桌面端与浏览器端通用）
- 需要 `@deepseek-ai/dsh-client-ui-conversation`（DSH 自带）

---

## 目录结构

```
cyber-red-ui/
├─ index.js            # 宿主侧：HTTP 路由（监控指标 / 世界状态 / 媒体流）
├─ client.js           # 浏览器侧：主题、装饰层、状态栏、设置页
├─ cordis.patch.yml    # 把插件插入 DSH 的插件树
├─ package.json
├─ icon.svg
├─ locale/{en,zh}.json
└─ assets/             # 视频、音频、头像（约 197 MB）
```

`assets/` 全部随包分发，**不依赖任何本地文件或网络资源**。

---

## 体积说明

媒体资源约 197 MB（视频、FLAC 与 MP3 音频），这是包体较大的唯一原因。安装时间主要花在下载上。

宿主侧采用**惰性加载**：进程启动时不读任何媒体文件，只有真正请求某个壁纸/音轨时才打开文件流，
因此这些素材不会常驻内存。

---

## 已知限制

- 设置页里「启动动画」「插件市场」等**其他插件**的页面不再被本插件改色（已刻意隔离）。
- 仿宋字体使用系统自带 `simfang.ttf`；系统缺失时回退到宋体。

---

## 许可证

MIT — 见 [LICENSE](LICENSE)。

内置美术与音频素材版权归各自作者所有，随包仅为功能演示，请勿单独分发。
