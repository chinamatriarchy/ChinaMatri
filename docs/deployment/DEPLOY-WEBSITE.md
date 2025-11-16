# 部署母权文化知识库网站

## 方案 1: Netlify 拖拽部署（最简单）⭐

### 步骤：
1. 访问：https://app.netlify.com/drop
2. 拖拽整个项目文件夹到页面
3. 等待 30 秒部署完成
4. 获得网址，分享给团队

**完全免费，无需注册！**

---

## 方案 2: Vercel CLI 部署

```bash
# 1. 安装 Vercel
npm install -g vercel

# 2. 部署
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
vercel

# 3. 按提示操作
# - 登录 Vercel 账户
# - 确认项目设置
# - 等待部署完成
# - 获得 URL
```

---

## 方案 3: GitHub Pages（如果使用 Git）

### 前提：项目已推送到 GitHub

```bash
# 1. 创建 gh-pages 分支
git checkout -b gh-pages
git push origin gh-pages

# 2. 在 GitHub 仓库设置中
Settings → Pages → Source → gh-pages

# 3. 网址格式
https://yourusername.github.io/ChinaMatri
```

---

## 方案 4: 本地网络分享（临时试用）

### 适合：团队在同一办公室/网络

```bash
# 1. 启动本地服务器
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
python3 -m http.server 8000

# 2. 获取您的 IP 地址
ifconfig | grep "inet " | grep -v 127.0.0.1
# 例如：192.168.1.100

# 3. 分享给团队（同一网络）
http://192.168.1.100:8000
```

**注意：** 只有在同一 WiFi/局域网的人能访问

---

## 推荐流程

### 快速演示（今天）
使用**方案 4（本地分享）**
- 立即可用
- 团队在同一网络即可访问

### 正式分享（长期）
使用**方案 1（Netlify）**
- 5 分钟部署
- 任何人都能访问
- 免费且稳定

---

## 部署后如何更新网站？

### Netlify
1. 修改本地文件
2. 重新拖拽整个文件夹到 Netlify
3. 自动更新（约 30 秒）

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
git add .
git commit -m "更新内容"
git push origin gh-pages
```

---

## 常见问题

**Q: 部署后网站能自动更新 CMS 内容吗？**
A: 可以！网站会从 Sanity CMS 实时获取数据。

**Q: 免费方案有流量限制吗？**
A: Netlify 免费 100GB/月，足够使用。

**Q: 可以使用自己的域名吗？**
A: 可以！在 Netlify/Vercel 设置中添加自定义域名。

**Q: 团队成员需要登录吗？**
A: 不需要！这是公开网站，任何人都能访问。

---

## 立即开始

选择一个方案，我帮您执行：

1️⃣ Netlify 拖拽部署（我指导您操作）
2️⃣ Vercel CLI 部署（我帮您运行命令）
3️⃣ 本地网络分享（获取 IP 和启动服务）





