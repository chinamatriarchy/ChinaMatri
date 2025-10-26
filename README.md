# 个人知识站点 - CMS 驱动

一个基于 Sanity CMS 的个人知识管理系统，用于收集、整理和展示您感兴趣的知识内容。

## 🌟 特性

- 📚 **内容管理**: 使用 Sanity Studio 轻松管理所有内容
- 🗺️ **地图可视化**: 交互式地图展示地理相关的知识点
- 🎨 **美观设计**: 现代化响应式界面
- 🔒 **完全掌控**: 所有数据和代码都在您的控制之下
- 💾 **易于备份**: 简单的数据导出和导入
- 🚀 **免费托管**: 可使用免费服务部署

## 📚 网站结构

```
个人知识站点/
├── index.html          # 主页
├── timeline.html       # 时间线视图
├── map.html           # 地图可视化（静态版本）
├── map-cms.html       # 地图可视化（CMS版本）✨
├── goddess.html       # 内容分类页面
├── scholars.html      # 人物页面
├── works.html         # 资源页面
├── communities.html   # 社群页面
└── studio/            # Sanity CMS 管理后台
```

## 🎨 设计特色

### 视觉风格
- **色彩方案**: 紫色到蓝色渐变（可自定义）
- **字体**: Noto Serif SC
- **UI框架**: Tailwind CSS
- **图标**: Feather Icons
- **交互**: 流畅的动画过渡

### 核心功能

1. **交互式地图** (map-cms.html)
   - 使用 Leaflet.js 实现地理可视化
   - 从 Sanity CMS 动态加载数据
   - 支持按类别筛选
   - 点击查看详情

2. **内容管理 (Sanity Studio)**
   - 可视化编辑器
   - 图片上传和优化
   - 富文本编辑
   - 实时预览

3. **动态内容**
   - 从 CMS 实时加载
   - 无需重新部署即可更新内容
   - 响应式设计
   - 搜索和筛选

## 🛠️ 技术栈

### 前端
- HTML5 + CSS3
- Tailwind CSS
- JavaScript (ES6+)
- Leaflet.js (地图可视化)
- Feather Icons

### CMS
- Sanity.io
- Sanity Studio
- GROQ 查询语言

### 托管
- 网站：Netlify / Vercel / GitHub Pages
- Studio：Sanity 托管 (免费)
- 图片：Sanity CDN (自动优化)

### CDN 资源
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Feather Icons -->
<script src="https://unpkg.com/feather-icons"></script>

<!-- Leaflet 地图 -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

## 📊 数据结构示例

### 考古遗址数据 (map.html)
```javascript
const archaeologicalSites = [
    {
        name: "半坡遗址",
        period: "yangshao",
        periodName: "仰韶文化",
        lat: 34.27,
        lng: 109.00,
        date: "约公元前4800-3600年",
        description: "...",
        findings: "彩陶、石器、房屋遗址",
        image: "..."
    }
];
```

### 女神数据 (goddess.html)
```javascript
const goddesses = [
    {
        name: "女娲",
        category: "creation",
        categoryName: "创世女神",
        description: "...",
        image: "...",
        link: "#nuwa"
    }
];
```

## 🚀 快速开始

### 1. 克隆并安装

```bash
git clone <your-repo-url>
cd personal-knowledge-site
npm install
```

### 2. 创建 Sanity 项目

```bash
npx sanity login
cd studio
npx sanity init
```

### 3. 配置 Project ID

在以下文件中替换 `your-project-id`：
- `studio/sanity.config.js`
- `src/js/sanityClient.js`
- `src/js/sanity-browser.js`

### 4. 启动开发环境

```bash
# Terminal 1: Sanity Studio
cd studio
npx sanity dev

# Terminal 2: 网站
npm start
```

访问：
- Studio: http://localhost:3333
- 网站: http://localhost:8000

**详细步骤请查看 `QUICKSTART.md`** 📖

## 📊 数据结构

### 内容模型 (Schemas)

1. **archaeologicalSite** - 地理位置相关的内容
   - 名称、位置坐标、描述、图片等
   
2. **goddess** - 分类内容示例
   - 支持富文本、分类、标签

3. **scholar** - 人物信息
   - 姓名、领域、作品列表

4. **publication** - 资源/文档
   - 标题、作者、标签、链接

5. **community** - 群组/社区
   - 地理位置、图片集、描述

💡 这些模型可以根据您的需求自由修改和扩展！

## 🔧 自定义指南

### 修改 Studio 名称

编辑 `studio/sanity.config.js`：
```javascript
title: 'Your Custom Title'
```

### 添加新的内容类型

1. 在 `studio/schemas/` 创建新文件
2. 定义 schema
3. 在 `studio/schemas/index.js` 中导入

### 自定义主题颜色

编辑 HTML 文件中的 Tailwind 类或添加自定义 CSS。

## 🚢 部署

详细部署指南请查看 `DEPLOYMENT.md`

### 快速部署

**Netlify (推荐):**
```bash
git push  # 推送到 GitHub
# 在 Netlify 连接仓库即可自动部署
```

**Sanity Studio:**
```bash
cd studio
npx sanity deploy
```

您的 Studio 将部署到：`https://your-project.sanity.studio`

## 💾 数据备份

定期备份您的知识库：

```bash
cd studio
npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz
```

💡 建议设置自动备份脚本（cron job）

## 📖 文档

- 📖 **QUICKSTART.md** - 15分钟快速上手 ⭐
- 📖 **DEPLOYMENT.md** - 完整部署指南
- 📖 **CMS-SETUP.md** - CMS 详细设置
- 📖 **PROJECT-STRUCTURE.md** - 项目结构说明
- 📖 **GUIDE.md** - 技术详解
- 📖 **GIT-GUIDE.md** - Git 版本管理

## 🆘 故障排除

### CORS 错误
在 Sanity 项目设置中添加您的域名到 CORS Origins。

### 数据不显示
1. 检查 Project ID 是否正确
2. 确认数据已在 Studio 中发布
3. 查看浏览器控制台的错误信息

### 图片无法加载
确保使用 `getImageUrl()` 函数生成正确的 URL。

更多问题请查看各个文档文件的故障排除部分。

## 🔒 隐私和安全

- ✅ 所有数据由您控制
- ✅ 可以随时导出全部内容
- ✅ 使用 HTTPS 加密传输
- ✅ 可以设置访问权限
- ✅ 定期备份防止数据丢失

## 💰 成本

### 免费使用（推荐）
- Sanity Free Plan: 无限文档，10GB 存储
- Netlify/Vercel: 100GB 带宽/月
- **总成本：$0/月** ✅

### 扩展选项
如需更多资源，付费计划从 $19/月起。

## 🤝 贡献

这是您的个人项目！可以随意修改、扩展和定制。

## 📄 许可证

MIT License - 可以自由使用和修改

---

## ⭐ 下一步

1. 📖 阅读 `QUICKSTART.md` 开始设置
2. 🎨 自定义设计和内容模型
3. ✍️ 添加您的第一篇内容
4. 🚀 部署到您的个人域名

**开始构建您的个人知识库吧！** 🎉

