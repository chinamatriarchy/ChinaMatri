# 🎓 网站数据管理完整指南

## 📊 您的网站架构

```
┌─────────────────────────────────┐
│   Sanity Studio (管理后台)         │  ← 您在这里管理数据
│   http://localhost:3333          │
└──────────────┬──────────────────┘
               │ 自动同步
               ↓
┌─────────────────────────────────┐
│   前端网站                         │  ← 访客在这里查看内容
│   http://localhost:8000          │
└─────────────────────────────────┘
```

---

## 🚀 第一步：启动管理后台

### 方法 1：使用命令行（推荐）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dev
```

启动后会自动打开浏览器，访问：**http://localhost:3333**

### 方法 2：使用 npm 脚本

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
npm run studio
```

---

## 📝 第二步：在 Studio 中管理数据

### 登录 Sanity Studio

1. 浏览器打开 http://localhost:3333
2. 使用 Google 或 GitHub 账号登录（首次使用需要授权）
3. 登录后您会看到管理界面

### 界面说明

```
┌────────────────────────────────────────┐
│  🏠 My Knowledge Base                  │  ← 项目名称
├────────────────┬───────────────────────┤
│ 📋 内容类型      │  内容列表              │
│                │                       │
│ 🗺️ 母系考古/时间线 │  [+ 创建新条目]        │
│ ⭐ 女神         │                       │
│ 👤 学者         │  □ 陕西临潼姜寨 - 仰韶文化│
│ 📚 论著         │  □ 宝鸡北首岭 - 仰韶晚期  │
│ 🏘️ 现存氏族     │  □ 甘肃秦安大地湾四期    │
│                │                       │
└────────────────┴───────────────────────┘
```

---

## ✏️ 添加新数据（以考古遗址为例）

### 1. 点击左侧 "🗺️ 母系考古/时间线"

### 2. 点击右上角 "➕ 创建新条目"

### 3. 填写数据（根据您的 Google Sheets）

#### **核心字段**（必填）

| 字段名 | 说明 | 示例 |
|--------|------|------|
| **地点** | 遗址所在地 | `陕西临潼姜寨` |
| **文化/遗址** | 文化类型 | `仰韶文化` |
| **年代** | 时间范围 | `公元前5000–4000年` |
| **社会与权力特征** | 社会特征描述 | `母系，村落自治，无人祭` |

#### **扩展字段**（可选，帮助排序和筛选）

| 字段名 | 说明 | 示例 |
|--------|------|------|
| **开始年份（BCE）** | 起始年份（公元前） | `5000` |
| **结束年份（BCE）** | 结束年份（公元前） | `4000` |
| **区域分类** | 地理区域 | 选择 `黄河流域` |
| **文化类型** | 考古学分类 | 选择 `仰韶文化` |
| **社会类型标签** | 筛选标签 | 选择 `母系`、`无人祭` |

#### **详细信息**（可选）

- **详细描述**：富文本编辑，可以添加段落、列表、粗体等
- **地图坐标**：点击地图或输入经纬度
- **主要发现**：点击 "+ Add item" 添加多个发现
- **主图片**：点击上传图片

### 4. 点击右上角 "✅ Publish" 发布

**注意**：只有点击 Publish 后，数据才会在前端网站显示！

---

## 📥 批量导入数据（从 Google Sheets）

### 方法 1：手动复制粘贴（适合少量数据）

1. 从 Google Sheets 复制一行数据
2. 在 Studio 中创建新条目
3. 逐字段粘贴

### 方法 2：CSV 导入脚本（适合大量数据）

我可以为您创建一个导入脚本，步骤如下：

#### 步骤 1：导出 Google Sheets 为 CSV

1. 打开您的 Google Sheets
2. 文件 → 下载 → 逗号分隔值 (.csv)
3. 保存为 `sites.csv`

#### 步骤 2：放置 CSV 文件

```bash
mv ~/Downloads/sites.csv /Users/xiaowanyu/03_孵化项目/ChinaMatri/data/sites.csv
```

#### 步骤 3：运行导入脚本（我可以为您创建）

```bash
npm run import-sites
```

**需要我为您创建这个导入脚本吗？**

---

