# 🎯 现在就开始 - 部署您的网站

**当前状态**: 浏览器应该已打开 GitHub 创建仓库页面

---

## ✅ 第一步：创建 GitHub 仓库（2分钟）

### 在 GitHub 页面填写：

📋 **Repository name**: `ChinaMatri`

📋 **Description**: `母权中国 - 母系社会研究网站`

📋 **选择**: ⚪ Public（推荐）

⚠️ **重要**: 
- ❌ **不要**勾选 "Add a README file"
- ❌ **不要**勾选 "Add .gitignore"  
- ❌ **不要**选择 License

📋 **点击**: `Create repository` 绿色按钮

---

## ✅ 第二步：复制仓库地址（10秒）

创建成功后，页面会显示：

```
Quick setup — if you've done this kind of thing before

HTTPS:  https://github.com/YOUR_USERNAME/ChinaMatri.git
```

**点击复制按钮** 📋 复制这个 URL

---

## ✅ 第三步：运行连接脚本（1分钟）

### 在终端运行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
./scripts/setup-github.sh
```

### 按提示操作：

1. **粘贴仓库 URL**（刚才复制的）
2. **回车确认**
3. **等待推送...** ⏳

### 可能需要输入：

- **Username**: 您的 GitHub 用户名
- **Password**: 
  - 如果有 Personal Access Token，粘贴 Token
  - 否则输入密码（但可能会失败）

---

## 🔐 如果推送失败：创建 Personal Access Token

### Token 是什么？

GitHub 的新安全方式，代替密码使用。

### 创建步骤：

1. **打开新标签页**，访问：
   ```
   https://github.com/settings/tokens
   ```

2. **点击**: `Generate new token` → `Generate new token (classic)`

3. **填写**:
   - Note: `MatriChina Deploy`
   - Expiration: `No expiration` 或 `90 days`
   - 勾选: ✅ `repo` (所有 repo 权限)

4. **点击**: `Generate token` (页面底部绿色按钮)

5. **复制 token** (只显示一次！)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. **再次运行脚本**，密码处粘贴 Token

---

## ✅ 第四步：验证推送成功（30秒）

### 访问您的 GitHub 仓库：

```
https://github.com/YOUR_USERNAME/ChinaMatri
```

### 应该看到：

- ✅ README.md
- ✅ index.html
- ✅ map.html
- ✅ pages/ 文件夹
- ✅ docs/ 文件夹
- ✅ studio/ 文件夹
- ✅ src/ 文件夹

**看到文件了？恭喜！第一步完成！** 🎉

---

## ✅ 第五步：配置 Netlify 自动部署（3分钟）

### 5.1 登录 Netlify

**打开新标签页**，访问：
```
https://app.netlify.com
```

**登录**您的 Netlify 账号

### 5.2 选择操作

**情况 A**: 如果您已有 "matrichina" 站点

1. **点击**站点名称进入详情
2. **点击** "Site settings"
3. **点击** "Build & deploy" (左侧菜单)
4. 找到 **"Link repository"** 按钮并点击
5. **选择** "GitHub"
6. **授权** Netlify（如果需要）
7. **选择**仓库 "ChinaMatri"
8. **配置**:
   ```
   Branch: main
   Base directory: (留空)
   Build command: (留空)
   Publish directory: .
   ```
9. **保存**

**情况 B**: 创建新站点

1. **点击** "Add new site" → "Import an existing project"
2. **选择** "Deploy with GitHub"
3. **授权** Netlify访问 GitHub
4. **选择**仓库 "ChinaMatri"
5. **配置**:
   ```
   Branch: main
   Base directory: (留空)
   Build command: (留空)
   Publish directory: .
   ```
6. **点击** "Deploy site"

### 5.3 等待部署完成

- 在 "Deploys" 标签页查看进度
- 黄色 = 构建中 ⏳
- 绿色 = 成功 ✅
- 红色 = 失败 ❌

**成功后，访问您的网站！** 🌐

---

## ✅ 第六步：测试自动部署（1分钟）

### 在终端运行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 做一个小改动
echo "# 测试自动部署" >> README.md

# 提交并推送
git add .
git commit -m "test: 测试自动部署"
git push
```

