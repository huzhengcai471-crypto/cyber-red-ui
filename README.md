# dsh-cyber-red-ui · 赛博红控台

A crimson-neon control-desk theme for **DeepSeek Harness (DSH)** — black base, blood-red
glow, scanlines, a lab status rail, dynamic video wallpapers, a music player, and its own
settings page.

Static conversation wallpapers include First Contact, Lock No. 1, and The Sun Rises as Usual.

黑底正红霓虹主题：扫描线叠加、实验状态栏、动态视频壁纸、音乐播放器，并提供独立设置页。

> Screenshots live in `docs/` once published.

---

## 安装

DSH 的插件通过 profile 的 `package.json` 声明依赖。三种方式任选：

### 方式一：从 GitHub 直接安装（推荐）

```powershell
dsh plugin --profile desktop add github:huzhengcai471-crypto/cyber-red-ui
```

然后在 `~/.dsh/profiles/desktop/package.json` 的 `dsh.profile.bundles` 里追加包名：

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-cyber-red-ui"
      ]
    }
  }
}
```

重启 DSH 即可。

### 方式二：从本地 tarball 安装

```powershell
dsh plugin --profile desktop add file:C:/path/to/dsh-cyber-red-ui-1.2.0.tgz
```

### 方式三：开发模式（链接源码）

```powershell
dsh plugin --profile desktop add link:C:/path/to/cyber-red-ui
```

安装后同样要把它加进 `bundles`，见方式一。

### 安装完成后

刷新界面，左下角出现「实验状态」按钮即安装成功。

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
└─ assets/             # 视频、音频、头像（约 80 MB）
```

`assets/` 全部随包分发，**不依赖任何本地文件或网络资源**。

---

## 体积说明

媒体资源约 80 MB（视频 + FLAC 音频），这是包体较大的唯一原因。安装时间主要花在下载上。

宿主侧采用**惰性加载**：进程启动时不读任何媒体文件，只有真正请求某个壁纸/音轨时才打开文件流，
因此 80 MB 素材不会常驻内存。

---

## 已知限制

- 设置页里「启动动画」「插件市场」等**其他插件**的页面不再被本插件改色（已刻意隔离）。
- 仿宋字体使用系统自带 `simfang.ttf`；系统缺失时回退到宋体。

---

## 许可证

MIT — 见 [LICENSE](LICENSE)。

内置美术与音频素材版权归各自作者所有，随包仅为功能演示，请勿单独分发。
