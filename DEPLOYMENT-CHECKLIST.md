# ✅ 部署状态检查清单

**检查时间**: 2025-11-09

---

## 🎯 第一步：确认前端网站

### 在 Netlify 查看

访问您的 Netlify 站点页面，检查：

#### ✅ Deploys 标签

- [ ] 能看到最新的部署记录
- [ ] 部署状态是绿色 "Published"
- [ ] 部署时间是最近几分钟

#### ✅ 访问网站

点击站点 URL（类似 `https://matrichina.netlify.app`）

应该看到：
- [ ] 网站首页正常显示
- [ ] 地图页面正常 (`/map.html`)

#### ✅ GitHub 连接

在 Netlify Site settings → Build & deploy：

- [ ] Repository 显示: `chinamatriarchy/ChinaMatri`
- [ ] Branch 设置为: `main`
- [ ] 显示 "Connected to GitHub" ✓

---

## 🧪 第二步：测试自动部署

### 在终端运行测试

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 创建一个小改动
echo "# 自动部署测试 - $(date)" >> README.md

# 提交并推送
git add .
git commit -m "test: 测试自动部署功能"
git push
```

### 在 Netlify 查看

1. 刷新 Deploys 页面
2. 应该看到新的部署开始（黄色）
3. 等待 1-2 分钟
4. 变成绿色 = 成功！✨

---

## 🏗️ 第三步：部署 Studio（重要！）

### 为什么需要部署 Studio？

- ✅ 团队成员可以在线访问 CMS
- ✅ 随时随地添加数据
- ✅ 不需要本地运行

### 创建 Studio 站点

在 Netlify：

1. **点击** "Add new site" → "Import an existing project"
2. **选择** "Deploy with GitHub"
3. **选择** 仓库: `chinamatriarchy/ChinaMatri`
4. **配置构建**（⚠️ 重要！）：
   ```
   Base directory:   studio
   Build command:    npm run build
   Publish directory: studio/dist
   Branch to deploy: main
   ```
5. **点击** "Deploy site"

### 自定义名称

部署成功后：
1. Site settings → Change site name
2. 输入: `matrichina-studio`
3. 保存

**您的 Studio 地址**:
```
https://matrichina-studio.netlify.app
```

---

## 🔐 第四步：配置 CORS（必须！）

### 访问 Sanity 管理后台

https://sanity.io/manage

### 添加 CORS Origins

选择项目 "My Knowledge Base" → API → CORS Origins

#### 添加以下地址（每个单独添加）：

1. **Studio**:
   ```
   https://matrichina-studio.netlify.app
   ```
   ✅ Allow credentials

2. **前端**:
   ```
   https://matrichina.netlify.app
   ```
   ✅ Allow credentials

3. **本地开发** (如果还没有):
   ```
   http://localhost:3333
   http://localhost:8000
   ```
   ✅ Allow credentials

---

## 🎉 完成检查

### 前端网站
- [ ] GitHub 代码已推送
- [ ] Netlify 已连接 GitHub
- [ ] 自动部署测试成功
- [ ] 网站可以访问: https://matrichina.netlify.app

### Studio CMS
- [ ] Studio 站点已创建
- [ ] 构建配置正确
- [ ] 站点名称已自定义
- [ ] CORS 已配置
- [ ] Studio 可以访问: https://matrichina-studio.netlify.app
- [ ] 可以登录并编辑数据

---

## 📊 您的完整系统

```
GitHub 仓库
https://github.com/chinamatriarchy/ChinaMatri
    ↓ git push 自动触发
    
Netlify 前端网站
https://matrichina.netlify.app
    ↓ 读取数据
    
Sanity Cloud (Project: 8i1xhvuq)
    ↑ 管理数据
    
Netlify Studio
https://matrichina-studio.netlify.app
(团队成员在线访问)
```

---

## 🚀 日常使用

### 开发者修改代码

```bash
# 1. 修改代码
vim src/js/mapConfig.js

# 2. 提交推送
git add .
git commit -m "feat: 更新地图配置"
git push

# 3. 自动部署（1-2分钟）✓
```

### 团队成员添加数据

1. 访问: https://matrichina-studio.netlify.app
2. 登录
3. 添加/编辑数据
4. Publish
5. 前端网站立即更新 ✓

---

## 📞 需要帮助？

**告诉我您当前的状态**:

- "前端已部署" = 前端网站工作正常
- "需要部署 Studio" = 继续配置 Studio
- "全部完成" = 所有都设置好了
- "遇到问题：XXX" = 详细说明问题

---

*检查清单创建时间: 2025-11-09*

