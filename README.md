# dsh-cyber-red-ui · 长征机

A crimson-neon Long March Machine theme for **DSH** — black base, blood-red
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
帮我把 DSH 的长征机主题插件 dsh-cyber-red-ui 装到我本机。

## 背景
这是一个 DSH 客户端插件，装在 DSH 的 profile 里，不是 npm 全局包。
它带 197 MB 媒体资源（壁纸/音乐），所以安装包约 200 MB，下载可能较慢。

## 第一步：先探测环境，别急着装
1. 找到 DSH 的 profile 目录：
   - Windows: C:\Users\<你的用户名>\.dsh\profiles\
   - macOS/Linux: ~/.dsh/profiles/
   列出其中所有子目录名，告诉我有哪些（通常有 desktop 或 default）。
2. 读目标 profile 目录里的 package.json，告诉我它现在的
   dependencies 和 dsh.profile.bundles 分别有什么。
3. 把这两个文件先备份一份（package.json 和 pnpm-lock.yaml）。
4. 确认磁盘剩余空间 > 1 GB。

做完这一步先停下来，把探测结果给我看，等我确认后再继续。

## 第二步：下载安装包
推荐用镜像下载（GitHub 直连在大陆可能只有 0.04 MB/s，200 MB 要一个多小时；
用镜像实测 132 秒完成）。

镜像地址（在原始 URL 前拼接）：
https://ghfast.top/https://github.com/huzhengcai471-crypto/cyber-red-ui/releases/download/v1.2.0/dsh-cyber-red-ui-1.2.0.tgz

备选镜像：
https://gh-proxy.com/https://github.com/huzhengcai471-crypto/cyber-red-ui/releases/download/v1.2.0/dsh-cyber-red-ui-1.2.0.tgz

下载命令示例（Windows）：
curl.exe -L --max-time 900 -o dsh-cyber-red-ui-1.2.0.tgz "上面的镜像URL"

## 第三步：校验文件（必做）
下载完必须校验，确认文件没被镜像篡改或传输损坏。

正确的 SHA256 是：
18ab6466b852e97f9fae029d24b9f12dca51c52ee889298c56cfe0d487679c84

Windows 校验：
Get-FileHash dsh-cyber-red-ui-1.2.0.tgz -Algorithm SHA256

macOS/Linux 校验：
shasum -a 256 dsh-cyber-red-ui-1.2.0.tgz

如果哈希不匹配，不要安装，换镜像重下或改用直连。

校验通过后再确认一下这个哈希本身是不是真的：
https://api.github.com/repos/huzhengcai471-crypto/cyber-red-ui/releases/tags/v1.2.0
看返回里 assets[0].digest 字段是否等于上面的值。
（这一步是防止镜像连同文件一起替换哈希，务必走 api.github.com 而不是镜像。）

## 第四步：安装
用 DSH 自带的插件命令，把路径换成你实际下载的位置：

dsh plugin --profile <profile名> add file:<下载文件的绝对路径>

例如：
dsh plugin --profile desktop add file:C:/Users/me/Downloads/dsh-cyber-red-ui-1.2.0.tgz

如果 dsh 命令提示 profile 被桌面端独占管理、拒绝执行，
改成手动方式（往下看「手动安装」）。

## 第五步：注册插件
打开 profile 的 package.json，确认两处：

1. dependencies 里有：
   "dsh-cyber-red-ui": "file:<你的tgz路径>"

2. dsh.profile.bundles 数组里要有 "dsh-cyber-red-ui"
   没有就追加进去。例如：
   "bundles": [
     "@deepseek-ai/dsh-base",
     "@deepseek-ai/dsh-web-app",
     "dsh-cyber-red-ui"
   ]

## 第六步：重启并验证
重启 DSH。然后在设置里打开「长征计划」页面；能看到主开关、文案编辑、
头像、壁纸、音轨这些选项，就说明装好了。

界面左下方会出现「实验状态」按钮。

---

## 手动安装（dsh 命令被拒绝时用）

1. 在 profile 目录下建个文件夹放安装包，避免路径以后失效：
   <profile目录>\plugin-tarballs\

2. 把 tgz 改成 zip 后缀解压（tgz 就是 gzip 的 tar）：
   或者直接用 tar 命令：
   tar -xzf dsh-cyber-red-ui-1.2.0.tgz

3. 解压后会有个 package 目录，把里面的内容整个复制到：
   <profile目录>\node_modules\dsh-cyber-red-ui\

4. 然后按「第五步」改 package.json 的两处。

5. 重启 DSH。

注意：如果 DSH 正在运行，node_modules 里的文件可能被占用导致复制失败，
先关掉 DSH 再操作。

---

## 如果安装后没效果

按顺序排查，把结果告诉我：
1. 界面按 Ctrl+Shift+R 强制刷新一次（浏览器缓存可能还拿着旧的 bundle）
2. 确认 profile 的 package.json 里 bundles 确实有 "dsh-cyber-red-ui"
3. 检查 <profile目录>\node_modules\dsh-cyber-red-ui\ 是否存在，
   且 client.js 大小约 8.2 MB（如果只有几百字节，那是指针文件，说明下载到了
   GitHub 仓库源码而不是 Release 安装包，需要删掉重下 Release 的 tgz）
4. 看 DSH 启动日志里有没有 dsh-cyber-red-ui 相关的报错
5. 确认 DSH 版本是 0.2.x（太旧可能不兼容）

---

## 已知问题

- 这个包很大（200 MB），主要是 197 MB 媒体资源。安装慢是正常的，不是卡死。
- 别用 dsh plugin add github:... 直接从仓库装。仓库里的媒体文件用 Git LFS 存储，
  没装 git-lfs 会拿到指针文本，插件装上了但壁纸和音乐都不响。
  一定要用 Release 里的 tgz。
- 不要用 pnpm add 直接指向仓库源码，同理。

---

## 请遵守
- 每一步做完告诉我结果，不要一口气跑到黑。
- 改任何文件前先备份。
- 校验哈希不通过就停下来问我，不要硬装。
```

### 不想用提示词的话

上面的提示词本身就是完整的手动流程，照着做即可。关键是三点：

1. **用镜像下载**，直连会非常慢
2. **校验 SHA256**，且校验值要从 `api.github.com` 取，不要从镜像取
3. **只装 Release 里的 tgz**，不要从仓库源码安装（媒体是 LFS 指针）

`dsh plugin add` 若提示 profile 被桌面端独占管理而拒绝执行，
提示词里的「手动安装」一节给了逐文件复制的兜底做法。

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
| **动态视频壁纸** | 8 段内置视频背景，支持 Range 流式播放 |
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
