# 🚀 自动化部署 Sanity Studio - 完整方案

## 🎯 目标工作流程

```
开发者本地修改 schema
        ↓
    git commit & push
        ↓
    GitHub 仓库更新
        ↓
Netlify/Vercel 自动构建
        ↓
    线上 Studio 自动更新
        ↓
团队成员访问新版 Studio
```

---

## 📋 方案选择

### **方案 1：Netlify 部署 Studio（推荐）**

**优点**：
- ✅ 与前端网站统一在 Netlify
- ✅ 构建快速
- ✅ 配置简单
- ✅ 免费额度足够

### **方案 2：Vercel 部署 Studio**

**优点**：
- ✅ 构建速度快
- ✅ 自动 HTTPS
- ✅ 边缘网络

### **方案 3：Sanity 官方托管**

**优点**：
- ✅ 专门优化
- ✅ 命令行一键部署

---

## 🔧 实施步骤（Netlify 方案）

### **步骤 1：准备 Studio 代码**

确保 Studio 有正确的配置文件。

#### 1.1 检查 `studio/package.json`

确保有构建脚本：
```json
{
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy"
  }
}
```

#### 1.2 创建 `studio/netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### **步骤 2：推送代码到 GitHub**

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 添加所有文件
git add .

# 提交
git commit -m "feat: 配置 Studio 自动部署"

# 推送到 GitHub
git push origin main
```

---

### **步骤 3：在 Netlify 创建新站点**

#### 方法 A：通过 Netlify 网页界面（推荐）

1. **访问** https://app.netlify.com
2. **登录**您的 Netlify 账号
3. **点击** "Add new site" → "Import an existing project"
4. **选择** GitHub，授权访问
5. **选择**您的仓库 `ChinaMatri`
6. **配置构建设置**：
   ```
   Base directory: studio
   Build command: npm run build
   Publish directory: studio/dist
   ```
7. **点击** "Deploy site"

#### 方法 B：使用 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 在 studio 目录中
cd studio

# 初始化
netlify init

# 按提示操作：
# - Create & configure a new site
# - 选择 team
# - 输入站点名称: matrichina-studio
# - Build command: npm run build
# - Publish directory: dist
```

---

### **步骤 4：配置自动部署**

Netlify 会自动：
- ✅ 监听 GitHub main 分支
- ✅ 检测到 push 后自动构建
- ✅ 构建成功后自动部署
- ✅ 提供 HTTPS 网址

**您的 Studio 网址**：
```
https://matrichina-studio.netlify.app
```

---

### **步骤 5：配置 CORS**

部署后，需要在 Sanity 添加 CORS 权限：

1. 访问 https://sanity.io/manage
2. 选择项目 "My Knowledge Base"
3. API → CORS Origins
4. 添加：
   ```
   https://matrichina-studio.netlify.app
   ```
   勾选 ✅ Allow credentials

---

## 📝 完整配置文件

### **1. studio/package.json**

```json
{
  "name": "matrichina-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "sanity dev",
    "start": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy"
  },
  "dependencies": {
    "@sanity/vision": "^3.99.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "sanity": "^3.99.0",
    "styled-components": "^6.1.13"
  }
}
```

### **2. studio/netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **3. studio/.gitignore**

```
node_modules
dist
.sanity
```

---

## 🔄 日常工作流程

### **开发者修改 Schema**

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 1. 修改 schema
# 编辑 studio/schemas/archaeologicalSite.js 等

# 2. 本地测试
cd studio
npm run dev
# 访问 http://localhost:3333 测试

# 3. 提交并推送
cd ..
git add studio/schemas/
git commit -m "feat: 添加新字段 XXX"
git push

# 4. 等待 2-3 分钟，Netlify 自动部署
# 5. 团队成员访问线上 Studio 即可看到更新
```

---

## 👥 团队成员使用

### **访问线上 Studio**

```
https://matrichina-studio.netlify.app
```

### **登录**
- 用 Google 或 GitHub 账号登录
- 需要管理员邀请加入项目

### **添加/编辑数据**
- 点击 "母系考古/时间线"
- 创建或编辑内容
- 点击 Publish
- 网站 (matrichina.netlify.app) 立即更新

---

## 🏗️ 项目架构

```
GitHub 仓库 (ChinaMatri)
    │
    ├─→ 推送触发
    │
    ├─→ Netlify Site 1: 前端网站
    │   └─ matrichina.netlify.app
    │      - 构建命令: (无)
    │      - 发布目录: /
    │
    └─→ Netlify Site 2: Studio
        └─ matrichina-studio.netlify.app
           - 基础目录: studio
           - 构建命令: npm run build
           - 发布目录: studio/dist
    
    两者都从 Sanity 读取/写入数据
           ↓
    Sanity Cloud (Project: 8i1xhvuq)
```

---

## ⚙️ 高级配置

### **配置构建缓存**

在 `studio/netlify.toml` 添加：

```toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true
```

### **配置环境变量**

在 Netlify 界面：
1. Site settings → Environment variables
2. 添加变量（如果需要）：
   ```
   SANITY_STUDIO_PROJECT_ID=8i1xhvuq
   SANITY_STUDIO_DATASET=production
   ```

### **配置通知**

Netlify 可以在部署成功/失败时：
- 发送邮件
- Slack 通知
- Webhook

---

## 🐛 故障排除

### **构建失败**

**检查构建日志**：
1. Netlify 网站 → Deploys
2. 点击失败的部署
3. 查看日志

**常见问题**：
- ❌ `npm run build` 失败
  - 解决：检查 package.json 中的 scripts
- ❌ 依赖安装失败
  - 解决：删除 package-lock.json 重新生成
- ❌ 构建超时
  - 解决：优化构建脚本

### **部署成功但无法访问**

**检查**：
1. 构建是否真的成功（绿色勾）
2. CORS 是否配置
3. 浏览器控制台错误

---

## 📊 对比：不同部署方式

| 方式 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Netlify 自动部署** | 自动化，团队友好 | 需要配置 | ⭐⭐⭐⭐⭐ |
| **Sanity 官方托管** | 专门优化 | 需要手动部署 | ⭐⭐⭐⭐ |
| **Vercel** | 速度快 | 配置类似 Netlify | ⭐⭐⭐⭐ |
| **本地运行** | 简单 | 不适合团队 | ⭐⭐ |

---

## ✅ 实施检查清单

部署前：
- [ ] `studio/package.json` 有 build 脚本
- [ ] `studio/netlify.toml` 已创建
- [ ] 代码已推送到 GitHub
- [ ] Netlify 账号已登录

部署后：
- [ ] 构建成功（绿色勾）
- [ ] 可以访问 Studio 网址
- [ ] CORS 已配置
- [ ] 可以登录 Studio
- [ ] 数据可以正常保存

团队协作：
- [ ] 已邀请团队成员
- [ ] 成员可以访问 Studio
- [ ] 成员可以编辑数据
- [ ] 前端网站正常显示数据

---

## 🎯 下一步

现在您需要：

1. **创建配置文件**（我可以帮您）
2. **推送到 GitHub**
3. **在 Netlify 创建站点**
4. **测试自动部署**

准备好了吗？我可以帮您创建所有需要的配置文件！

---

*文档创建时间：2025-11-09*


