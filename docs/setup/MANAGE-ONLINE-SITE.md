# 🌐 MatriChina 线上网站管理指南

## 您的网站架构

```
┌─────────────────────────────────────┐
│  您的线上网站 (访客看这里)             │
│  https://matrichina.netlify.app     │
│                                     │
│  自动从 Sanity CMS 读取数据          │
└──────────────┬──────────────────────┘
               │
               │ 实时同步
               │
┌──────────────┴──────────────────────┐
│  Sanity CMS 云端数据库               │
│  (您的数据存储在这里)                │
└──────────────┬──────────────────────┘
               │
               │ 您在这里管理数据
               │
┌──────────────┴──────────────────────┐
│  Sanity Studio (管理后台)            │
│  http://localhost:3333              │
│  或 https://xxx.sanity.studio       │
└─────────────────────────────────────┘
```

---

## 🎯 工作流程（重要！）

### 1️⃣ 打开 Sanity Studio 管理后台

**本地访问：** http://localhost:3333

或者

**线上访问：** 如果您已部署 Studio，访问 `https://your-project.sanity.studio`

### 2️⃣ 登录 Studio

- 使用 Google 或 GitHub 账号登录
- 首次登录会要求授权

### 3️⃣ 添加/编辑数据

在 Studio 中：
1. 点击左侧 **"🗺️ 母系考古/时间线"**
2. 点击 **"➕ 创建新条目"**
3. 填写数据（从您的 Google Sheets）
4. 点击 **"✅ Publish"** 发布

### 4️⃣ 查看效果

**立即生效！** 刷新您的网站：
- 🌐 https://matrichina.netlify.app

数据会**自动实时显示**在您的线上网站！

---

## 📝 如何从 Google Sheets 迁移数据

您的 Google Sheets 有 4 列数据：
1. 地点
2. 文化/遗址
3. 年代
4. 社会与权力特征

### 方法 1：手动录入（推荐新手）

逐条在 Studio 中创建：

```
地点：陕西临潼姜寨
文化/遗址：仰韶文化
年代：公元前5000–4000年
社会与权力特征：母系，村落自治，无人祭
```

### 方法 2：CSV 批量导入（快速）

我可以为您创建导入脚本：

1. **导出 Google Sheets**
   - 文件 → 下载 → CSV
   
2. **运行导入脚本**
   ```bash
   npm run import-sites
   ```

需要我现在为您创建这个导入脚本吗？

---

## 🎨 Sanity Studio 使用技巧

### 必填字段

- ✅ **地点**：遗址位置（例：陕西临潼姜寨）
- ✅ **文化/遗址**：文化类型（例：仰韶文化）
- ✅ **年代**：时间范围（例：公元前5000–4000年）
- ✅ **社会与权力特征**：描述（例：母系，村落自治，无人祭）

### 可选字段（增强功能）

- **开始年份**：用于时间线排序（例：5000）
- **结束年份**：用于时间线排序（例：4000）
- **区域分类**：黄河流域、长江流域等
- **文化类型**：选择标准分类
- **社会类型标签**：母系、父系、人祭、无人祭等
- **地图坐标**：在地图上显示位置
- **主图片**：上传相关图片
- **详细描述**：富文本描述

### 重要操作

- **Save（保存）**：保存草稿，不会显示在网站上
- **Publish（发布）**：发布到线上，**立即**在 matrichina.netlify.app 上显示
- **Unpublish（取消发布）**：从网站上移除
- **Delete（删除）**：永久删除

---

## 🚀 Studio 启动命令

### 启动本地 Studio

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dev
```

然后访问：http://localhost:3333

### 部署 Studio 到线上（推荐）

部署后您可以在任何地方管理数据：

```bash
cd studio
npx sanity deploy
```

会得到一个网址，例如：`https://matrichina.sanity.studio`

---

## 🌐 您的网站页面

您的网站 https://matrichina.netlify.app 已经包含这些页面：

| 页面 | 网址 | 说明 |
|------|------|------|
| 首页 | `/` | 网站首页 |
| 定义 | `/#definition` | 母权定义 |
| 时间线 | `/timeline.html` | 时间线展示 |
| 考古地图 | `/map-cms.html` | 地图展示遗址 |
| 女神谱系 | `/goddess-cms.html` | 女神列表 |
| 现存氏族 | `/communities.html` | 现存母系社会 |
| 相关论著 | `/works.html` | 学术论著 |
| 学者名录 | `/scholars.html` | 学者信息 |

