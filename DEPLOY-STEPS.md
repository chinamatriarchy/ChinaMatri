# 🚀 部署步骤 - 跟我做

**目标**: 将网站和 Studio 部署到线上，实现自动部署

---

## ✅ 第一步：连接 GitHub 仓库（5分钟）

### 1.1 在 GitHub 创建仓库

**打开浏览器访问**：https://github.com/new

**填写信息**：
- Repository name: `ChinaMatri` 或 `matrichina-website`
- Description: `母权中国 - 母系社会研究网站`
- Public/Private: 选择 `Public`（推荐）或 `Private`
- ⚠️ **不要**勾选 "Add a README file"
- ⚠️ **不要**勾选 "Add .gitignore"
- 点击 **"Create repository"**

### 1.2 复制仓库地址

创建后会看到类似这样的页面：

```
Quick setup — if you've done this kind of thing before

https://github.com/YOUR_USERNAME/ChinaMatri.git
```

**复制这个 URL！** 例如：`https://github.com/xiaowanyu/ChinaMatri.git`

### 1.3 连接远程仓库

**打开终端，运行**：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 添加远程仓库（替换成您的 URL）
git remote add origin https://github.com/YOUR_USERNAME/ChinaMatri.git

# 验证是否添加成功
git remote -v
```

**应该看到**：
```
origin  https://github.com/YOUR_USERNAME/ChinaMatri.git (fetch)
origin  https://github.com/YOUR_USERNAME/ChinaMatri.git (push)
```

### 1.4 推送代码到 GitHub

```bash
# 提交所有更改
git commit -m "feat: 整理项目结构，优化配置管理"

# 推送到 GitHub
git push -u origin main
```

**输入 GitHub 账号密码**（或使用 Personal Access Token）

**等待推送完成**... 看到 "100%" 就成功了！ ✅

### 1.5 验证推送成功

**访问您的 GitHub 仓库页面**：
```
https://github.com/YOUR_USERNAME/ChinaMatri
```

应该能看到所有文件！✨

---

## ✅ 第二步：配置 Netlify 自动部署（3分钟）

### 2.1 登录 Netlify

**访问**：https://app.netlify.com

**登录**您的 Netlify 账号

### 2.2 找到您的现有站点

在 Netlify 首页，找到 **"matrichina"** 站点（或类似名称）

点击进入站点详情页

### 2.3 连接 GitHub 仓库

**方法 A：如果站点已存在**

1. 点击 **"Site settings"**
2. 点击 **"Build & deploy"**
3. 找到 **"Link repository"** 或 **"Connect to Git provider"**
4. 选择 **"GitHub"**
5. 授权 Netlify 访问 GitHub（如果还没授权）
6. 选择您的仓库 **"ChinaMatri"**
7. 配置：
   ```
   Base directory: (留空)
   Build command: (留空)
   Publish directory: . 或 /
   Branch to deploy: main
   ```
8. 点击 **"Save"**

**方法 B：如果需要创建新站点**

1. 点击 **"Add new site"** → **"Import an existing project"**
2. 选择 **"Deploy with GitHub"**
3. 授权并选择仓库 **"ChinaMatri"**
4. 配置构建设置：
   ```
   Base directory: (留空)
   Build command: (留空)
   Publish directory: .
   ```
5. 点击 **"Deploy site"**

### 2.4 测试自动部署

**在终端运行**：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 创建一个小改动
echo "# Test Auto Deploy" >> README.md

# 提交并推送
git add .
git commit -m "test: 测试自动部署"
git push
```

**在 Netlify 查看**：
1. 进入站点详情页
2. 点击 **"Deploys"** 标签
3. 应该看到新的部署正在进行（黄色）
4. 等待1-2分钟，变成绿色 ✅

**成功！** 现在每次 `git push` 都会自动部署！🎉

---

## ✅ 第三步：部署 Studio 到线上（5分钟）

### 3.1 在 Netlify 创建 Studio 站点

**访问**：https://app.netlify.com

**点击** "Add new site" → "Import an existing project"

**选择** "Deploy with GitHub"

**选择**您的仓库 "ChinaMatri"

### 3.2 配置 Studio 构建

**重要！填写以下配置**：

```
Base directory:   studio
Build command:    npm run build
Publish directory: studio/dist
Branch to deploy: main
```

**点击** "Deploy site"

### 3.3 自定义站点名称

部署成功后：

1. 点击 **"Site settings"**
2. 点击 **"Change site name"**
3. 输入：`matrichina-studio` （或您喜欢的名字）
4. 点击 **"Save"**

**您的 Studio 网址**：
```
https://matrichina-studio.netlify.app
```

### 3.4 配置 Sanity CORS

**访问**：https://sanity.io/manage

**选择**项目 "My Knowledge Base" (Project ID: 8i1xhvuq)

