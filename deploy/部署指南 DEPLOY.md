# 投递台 · 部署指南

纯静态站点(HTML + JS + CSS,JSX 在浏览器内用 Babel 现场编译)。
**根目录 `index.html` + `app/` 文件夹**整体上传即可,无需任何构建步骤。

> 公网部署后:截图 OCR(系统离线识别 / Tesseract CDN)可用;
> 「AI 整理 JD / 面试准备」会自动走本地规则兜底(`window.claude` 仅在原编辑环境可用)。
> 数据保存在浏览器本地(localStorage),换设备 / 清缓存会清空。

---

## 方式一:Vercel(最省事,拖拽即可)
1. 打开 https://vercel.com → 注册 / 登录。
2. 顶部 **Add New… → Project**。
3. 不连 Git 也行:选 **Deploy** 区的拖拽上传,或先把项目文件夹拖进 Vercel CLI。
   - **最简单**:安装一次 CLI → 在项目根目录执行
     ```bash
     npm i -g vercel
     vercel        # 首次会让你登录 + 确认,几乎一路回车
     vercel --prod # 正式发布
     ```
4. 完成后给你一个 `https://xxx.vercel.app` 网址。
   - Framework Preset 选 **Other**;Build Command 留空;Output Directory 填 `.`(根目录)。

## 方式二:Cloudflare Pages(免费、国内访问相对友好)
1. 打开 https://dash.cloudflare.com → **Workers & Pages → Create → Pages**。
2. 选 **Upload assets**(直接上传,不用 Git)。
3. 把项目根目录里的 `index.html` 和 `app/` 文件夹一起拖进去上传。
4. 点 **Deploy site**,得到 `https://xxx.pages.dev`。
   - 若走 Git 连接:Build command 留空,Build output directory 填 `/`(根)。

## 方式三:GitHub Pages(免费、和 GitHub 仓库绑定)
1. 新建一个 GitHub 仓库,把本项目所有文件(含 `index.html`、`app/`)推上去:
   ```bash
   git init
   git add .
   git commit -m "投递台"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
2. 仓库 **Settings → Pages**。
3. Source 选 **Deploy from a branch**,Branch 选 `main` / 目录 `/ (root)`,Save。
4. 等 1–2 分钟,得到 `https://<用户名>.github.io/<仓库名>/`。

---

## 需要上传的文件清单
```
index.html              ← 入口(部署用这个)
app/
  ├─ data.js
  ├─ styles.css
  ├─ tweaks-panel.jsx
  ├─ components.jsx
  ├─ ingest.jsx
  ├─ views.jsx
  ├─ panels.jsx
  ├─ schedule.jsx
  ├─ detail.jsx
  └─ app.jsx
```
> `投递台 · 离线版.html` 是单文件离线版,**不用于网页部署**(直接发给别人双击打开用)。
> 含中文名的 `投递台 · 岗位投递管理.html` 也不必上传,`index.html` 已是等价入口。

## 小贴士
- 三个平台都**自带 HTTPS**,手机加到主屏即可像 App 一样用。
- 想绑自己的域名:三家都支持在控制台 **Custom Domains** 里添加。
- 数据是本地存储:想多设备同步,后续可接一个轻量后端 / 云存储(需要再说)。