---

## 🔄 数据同步说明

### 实时同步

- ✅ 在 Studio 中点击 **Publish** 后，数据**立即**同步
- ✅ 无需重新部署网站
- ✅ 全球 CDN 加速，访问快速
- ✅ 多人可同时编辑（如果邀请了协作者）

### 验证数据

1. 在 Studio 发布数据
2. 打开 https://matrichina.netlify.app
3. 按 **Cmd + Shift + R**（强制刷新）
4. 查看新数据是否显示

如果没显示：
- 检查是否点击了 **Publish**（不是只 Save）
- 检查浏览器控制台是否有错误（F12）
- 等待 10 秒后再刷新

---

## 📊 数据示例（从您的 Google Sheets）

### 示例 1：仰韶文化

```
地点：陕西临潼姜寨
文化/遗址：仰韶文化
年代：公元前5000–4000年
社会与权力特征：母系，村落自治，无人祭

可选：
开始年份：5000
结束年份：4000
区域分类：黄河流域
文化类型：仰韶文化
社会类型标签：母系、无人祭
```

### 示例 2：龙山文化

```
地点：山西襄汾陶寺
文化/遗址：龙山文化
年代：公元前2500–1900年
社会与权力特征：宫殿、人殉、王级墓，父权

可选：
开始年份：2500
结束年份：1900
区域分类：黄河流域
文化类型：龙山文化
社会类型标签：父系、人殉、宫殿
```

---

## 🛠️ 快速命令参考

```bash
# 启动本地 Studio
cd studio && npx sanity dev

# 部署 Studio 到线上
cd studio && npx sanity deploy

# 备份数据
cd studio && npx sanity dataset export production backup.tar.gz

# 查看数据
cd studio && npx sanity dataset list

# 邀请协作者
# 访问 https://sanity.io/manage → 选择项目 → Team
```

---

## 🎯 下一步行动

### ✅ 现在就可以做：

1. **打开 Studio**
   - 访问 http://localhost:3333
   - 或运行 `cd studio && npx sanity dev`

2. **登录 Studio**
   - 使用 Google 或 GitHub 账号

3. **添加第一条数据**
   - 点击 "🗺️ 母系考古/时间线"
   - 填写从 Google Sheets 复制的数据
   - 点击 **Publish**

4. **查看效果**
   - 访问 https://matrichina.netlify.app
   - 刷新页面
   - 看到您的数据！

### 🚀 推荐：部署 Studio 到线上

部署后您可以：
- ✅ 在任何电脑上管理数据
- ✅ 不需要启动本地服务
- ✅ 分享给协作者使用

```bash
cd studio
npx sanity deploy
```

---

## 💡 提示

1. **定期备份**
   ```bash
   cd studio
   npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz
   ```

2. **邀请协作者**
   - 访问 https://sanity.io/manage
   - 选择您的项目
   - Team → Invite members

3. **设置 CORS**
   - 如果遇到 CORS 错误
   - 在 https://sanity.io/manage
   - 选择项目 → API → CORS Origins
   - 添加 `https://matrichina.netlify.app`

4. **查看使用量**
   - Sanity 免费版：无限文档，10GB 存储
   - 查看：https://sanity.io/manage

---

## 🆘 常见问题

### Q: 数据不显示在网站上？

**A:** 检查：
- ✅ 是否点击了 **Publish**（不是只 Save）
- ✅ 等待 10 秒后强制刷新（Cmd + Shift + R）
- ✅ 检查浏览器控制台是否有错误

### Q: Studio 无法访问？

**A:** 确保服务正在运行：
```bash
cd studio
npx sanity dev
```

### Q: 如何修改数据结构？

**A:** 编辑 `studio/schemas/archaeologicalSite.js`，然后重启 Studio

### Q: 如何批量导入数据？

**A:** 我可以为您创建 CSV 导入脚本，请告诉我！

---

## 📞 需要帮助？

- 📧 查看 Sanity 文档：https://sanity.io/docs
- 📖 查看本地文档：HOW-TO-USE.md
- 💬 告诉我您的问题，我会帮您解决！

---

**开始管理您的母权数据库吧！** 🌸

*最后更新：2025-11-09*


