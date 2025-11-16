# ✅ Sanity Studio 已成功启动！

## 🎉 当前状态

- ✅ **Sanity Studio 已启动**: http://localhost:3333
- ✅ **浏览器已打开**: 您应该能看到 Studio 登录页面
- ✅ **线上网站运行中**: https://matrichina.netlify.app

---

## 📝 接下来的 5 个步骤

### 1️⃣ 登录 Studio（现在就做）

在浏览器中（http://localhost:3333）：
- 点击 **"Sign in"** 或 **"登录"**
- 选择 **Google** 或 **GitHub** 账号登录
- 首次登录需要授权 Sanity

### 2️⃣ 进入管理界面

登录成功后，您会看到：
```
┌────────────────────────────────┐
│  My Knowledge Base             │
├──────────┬─────────────────────┤
│ 侧边栏   │  主工作区            │
│          │                     │
│ 🗺️ 母系  │  [这里会显示内容列表] │
│   考古   │                     │
│          │  [+ 创建新条目]      │
│ ⭐ 女神  │                     │
│ 👤 学者  │                     │
│ 📚 论著  │                     │
│ 🏘️ 氏族  │                     │
└──────────┴─────────────────────┘
```

### 3️⃣ 创建第一条考古数据

1. 点击左侧 **"🗺️ 母系考古/时间线"**
2. 点击右上角蓝色按钮 **"+ Create"** 或 **"➕ 创建"**
3. 填写以下字段（从您的 Google Sheets 复制）：

**必填字段：**
```
地点：陕西临潼姜寨
文化/遗址：仰韶文化  
年代：公元前5000–4000年
社会与权力特征：母系，村落自治，无人祭
```

**可选字段（帮助排序）：**
```
开始年份（BCE）：5000
结束年份（BCE）：4000
区域分类：黄河流域
文化类型：仰韶文化
社会类型标签：选择 "母系"、"无人祭"
```

### 4️⃣ 发布数据（重要！）

- 填写完后，点击右上角 **"✅ Publish"** 按钮
- **注意**：只有点 **Publish** 数据才会显示在网站上
- **Save** 只是保存草稿，不会公开

### 5️⃣ 查看线上效果

1. 打开您的网站：**https://matrichina.netlify.app**
2. 按 **Cmd + Shift + R** 强制刷新
3. 🎉 您应该能看到刚才添加的数据了！

---

## 📊 您的 Google Sheets 数据结构

您需要录入的 4 个核心字段：

| 字段 | 在 Studio 中的名称 | 示例 |
|------|------------------|------|
| 地点 | 地点 | 陕西临潼姜寨 |
| 文化/遗址 | 文化/遗址 | 仰韶文化 |
| 年代 | 年代 | 公元前5000–4000年 |
| 社会与权力特征 | 社会与权力特征 | 母系，村落自治，无人祭 |

---

## 🚀 批量导入数据（可选）

如果您想快速导入 Google Sheets 的所有数据：

### 方法 1：导出 Google Sheets 为 CSV

1. 打开您的 Google Sheets
2. **文件** → **下载** → **逗号分隔值 (.csv)**
3. 保存到桌面

### 方法 2：使用导入脚本

我可以为您创建一个自动导入脚本，告诉我：
- ✅ 您想要批量导入
- 📄 CSV 文件保存在哪里

---

## 🎯 快速命令参考

```bash
# 启动 Studio（如果关闭了）
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dev

# 访问 Studio
# http://localhost:3333

# 备份数据
npx sanity dataset export production backup.tar.gz

# 部署 Studio 到线上（推荐）
npx sanity deploy
```

---

## 💡 小技巧

### 1. 保存 vs 发布
- **Save（保存）**: 保存为草稿，不会显示在网站
- **Publish（发布）**: 发布到线上，立即在 matrichina.netlify.app 显示

### 2. 编辑已有数据
- 在列表中点击任意条目
- 修改后点击 **Publish** 更新

### 3. 删除数据
- 打开要删除的条目
- 点击右上角 **⋯** (三个点)
- 选择 **Delete**

### 4. 搜索数据
- 使用右上角的搜索框
- 输入关键词快速查找

### 5. 查看数据
- 点击 **Vision** 标签（顶部）
- 可以用 GROQ 查询语言查看所有数据

---

## 🌐 部署 Studio 到线上（强烈推荐）

部署后您可以在任何地方管理数据，不需要启动本地服务：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity deploy
```

会得到一个网址，类似：`https://matrichina.sanity.studio`

---

## 🆘 遇到问题？

### Studio 页面空白？
- 检查浏览器控制台（F12）
- 确认 Project ID 是否正确
- 刷新页面（Cmd + R）

### 无法登录？
- 确保使用 Google 或 GitHub 账号
- 检查网络连接
- 清除浏览器缓存

### 数据不显示在网站？
- ✅ 确认点了 **Publish**（不是只 Save）
- ✅ 等待 10 秒
- ✅ 强制刷新网站（Cmd + Shift + R）
- ✅ 检查浏览器控制台错误

### Studio 启动失败？
```bash
cd studio
rm -rf node_modules
npm install
npx sanity dev
```

---

## 📚 更多文档

- 📖 **MANAGE-ONLINE-SITE.md** - 线上网站完整管理指南
- 📖 **HOW-TO-USE.md** - 详细使用说明
- 📖 **QUICK-START-GUIDE.md** - 快速开始

---

## 🎉 现在开始使用吧！

1. ✅ 在浏览器中登录 Studio（http://localhost:3333）
2. ✅ 点击 "🗺️ 母系考古/时间线"
3. ✅ 创建第一条数据
4. ✅ 点击 **Publish**
5. ✅ 查看 https://matrichina.netlify.app

**祝您使用愉快！** 🌸

---

*需要批量导入数据或遇到任何问题，请随时告诉我！*


