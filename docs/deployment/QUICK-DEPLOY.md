# ⚡ 快速部署 Sanity Studio - 5 分钟搞定

## 🎯 您将获得

推送代码 → GitHub → Netlify 自动部署 → 团队访问线上 Studio

---

## 📋 准备工作

✅ 已完成：
- Studio 配置文件 (`netlify.toml`) ✓
- 部署脚本 (`deploy-studio-auto.sh`) ✓
- `.gitignore` 文件 ✓

⏳ 需要您做：
1. 在 Netlify 创建站点（3 分钟）
2. 推送代码（1 分钟）
3. 配置 CORS（1 分钟）

---

## 🚀 部署步骤

### **步骤 1：在 Netlify 创建新站点**（3 分钟）

#### 方法 A：网页界面（推荐，最简单）

1. **访问** https://app.netlify.com
2. **登录**您的账号
3. **点击** "Add new site" → "Import an existing project"
4. **选择** "Deploy with GitHub"
5. **授权** Netlify 访问您的 GitHub（如果还没授权）
6. **选择仓库** `ChinaMatri`（或您的仓库名）
7. **配置构建**：
   ```
   Base directory:   studio
   Build command:    npm run build
   Publish directory: studio/dist
   ```
8. **站点名称**（可选）：
   - 点击 "Site settings" → "Change site name"
   - 输入：`matrichina-studio`
   - 保存
9. **点击** "Deploy"

✅ **完成！** Netlify 开始构建，2-3 分钟后 Studio 上线！

#### 方法 B：命令行（高级用户）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 安装 Netlify CLI（如果没装）
npm install -g netlify-cli

# 登录
netlify login

# 在 studio 目录中初始化
cd studio
netlify init

# 按提示操作
```

---

### **步骤 2：推送代码**（1 分钟）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 检查状态
git status

# 添加所有文件
git add .

# 提交
git commit -m "feat: 配置 Studio 自动部署到 Netlify"

# 推送
git push origin main
```

或使用快捷脚本：
```bash
./deploy-studio-auto.sh
```

---

### **步骤 3：配置 CORS**（1 分钟）

Studio 部署成功后：

1. **获取 Studio 网址**
   - 在 Netlify 查看，类似：`https://matrichina-studio.netlify.app`

2. **访问 Sanity 管理后台**
   - https://sanity.io/manage
   - 选择项目 "My Knowledge Base"

3. **添加 CORS**
   - 点击 "API" → "CORS Origins"
   - 点击 "Add CORS origin"
   - 输入：`https://matrichina-studio.netlify.app`
   - 勾选 ✅ **Allow credentials**
   - 保存

---

## ✅ 验证部署

### **1. 访问线上 Studio**

```
https://matrichina-studio.netlify.app
```

### **2. 测试登录**

- 点击登录按钮
- 用 Google/GitHub 登录
- 应该能看到 "母系考古/时间线" 等菜单

### **3. 测试编辑**

- 创建一条测试数据
- 点击 Publish
- 访问前端网站 https://matrichina.netlify.app/map-cms.html
- 应该能看到新数据

---

## 🔄 日常使用流程

### **开发者修改 Schema**

```bash
# 1. 修改 schema 文件
vim studio/schemas/archaeologicalSite.js

# 2. 本地测试（可选）
cd studio
npm run dev
# 访问 http://localhost:3333

# 3. 提交并推送
cd ..
git add studio/schemas/
git commit -m "feat: 添加新字段 XXX"
git push

# 4. 等待 2-3 分钟
# Netlify 自动构建并部署

# 5. 通知团队
# "Studio 已更新，可以使用新字段了"
```

或使用快捷脚本：
```bash
./deploy-studio-auto.sh
```

---

## 👥 邀请团队成员

### **方法 1：通过 Sanity 管理后台**

1. 访问 https://sanity.io/manage
2. 选择项目 "My Knowledge Base"
3. 点击 "Members" → "Invite member"
4. 输入邮箱地址
5. 选择角色：
   - **Administrator**: 完全访问权限
   - **Editor**: 可编辑内容
   - **Viewer**: 只读权限
6. 发送邀请

### **方法 2：发送访问链接**

直接告诉团队成员：

```
1. 访问: https://matrichina-studio.netlify.app
2. 点击登录
3. 用 Google 或 GitHub 登录
4. 如果提示权限不足，告诉我您的邮箱
```

---

## 📊 监控和管理

### **查看构建状态**

Netlify 后台：https://app.netlify.com
- 点击您的 Studio 站点
- 查看 "Deploys" 标签页
- 可以看到每次部署的：
  - ✅ 状态（成功/失败）
  - ⏱️ 构建时间
  - 📝 提交信息
  - 🔄 回滚按钮

### **查看构建日志**

如果部署失败：
1. 点击失败的部署
2. 展开 "Deploy log"
3. 查看错误信息

### **回滚版本**

如果新版本有问题：
1. 在 Netlify "Deploys" 页面
2. 找到上一个成功的部署
3. 点击 "Publish deploy"
4. 立即回滚到之前版本

---

## 🎓 架构说明

```
您的工作流程：

开发者本地
    ↓ 修改 schema
    ↓ git push
    
GitHub 仓库
    ↓ 触发 webhook
    
Netlify
    ↓ 自动构建
    ↓ npm run build
    ↓ 生成 dist/
    ↓ 部署到 CDN
    
线上 Studio
https://matrichina-studio.netlify.app
    ↓ 团队成员访问
    ↓ 编辑数据
    
Sanity Cloud
(projectId: 8i1xhvuq)
    ↓ 数据存储
    
前端网站
https://matrichina.netlify.app
    ↓ 读取数据显示
```

---

## 🐛 常见问题

### **Q1: 构建失败，显示 "command not found: npm"**

**A:** 检查 `studio/netlify.toml` 是否有：
```toml
[build.environment]
  NODE_VERSION = "18"
```

### **Q2: 构建成功但访问显示空白**

**A:** 检查：
1. Publish directory 是否设置为 `studio/dist`
2. 查看浏览器控制台是否有错误
3. 检查 CORS 是否配置

### **Q3: 登录后提示权限不足**

**A:** 在 Sanity 管理后台邀请该用户：
1. https://sanity.io/manage
2. Members → Invite member

### **Q4: 数据修改后前端不显示**

**A:** 检查：
1. 前端 `sanityClient.js` 的 projectId 是否正确
2. CORS 是否同时配置了前端域名
3. 浏览器缓存（Cmd+Shift+R 强制刷新）

### **Q5: 推送后 Netlify 没反应**

**A:** 检查：
1. Netlify 站点设置中 "Build & deploy" → "Continuous deployment"
2. 确认已连接 GitHub
3. 确认监听的分支是 `main`

---

## ⚙️ 高级配置

### **配置构建通知**

在 Netlify：
1. Site settings → Build & deploy → Deploy notifications
2. 添加通知：
   - Email
   - Slack
   - Webhook

### **配置自定义域名**

在 Netlify：
1. Domain management → Add custom domain
2. 输入域名：`studio.matrichina.com`
3. 按提示配置 DNS

### **配置环境变量**

在 Netlify（如果需要）：
1. Site settings → Environment variables
2. 添加变量

---

## 📞 需要帮助？

**我现在可以帮您：**
1. ✅ 配置文件已创建
2. ⏳ 等待您在 Netlify 创建站点
3. ⏳ 推送代码
4. ⏳ 配置 CORS

**准备好了吗？**

运行：
```bash
./deploy-studio-auto.sh
```

或者告诉我您在哪一步遇到问题！

---

*创建时间：2025-11-09*


