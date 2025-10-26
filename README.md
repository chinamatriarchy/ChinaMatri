# MatriArchive - 中国母权文化数据库

一个关于中国母权/母系文化的综合性学术数据库网站。

## 📚 网站结构

```
ChinaMatri/
├── index.html          # 主页 - 网站入口和概览
├── timeline.html       # 时间线 - 母系社会历史发展
├── map.html           # 考古地图 - 交互式地图展示遗址分布
├── goddess.html       # 女神谱系 - 中国女神神话和崇拜
├── communities.html   # 现存氏族 - 当代母系社会群体
├── works.html         # 相关论著 - 学术文献目录
└── scholars.html      # 学者名录 - 研究学者介绍
```

## 🎨 设计特色

### 视觉风格
- **色彩方案**: 紫色到蓝色渐变 (`#9333ea` - `#3b82f6`)
- **字体**: Noto Serif SC (思源宋体)
- **UI框架**: Tailwind CSS
- **图标**: Feather Icons
- **交互效果**: 动画过渡、悬停效果

### 核心功能

1. **交互式地图** (map.html)
   - 使用 Leaflet.js 实现地理可视化
   - 考古遗址标记和分类
   - 按文化时期筛选
   - 点击查看详情

2. **动态内容加载**
   - JavaScript 渲染数据
   - 搜索和筛选功能
   - 响应式设计

3. **数据组织**
   - 所有数据存储在 JavaScript 数组中
   - 易于扩展和维护
   - 可转换为 JSON 文件

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 语义化标记
- **CSS3**: Tailwind CSS + 自定义样式
- **JavaScript**: 原生 ES6+
- **地图库**: Leaflet.js v1.9.4
- **图标库**: Feather Icons

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

## 🚀 如何扩展

### 1. 添加新数据
在对应页面的 `<script>` 标签中的数组里添加新条目：

```javascript
// 在 map.html 中添加新遗址
archaeologicalSites.push({
    name: "新遗址名称",
    period: "文化类型",
    // ... 其他字段
});
```

### 2. 连接后端数据库

**方案 A: JSON 文件（静态）**
```javascript
// 创建 data/sites.json
fetch('data/sites.json')
    .then(response => response.json())
    .then(data => {
        archaeologicalSites = data;
        addMarkers(archaeologicalSites);
    });
```

**方案 B: API 接口（动态）**
```javascript
// 连接后端 API
fetch('https://api.matriarchive.org/sites')
    .then(response => response.json())
    .then(data => renderSites(data));
```

### 3. 添加数据库支持

**推荐技术栈：**
- **后端**: Node.js + Express / Python + Flask / Django
- **数据库**: 
  - MySQL/PostgreSQL (关系型，适合结构化数据)
  - MongoDB (文档型，适合灵活数据)
- **API**: RESTful API 或 GraphQL

**数据库设计示例：**
```sql
CREATE TABLE archaeological_sites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    period VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    date_period VARCHAR(100),
    description TEXT,
    findings TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP
);
```

### 4. 添加多媒体支持

**图片管理：**
```javascript
// 使用云存储服务（如阿里云OSS、七牛云）
const imageUrl = `https://cdn.matriarchive.org/images/${siteId}.jpg`;
```

**视频嵌入：**
```html
<div class="video-container">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
```

**音频播放器：**
```html
<audio controls>
    <source src="audio/interview.mp3" type="audio/mpeg">
</audio>
```

## 🔧 本地开发

### 运行网站

1. **简单方式**：直接在浏览器中打开 `index.html`

2. **本地服务器**（推荐）：
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000

# 或使用 Live Server (VS Code 插件)
```

3. 访问: `http://localhost:8000`

### 部署到服务器

**方式 1: 静态托管**
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

**方式 2: 传统服务器**
- 上传所有文件到服务器的 Web 目录
- 配置 Nginx/Apache

## 📝 后续优化建议

### 功能增强
1. ✅ **搜索功能**: 已实现基础搜索
2. ⭐ **用户账号系统**: 收藏、笔记、评论
3. ⭐ **多语言支持**: 中英文切换
4. ⭐ **高级筛选**: 多条件组合筛选
5. ⭐ **3D 展示**: 文物三维模型展示
6. ⭐ **时间轴动画**: 更生动的历史演变展示

### 性能优化
1. **图片懒加载**: 提高页面加载速度
2. **代码分离**: 将 JavaScript 移到单独文件
3. **缓存策略**: Service Worker 离线支持
4. **CDN 加速**: 使用 CDN 加速资源加载

### SEO 优化
1. **元标签**: 添加 description, keywords
2. **结构化数据**: Schema.org markup
3. **Sitemap**: 生成网站地图
4. **Analytics**: 添加统计分析

## 📖 学习资源

### 前端开发
- [MDN Web Docs](https://developer.mozilla.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Leaflet 教程](https://leafletjs.com/examples.html)

### 数据库设计
- [Database Design Tutorial](https://www.lucidchart.com/pages/database-diagram/database-design)
- [SQL 教程](https://www.w3schools.com/sql/)
- [MongoDB 大学](https://university.mongodb.com/)

### 后端开发
- [Express.js 指南](https://expressjs.com/)
- [Flask 快速入门](https://flask.palletsprojects.com/)
- [Django 教程](https://docs.djangoproject.com/)

## 📄 许可证

© 2023 MatriArchive. 保留所有权利。

## 📧 联系方式

- Email: contact@matriarchive.org
- 地址: 北京海淀区学院路

---

**开发说明**: 这是一个学术研究型网站，所有内容仅供学习和研究使用。如需引用相关资料，请注明出处。

