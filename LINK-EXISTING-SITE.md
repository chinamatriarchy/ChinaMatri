# 🔗 连接 GitHub 到现有 Netlify 站点

**当前情况**: 您有现有的 Netlify 站点需要连接到 GitHub

---

## 📊 您的站点

### 站点 1: elaborate-pixie-2e171c.netlify.app
- **状态**: 已存在（手动部署）
- **需要**: 连接到 GitHub ✓

### 站点 2: matrichina.netlify.app
- **可能性 A**: 是站点 1 的自定义域名
- **可能性 B**: 是另一个独立站点

---

## 🎯 第一步：确认站点关系

### 在 Netlify 中查看

1. **访问**: https://app.netlify.com
2. **查看所有站点**
3. **确认**:
   - 只有一个站点？→ matrichina.netlify.app 是自定义域名
   - 两个站点？→ 它们是独立的

---

## 🔗 第二步：连接 GitHub 到 elaborate-pixie

### 在 Netlify 操作：

1. **点击** `elaborate-pixie-2e171c` 站点
2. **点击** "Site settings"（左侧菜单）
3. **点击** "Build & deploy"
4. **找到** "Continuous deployment" 部分
5. **点击** "Link site to Git" 或 "Link repository"

### 配置 GitHub 连接：

1. **选择** "GitHub"
2. **授权** Netlify（如果需要）
3. **选择仓库**: `chinamatriarchy/ChinaMatri`
4. **配置**:
   ```
   Branch: main
   Base directory: (留空)
   Build command: (留空)
   Publish directory: .
   ```
5. **保存**

---

## 🎨 第三步：配置自定义域名（可选）

### 如果您想要 matrichina.netlify.app 这个名字：

在 elaborate-pixie 站点：

1. **Site settings** → **Domain management**
2. **点击** "Options" → "Edit site name"
3. **输入**: `matrichina`
4. **保存**

**新网址**: `https://matrichina.netlify.app`

---

## 🚀 第四步：测试自动部署

### 在终端运行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 创建改动
echo "# 测试自动部署" >> README.md

# 提交推送
git add .
git commit -m "test: 测试 elaborate-pixie 站点自动部署"
git push
```

### 在 Netlify 查看：

1. 进入 elaborate-pixie 站点
2. 点击 "Deploys" 标签
3. 应该看到新的部署开始
4. 等待 1-2 分钟
5. 成功！✨

---

## 🏛️ 第五步：部署 Studio

### 创建新站点部署 Studio：

1. **点击** "Add new site" → "Import an existing project"
2. **选择** "GitHub"
3. **选择** `chinamatriarchy/ChinaMatri`
4. **配置**（⚠️ 重要）:
   ```
   Base directory:   studio
   Build command:    npm run build
   Publish directory: studio/dist
   ```
5. **部署**

### 自定义名称：

- Site settings → Change site name
- 输入: `matrichina-studio`
- 网址: `https://matrichina-studio.netlify.app`

---

## 🔐 第六步：配置 CORS

访问 https://sanity.io/manage

添加 CORS Origins：

1. `https://elaborate-pixie-2e171c.netlify.app` ✅ Allow credentials
2. `https://matrichina-studio.netlify.app` ✅ Allow credentials
3. `http://localhost:3333` ✅ Allow credentials
4. `http://localhost:8000` ✅ Allow credentials

---

## 📋 检查清单

### 前端网站
- [ ] GitHub 已连接到 elaborate-pixie 站点
- [ ] 自动部署测试成功
- [ ] 站点名称已修改（可选）

### Studio
- [ ] Studio 站点已创建
- [ ] 构建配置正确
- [ ] CORS 已配置
- [ ] 可以登录和编辑

---

## 🎯 完成后您将拥有

```
GitHub 仓库
https://github.com/chinamatriarchy/ChinaMatri
    ↓ 自动部署
    
前端网站
https://matrichina.netlify.app (或 elaborate-pixie)
    ↓ 读取数据
    
Sanity Cloud
    ↑ 管理数据
    
Studio CMS  
https://matrichina-studio.netlify.app
```

---

## 💡 建议

### 简化站点管理

**选项 A**: 统一使用 elaborate-pixie 站点
- 改名为 matrichina
- 连接 GitHub
- 一个站点管理所有

**选项 B**: 删除重复站点
- 保留一个前端站点
- 新建 Studio 站点
- 清晰简单

---

## 🚀 现在开始

**第一步**: 在 Netlify 找到 elaborate-pixie 站点

**第二步**: 告诉我 "已找到"

我会继续指导您连接 GitHub！

---

*创建时间: 2025-11-09*