**点击** "API" → "CORS Origins"

**点击** "Add CORS origin"

**添加以下网址**（每个都要添加）：

1. **Studio 网址**：
   ```
   https://matrichina-studio.netlify.app
   ```
   勾选 ✅ **"Allow credentials"**

2. **前端网址**：
   ```
   https://matrichina.netlify.app
   ```
   勾选 ✅ **"Allow credentials"**

3. **本地开发**（已有就跳过）：
   ```
   http://localhost:3333
   http://localhost:8000
   ```
   勾选 ✅ **"Allow credentials"**

**点击** "Save" 保存每一个

### 3.5 测试 Studio

**访问**：https://matrichina-studio.netlify.app

**点击登录**

**用 Google 或 GitHub 登录**

**应该能看到**：
- 🗺️ 母系考古/时间线
- 👸 女神谱系
- 🏘️ 现存氏族
- 🏛️ 古代母权社会
- 📚 相关论著
- 👨‍🏫 学者

**成功！** Studio 已部署到线上！🎊

---

## 🎉 完成！检查清单

### 前端网站
- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Netlify 已连接 GitHub
- [ ] 自动部署测试成功
- [ ] 网站可以访问：https://matrichina.netlify.app

### Studio CMS
- [ ] Studio 站点已创建
- [ ] 构建配置正确（base: studio, build: npm run build）
- [ ] 站点名称已自定义
- [ ] CORS 已配置
- [ ] Studio 可以访问：https://matrichina-studio.netlify.app
- [ ] 可以登录并编辑数据

---

## 🔄 日常使用流程

### 开发者修改代码

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 1. 修改代码或配置
vim src/js/mapConfig.js

# 2. 测试（本地）
./scripts/start-all.sh
# 访问 http://localhost:8000 测试

# 3. 提交并推送
git add .
git commit -m "feat: 修改地图颜色"
git push

# 4. 等待 2-3 分钟，Netlify 自动部署 ✓
```

### 团队成员添加数据

1. **访问 Studio**：https://matrichina-studio.netlify.app
2. **登录** Google/GitHub
3. **选择内容类型**（例如：女神谱系）
4. **点击 "+ 创建"**
5. **填写数据**
6. **点击 "✅ Publish"**
7. **前端网站立即更新** ✓

---

## 🐛 常见问题

### Q1: git push 要求输入用户名密码？

**A**: GitHub 现在推荐使用 Personal Access Token

**创建 Token**：
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Classic"
3. 勾选 `repo` 权限
4. 点击 "Generate token"
5. **复制 token**（只显示一次！）

**使用 Token**：
```bash
# Username: 您的 GitHub 用户名
# Password: 粘贴 Token（不是真实密码）
```

或使用 SSH（更方便）：
```bash
# 改用 SSH URL
git remote set-url origin git@github.com:YOUR_USERNAME/ChinaMatri.git
```

### Q2: Netlify 构建失败？

**检查**：
1. Netlify 站点 → Deploys → 点击失败的部署
2. 查看 "Deploy log"
3. 找到错误信息

**常见原因**：
- Base directory 设置错误
- Build command 错误
- 依赖安装失败

**Studio 正确配置**：
```
Base directory:   studio
Build command:    npm run build
Publish directory: studio/dist
```

### Q3: Studio 登录后提示权限不足？

**A**: 需要在 Sanity 管理后台添加用户

1. 访问 https://sanity.io/manage
2. 选择项目
3. 点击 "Members" → "Invite member"
4. 输入邮箱地址
5. 选择角色（Administrator/Editor）
6. 发送邀请

### Q4: 前端网站不显示 CMS 数据？

**检查**：
1. CORS 是否配置？
2. 浏览器控制台是否有错误？
3. Studio 中数据是否已 Publish？
4. 等待几分钟（CDN 缓存）

**强制刷新**：Cmd + Shift + R

---

## 📞 获取帮助

**如果遇到问题**：

1. **查看构建日志**：Netlify Deploys 页面
2. **查看浏览器控制台**：按 F12
3. **检查 CORS 配置**：https://sanity.io/manage
4. **查看文档**：`docs/` 文件夹

---

## 🎯 下一步

部署完成后，您可以：

1. **邀请团队成员**
   - 发送 Studio 链接给他们
   - 在 Sanity 管理后台添加权限

2. **开始添加数据**
   - 在 Studio 中添加考古遗址
   - 添加女神谱系信息
   - 添加现存氏族资料

3. **自定义域名**（可选）
   - 在 Netlify 配置自定义域名
   - 例如：`studio.matrichina.com`

---

**🎉 恭喜！您的网站已成功部署！**

**网站地址**：
- 前端：https://matrichina.netlify.app
- Studio：https://matrichina-studio.netlify.app

---

*创建时间：2025-11-09*