## 🌐 第三步：查看前端网站

### 启动前端服务器

#### 方法 1：Python HTTP Server（推荐）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
python3 -m http.server 8000
```

访问：**http://localhost:8000**

#### 方法 2：使用 npm 脚本

```bash
npm start
```

### 查看不同页面

- **时间线页面**：http://localhost:8000/timeline.html
- **地图页面（CMS版）**：http://localhost:8000/map-cms.html
- **女神谱系**：http://localhost:8000/goddess-cms.html
- **学者名录**：http://localhost:8000/scholars.html

---

## 🎯 常用操作

### 编辑已有数据

1. 在 Studio 左侧点击内容类型
2. 在列表中找到要编辑的条目
3. 点击进入编辑
4. 修改后点击 "✅ Publish"

### 删除数据

1. 打开要删除的条目
2. 点击右上角 "⋯"（三个点）
3. 选择 "Delete"
4. 确认删除

### 搜索数据

在 Studio 右上角的搜索框中输入关键词

### 筛选数据

在列表视图中使用顶部的筛选器

---

## 🔄 数据同步说明

### 自动同步

- ✅ 在 Studio 发布数据后，前端网站**立即**可以看到更新
- ✅ 无需重新部署网站
- ✅ 多人可以同时编辑（如果您邀请了协作者）

### 刷新页面

如果前端没有显示最新数据，请：
1. 刷新浏览器（Cmd + R）
2. 清除缓存（Cmd + Shift + R）

---

## 📤 数据备份与导出

### 导出所有数据（推荐定期备份）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dataset export production backup.tar.gz
```

### 导出为 JSON

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
npm run export
```

导出的文件保存在 `data/` 目录

---

## 🚀 部署到线上

### 部署 Studio（管理后台）

```bash
cd studio
npx sanity deploy
```

您的 Studio 将部署到：`https://your-project.sanity.studio`

### 部署前端网站（Netlify）

1. 推送代码到 GitHub
2. 在 Netlify 连接您的仓库
3. 自动部署完成

详细步骤请查看 `DEPLOYMENT.md`

---

## 🆘 常见问题

### Q1: Studio 启动失败？

**解决方法**：
```bash
cd studio
npm install
npx sanity dev
```

### Q2: 数据不显示在前端？

**检查清单**：
- [ ] 数据是否已在 Studio 中 Publish（而不只是 Save）
- [ ] Project ID 是否正确配置
- [ ] 浏览器控制台是否有错误（F12 查看）
- [ ] CORS 是否已在 Sanity 后台配置

### Q3: 如何添加协作者？

1. 访问 https://sanity.io/manage
2. 选择您的项目
3. 进入 "Team" 标签
4. 邀请成员

### Q4: 如何修改 Schema（数据结构）？

编辑 `studio/schemas/archaeologicalSite.js`，然后重启 Studio。

### Q5: 图片上传失败？

检查您的 Sanity 计划是否有足够的存储空间（免费版 10GB）。

---

## 📚 相关文档

- **快速开始**：`QUICKSTART.md`
- **部署指南**：`DEPLOYMENT.md`
- **Schema 修改**：`SCHEMA-MODIFICATION-GUIDE.md`
- **统一模型指南**：`UNIFIED-MODEL-GUIDE.md`

---

## 💡 最佳实践

### 1. 定期备份
建议每周备份一次数据：
```bash
npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz
```

### 2. 使用草稿功能
- 编辑时先保存为草稿（Save）
- 检查无误后再发布（Publish）

### 3. 添加内部备注
使用 "内部备注" 字段记录数据来源或待办事项

### 4. 标记重要数据
使用 "⭐ 重点展示" 和 "重要程度" 字段

### 5. 关联相关内容
使用 "相关女神"、"相关学者" 建立数据之间的联系

---

## 🎉 开始使用吧！

1. **启动 Studio**：`cd studio && npx sanity dev`
2. **打开浏览器**：访问 http://localhost:3333
3. **添加第一条数据**：点击 "🗺️ 母系考古/时间线" → "➕ 创建"
4. **查看效果**：启动前端网站查看

**祝您使用愉快！** 🚀

---

*最后更新：2025-11-09*