### 在 Netlify 查看：

1. **刷新** Deploys 页面
2. **应该看到**新的部署开始了
3. **等待** 1-2 分钟
4. **成功！** 自动部署工作了！✨

---

## ✅ 第七步：部署 Studio 到线上（5分钟）

### 7.1 在 Netlify 创建 Studio 站点

回到 https://app.netlify.com

**点击** "Add new site" → "Import an existing project"

**选择** "Deploy with GitHub"

**选择**仓库 "ChinaMatri"

### 7.2 配置 Studio 构建（⚠️ 重要！）

**必须填写以下配置**：

```
Base directory:   studio
Build command:    npm run build
Publish directory: studio/dist
Branch to deploy: main
```

⚠️ **确保准确填写**，否则构建会失败！

**点击** "Deploy site"

### 7.3 自定义站点名称

部署成功后：

1. **点击** "Site settings"
2. **点击** "Change site name"
3. **输入**: `matrichina-studio`
4. **保存**

**您的 Studio 网址**:
```
https://matrichina-studio.netlify.app
```

### 7.4 配置 Sanity CORS（⚠️ 必须！）

**打开新标签页**，访问：
```
https://sanity.io/manage
```

**选择**项目 "My Knowledge Base" (8i1xhvuq)

**点击** "API" → "CORS Origins"

**添加以下网址**（一个一个添加）：

#### 添加 1:
```
https://matrichina-studio.netlify.app
```
✅ 勾选 "Allow credentials"

#### 添加 2:
```
https://matrichina.netlify.app
```
✅ 勾选 "Allow credentials"

#### 添加 3 (如果还没有):
```
http://localhost:3333
```
✅ 勾选 "Allow credentials"

#### 添加 4 (如果还没有):
```
http://localhost:8000
```
✅ 勾选 "Allow credentials"

**保存每一个！**

### 7.5 测试 Studio

**访问**: https://matrichina-studio.netlify.app

**点击登录** → 用 Google 或 GitHub 登录

**应该看到**:
- 🗺️ 母系考古/时间线
- 👸 女神谱系
- 🏘️ 现存氏族
- 🏛️ 古代母权社会
- 📚 相关论著
- 👨‍🏫 学者

**能看到？恭喜！全部完成！** 🎊

---

## 🎉 完成检查清单

### GitHub
- [ ] 仓库已创建
- [ ] 代码已推送
- [ ] 可以访问仓库页面

### Netlify 前端
- [ ] 站点已连接 GitHub
- [ ] 自动部署测试成功
- [ ] 网站可以访问

### Netlify Studio
- [ ] Studio 站点已创建
- [ ] 构建配置正确
- [ ] CORS 已配置
- [ ] Studio 可以访问和登录

---

## 🚀 下一步

### 现在您可以：

1. **邀请团队成员**
   - 分享 Studio 链接
   - 在 Sanity 管理后台添加成员

2. **开始添加数据**
   - 在 Studio 添加考古遗址
   - 添加女神谱系
   - 添加现存氏族信息

3. **自动部署**
   - 修改代码 → git push → 自动部署 ✨

---

## 📞 需要帮助？

**遇到问题？**

- **GitHub 推送失败**: 查看上面的 "创建 Personal Access Token"
- **Netlify 构建失败**: 检查 Deploys 页面的构建日志
- **Studio 无法登录**: 检查 CORS 配置
- **前端不显示数据**: 确保 CORS 已配置

**查看详细文档**:
```bash
cat DEPLOY-STEPS.md
```

---

## 🎯 您的网站地址

**前端网站**: https://matrichina.netlify.app

**Studio CMS**: https://matrichina-studio.netlify.app

**GitHub 仓库**: https://github.com/YOUR_USERNAME/ChinaMatri

---

**🎉 恭喜！您的网站已成功部署！**

*现在开始添加您的研究数据吧！* 📚✨

---

*创建时间：2025-11-09*

