# 个人知识站点 - 部署指南

## 🚀 部署您的个人知识站点

本指南帮助您将网站和 CMS 部署到自己的域名下，完全由您控制。

---

## 📦 部署选项概览

### 推荐方案：

```
您的个人域名：yourdomain.com
├── 网站：https://yourdomain.com
└── Studio：https://studio.yourdomain.com (或 yourdomain.com/studio)
```

---

## 1️⃣ 部署 Sanity Studio

### 选项 A：Sanity 托管（推荐，免费）

```bash
cd studio
npx sanity deploy
```

您的 Studio 将部署到：`https://your-project-name.sanity.studio`

**优点：**
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 零配置
- ✅ 自动更新

**自定义域名（可选）：**
1. 在 Sanity 管理后台添加 CNAME 记录
2. 指向 `your-project-name.sanity.studio`

### 选项 B：自托管

如果您想完全控制：

```bash
cd studio
npm run build

# 构建产物在 studio/dist/
# 部署到任何静态托管服务
```

---

## 2️⃣ 部署网站

### 选项 A：Netlify（推荐，免费）

1. **通过 Git 自动部署**
   ```bash
   # 推送代码到 GitHub
   git push origin main
   
   # 在 Netlify 连接仓库
   # - New site from Git
   # - 选择您的仓库
   # - Build command: (留空)
   # - Publish directory: ./
   ```

2. **自定义域名**
   - Domain settings → Add custom domain
   - 添加您的域名：`yourdomain.com`
   - 配置 DNS（Netlify 会提供说明）

3. **环境变量**
   在 Netlify 设置中添加（如需要）：
   ```
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   ```

**优点：**
- ✅ 免费 SSL 证书
- ✅ 自动部署
- ✅ CDN 加速
- ✅ 简单易用

### 选项 B：Vercel（免费）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel

# 添加自定义域名
vercel domains add yourdomain.com
```

### 选项 C：GitHub Pages（免费，适合简单站点）

```bash
# 推送到 GitHub
git push origin main

# 在仓库设置中启用 Pages
# Settings → Pages → Source: main branch
```

访问：`https://yourusername.github.io/repository-name`

**注意：** GitHub Pages 需要配置 CORS，因为域名与 Sanity 不同

### 选项 D：自己的服务器

如果您有 VPS 或服务器：

1. **上传文件**
   ```bash
   scp -r * user@yourserver.com:/var/www/yourdomain.com
   ```

2. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/yourdomain.com;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **配置 SSL（Let's Encrypt）**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔒 配置 CORS

部署后，更新 Sanity CORS 设置：

1. 访问 https://www.sanity.io/manage
2. 选择您的项目
3. Settings → API → CORS Origins
4. 添加您的生产域名：
   ```
   https://yourdomain.com
   ```

---

## 🌐 DNS 配置

### 如果使用 Netlify/Vercel：
按照平台提供的说明配置 DNS

### 如果使用自己的服务器：

在您的域名注册商（如 Namecheap, GoDaddy）配置：

```
A 记录：
@    →  您的服务器 IP

CNAME 记录（可选，用于 Studio）：
studio  →  your-project-name.sanity.studio
```

---

## 📝 部署检查清单

### 部署前：
- [ ] 在 Sanity Studio 中完成内容编辑
- [ ] 测试所有功能正常
- [ ] 备份数据
- [ ] 更新所有 Project ID
- [ ] 移除测试/调试代码

### 部署后：
- [ ] 测试所有页面加载
- [ ] 验证 CORS 配置正确
- [ ] 测试内容更新是否实时反映
- [ ] 检查图片加载
- [ ] 验证移动端显示
- [ ] 配置 SSL 证书
- [ ] 设置自动备份

---

## 🔧 环境变量管理

### 开发环境
```javascript
// src/js/sanity-browser.js
const SANITY_CONFIG = {
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01'
};
```

### 生产环境（推荐使用环境变量）

如果使用构建工具，可以使用 `.env` 文件：

```bash
# .env.production
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

---

## 📊 性能优化

### CDN 配置
Sanity 图片自动使用 CDN，但您可以进一步优化：

```javascript
// 使用响应式图片
const imageUrl = window.SanityAPI.getImageUrl(image, 800)
```

### 缓存策略
在 Netlify/Vercel 中配置缓存头：

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

## 🔐 安全最佳实践

### 1. 只公开需要公开的内容
- API 读取权限是公开的（这是正常的）
- 写入权限只给您自己

### 2. 备份策略
```bash
# 设置定期备份（cron job）
0 2 * * 0 cd /path/to/project/studio && npx sanity dataset export production backup-$(date +\%Y\%m\%d).tar.gz
```

### 3. 访问控制
在 Sanity 项目设置中：
- 只添加您信任的成员
- 使用强密码
- 启用 2FA

---

## 💰 成本估算

### 免费方案（适合个人使用）：
```
Sanity Free Plan:
- 无限文档
- 3 个用户
- 10GB 资产存储
- 10GB 带宽

Netlify/Vercel Free Plan:
- 100GB 带宽/月
- 自动 HTTPS
- 自动部署

总成本：$0/月 ✅
```

### 扩展需求：
- 如需更多存储/带宽，Sanity 付费计划从 $99/月起
- Netlify/Vercel 付费计划从 $19-20/月起

---

## 🆘 常见问题

### Q: 可以使用免费托管吗？
A: 可以！Netlify/Vercel/GitHub Pages 都提供免费的静态托管。

### Q: Studio 一定要用 Sanity 托管吗？
A: 不是，您可以自己托管，但 Sanity 托管免费且方便。

### Q: 如何使用自己的域名？
A: 在托管平台添加自定义域名，然后配置 DNS 即可。

### Q: 部署后如何更新内容？
A: 在 Studio 中编辑并发布，内容会自动同步到网站。

### Q: 如何更新网站代码？
A: 推送到 Git，Netlify/Vercel 会自动重新部署。

---

## 🎯 推荐工作流

### 日常内容更新：
```
1. 打开 Studio（https://studio.yourdomain.com）
2. 编辑内容
3. 点击 Publish
4. 内容立即在网站上生效 ✅
```

### 代码更新：
```
1. 本地开发和测试
2. git commit 提交更改
3. git push 推送到 GitHub
4. Netlify/Vercel 自动部署 ✅
```

### 定期维护：
```
每周：备份数据
每月：检查性能和访问日志
每季度：更新依赖包
每年：续费域名
```

---

## ✨ 部署后的下一步

1. **自定义品牌**
   - 更新网站标题和 Logo
   - 自定义 Studio 外观
   - 添加个人简介

2. **监控和分析**
   - 添加 Google Analytics（可选）
   - 监控网站性能
   - 跟踪内容更新频率

3. **持续改进**
   - 根据使用体验调整布局
   - 添加新的内容类型
   - 优化搜索和导航

---

**准备好了吗？开始部署您的个人知识站点！** 🚀

需要帮助？查看各平台的官方文档或回到 `QUICKSTART.md`。

