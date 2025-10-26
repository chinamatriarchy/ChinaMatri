# 如何建立数据库网站 - 技术指南

## 📘 教程概述

这份指南将教您如何建立一个**多媒体数据库网站**，包含：
- 交互式地图可视化
- 动态数据展示
- 搜索和筛选功能
- 多媒体内容管理

## 🏗️ 网站架构

### 方案一：纯前端（当前实现）

**适用场景**: 小型项目、原型开发、静态内容

```
┌─────────────────────────────────────┐
│         用户浏览器                    │
│  ┌─────────────────────────────┐   │
│  │  HTML + CSS + JavaScript     │   │
│  │  - 数据存储在 JS 数组中       │   │
│  │  - 客户端渲染                │   │
│  │  - 无需服务器                │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**优点**:
- ✅ 简单快速，无需服务器
- ✅ 免费托管（GitHub Pages）
- ✅ 易于维护

**缺点**:
- ❌ 数据量有限
- ❌ 无法动态更新
- ❌ 无用户系统

### 方案二：前端 + JSON 文件

**适用场景**: 中型项目、需要频繁更新数据

```
┌─────────────────────────────────────┐
│         用户浏览器                    │
│  ┌─────────────────────────────┐   │
│  │     HTML + JavaScript        │   │
│  │          ↓ fetch             │   │
│  │     data/sites.json          │   │
│  │     data/scholars.json       │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**实现步骤**:

1. **创建数据文件夹**:
```bash
mkdir data
```

2. **创建 JSON 文件** (`data/sites.json`):
```json
[
  {
    "name": "半坡遗址",
    "period": "yangshao",
    "lat": 34.27,
    "lng": 109.00,
    "date": "约公元前4800-3600年",
    "description": "位于陕西西安...",
    "findings": "彩陶、石器、房屋遗址",
    "image": "/images/banpo.jpg"
  }
]
```

3. **在 HTML 中加载数据**:
```javascript
// 在 map.html 中
fetch('data/sites.json')
    .then(response => response.json())
    .then(data => {
        archaeologicalSites = data;
        addMarkers(archaeologicalSites);
    })
    .catch(error => console.error('加载数据失败:', error));
```

**优点**:
- ✅ 数据与代码分离
- ✅ 易于更新和维护
- ✅ 支持版本控制

### 方案三：完整数据库系统（推荐用于大型项目）

**适用场景**: 大型项目、需要用户交互、内容管理系统

```
┌─────────────────────────┐
│      用户浏览器           │
│   (HTML/CSS/JS)         │
└───────────┬─────────────┘
            │ HTTPS
            ↓
┌─────────────────────────┐
│    Web 服务器            │
│   (Node.js/Python)      │
│   ┌─────────────────┐   │
│   │  API 接口        │   │
│   │  /api/sites     │   │
│   │  /api/scholars  │   │
│   └────────┬────────┘   │
└────────────┼────────────┘
             ↓
┌─────────────────────────┐
│      数据库              │
│  MySQL / MongoDB        │
│  ┌─────────────────┐   │
│  │  sites 表        │   │
│  │  scholars 表     │   │
│  │  images 表       │   │
│  └─────────────────┘   │
└─────────────────────────┘
```

## 🗺️ 地图可视化实现

### 使用 Leaflet.js（已实现）

**1. 引入库**:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

**2. 创建地图容器**:
```html
<div id="map" style="height: 600px;"></div>
```

**3. 初始化地图**:
```javascript
// 创建地图，设置中心和缩放级别
const map = L.map('map').setView([35.0, 110.0], 5);

// 添加地图图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 添加标记
L.marker([34.27, 109.00])
    .addTo(map)
    .bindPopup('<b>半坡遗址</b><br>仰韶文化');
```

**4. 自定义标记**:
```javascript
// 使用圆形标记，按类型着色
L.circleMarker([lat, lng], {
    radius: 8,
    fillColor: '#9333ea',  // 紫色
    color: '#fff',
    weight: 2,
    fillOpacity: 0.8
}).addTo(map);
```

### 使用 ECharts（适合中国地图）

```javascript
// 引入 ECharts
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/map/js/china.js"></script>

// 初始化
const chart = echarts.init(document.getElementById('map'));

const option = {
    geo: {
        map: 'china',
        roam: true,
        itemStyle: {
            areaColor: '#f3f3f3',
            borderColor: '#999'
        }
    },
    series: [{
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [
            {name: '半坡遗址', value: [109.00, 34.27]},
            {name: '河姆渡遗址', value: [121.35, 30.03]}
        ]
    }]
};

chart.setOption(option);
```

## 💾 数据存储方案对比

### 1. JavaScript 数组（当前方案）

```javascript
const data = [
    {id: 1, name: "项目1", ...},
    {id: 2, name: "项目2", ...}
];
```

**优点**: 简单快速  
**缺点**: 数据量有限（建议 < 1000 条）

### 2. JSON 文件

```javascript
// data/sites.json
[{...}, {...}]

// 加载
fetch('data/sites.json').then(r => r.json()).then(data => {...})
```

**优点**: 数据分离、易维护  
**缺点**: 需要本地服务器测试（CORS 问题）

### 3. 本地存储 (LocalStorage)

```javascript
// 保存
localStorage.setItem('sites', JSON.stringify(data));

// 读取
const data = JSON.parse(localStorage.getItem('sites'));
```

**优点**: 浏览器端持久化  
**缺点**: 容量限制（~5MB）、仅客户端

### 4. MySQL 数据库

```sql
-- 创建表
CREATE TABLE sites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    period VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    image_url VARCHAR(255)
);

-- 插入数据
INSERT INTO sites (name, period, latitude, longitude)
VALUES ('半坡遗址', 'yangshao', 34.27, 109.00);
```

**后端 API (Node.js + Express)**:
```javascript
const express = require('express');
const mysql = require('mysql2');

const app = express();
const db = mysql.createConnection({...});

app.get('/api/sites', (req, res) => {
    db.query('SELECT * FROM sites', (err, results) => {
        res.json(results);
    });
});
```

**前端调用**:
```javascript
fetch('http://localhost:3000/api/sites')
    .then(r => r.json())
    .then(data => renderSites(data));
```

### 5. MongoDB 数据库

```javascript
// 文档结构
{
    _id: ObjectId("..."),
    name: "半坡遗址",
    period: "yangshao",
    location: {
        type: "Point",
        coordinates: [109.00, 34.27]
    },
    date: "约公元前4800-3600年",
    images: ["img1.jpg", "img2.jpg"],
    multimedia: {
        videos: ["video1.mp4"],
        audio: ["guide.mp3"]
    }
}
```

**后端 API (Node.js + MongoDB)**:
```javascript
const express = require('express');
const mongoose = require('mongoose');

const Site = mongoose.model('Site', {
    name: String,
    period: String,
    location: {
        type: { type: String },
        coordinates: [Number]
    }
});

app.get('/api/sites', async (req, res) => {
    const sites = await Site.find();
    res.json(sites);
});
```

## 🖼️ 多媒体管理

### 图片管理

**方案 1: 本地存储**
```
images/
  ├── sites/
  │   ├── banpo.jpg
  │   └── hemudu.jpg
  ├── goddesses/
  └── scholars/
```

```html
<img src="images/sites/banpo.jpg" alt="半坡遗址">
```

**方案 2: 云存储（推荐）**

使用阿里云 OSS / 七牛云 / 腾讯云 COS:

```javascript
const imageUrl = `https://cdn.matriarchive.com/sites/${siteId}.jpg`;
```

**方案 3: 数据库存储**

```sql
CREATE TABLE images (
    id INT PRIMARY KEY,
    site_id INT,
    url VARCHAR(255),
    thumbnail_url VARCHAR(255),
    caption TEXT,
    FOREIGN KEY (site_id) REFERENCES sites(id)
);
```

### 视频集成

**YouTube/Bilibili 嵌入**:
```html
<div class="video-container">
    <iframe 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>
```

**自托管视频**:
```html
<video controls width="100%">
    <source src="videos/mosuo-culture.mp4" type="video/mp4">
    您的浏览器不支持视频标签。
</video>
```

### 音频指南

```html
<audio controls>
    <source src="audio/banpo-guide.mp3" type="audio/mpeg">
</audio>
```

## 🔍 搜索功能实现

### 客户端搜索（已实现）

```javascript
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allData.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
    renderResults(filtered);
});
```

### 全文搜索（服务器端）

**使用 MySQL 全文索引**:
```sql
-- 创建全文索引
ALTER TABLE sites ADD FULLTEXT(name, description);

-- 搜索
SELECT * FROM sites 
WHERE MATCH(name, description) AGAINST('仰韶' IN NATURAL LANGUAGE MODE);
```

**使用 Elasticsearch（高级）**:
```javascript
// 索引文档
await client.index({
    index: 'sites',
    body: {
        name: '半坡遗址',
        description: '...',
        period: 'yangshao'
    }
});

// 搜索
const result = await client.search({
    index: 'sites',
    body: {
        query: {
            multi_match: {
                query: '仰韶',
                fields: ['name', 'description']
            }
        }
    }
});
```

## 📱 响应式设计

使用 Tailwind CSS 的响应式类：

```html
<!-- 移动端 1 列，平板 2 列，桌面 3 列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- 内容 -->
</div>

<!-- 移动端隐藏，桌面显示 -->
<div class="hidden md:block">
    导航菜单
</div>

<!-- 移动端显示，桌面隐藏 -->
<div class="md:hidden">
    汉堡菜单
</div>
```

## 🚀 部署方案

### 1. 静态托管（免费）

**GitHub Pages**:
```bash
# 1. 推送到 GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/ChinaMatri.git
git push -u origin main

# 2. 在 GitHub 仓库设置中启用 Pages
# Settings > Pages > Source: main branch
# 访问: https://username.github.io/ChinaMatri
```

**Netlify**:
```bash
# 拖放文件夹到 Netlify 或连接 GitHub
# 自动部署，支持自定义域名
```

### 2. 服务器部署

**Nginx 配置**:
```nginx
server {
    listen 80;
    server_name matriarchive.org;
    root /var/www/ChinaMatri;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. 全栈应用部署

**使用 Docker**:
```dockerfile
# Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# 构建和运行
docker build -t matriarchive .
docker run -p 3000:3000 matriarchive
```

## 📊 性能优化

### 图片优化
```html
<!-- 使用 WebP 格式 -->
<img src="image.webp" alt="...">

<!-- 响应式图片 -->
<img srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
     sizes="(max-width: 600px) 300px, 600px"
     src="medium.jpg" alt="...">

<!-- 懒加载 -->
<img src="image.jpg" loading="lazy" alt="...">
```

### 代码拆分
```javascript
// 将大型数据移到单独文件
// data.js
export const sites = [...];
export const scholars = [...];

// main.js
import { sites, scholars } from './data.js';
```

### 缓存策略
```javascript
// Service Worker
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
```

## 🎓 学习路径

### 阶段 1: 前端基础（当前水平）
- ✅ HTML/CSS/JavaScript
- ✅ Tailwind CSS
- ✅ Leaflet.js

### 阶段 2: 数据管理
- 📚 JSON 文件操作
- 📚 AJAX/Fetch API
- 📚 本地存储

### 阶段 3: 后端开发
- 🎯 Node.js + Express 或 Python + Flask
- 🎯 RESTful API 设计
- 🎯 数据库基础（SQL）

### 阶段 4: 数据库
- 🚀 MySQL/PostgreSQL
- 🚀 MongoDB
- 🚀 数据库设计与优化

### 阶段 5: 高级功能
- ⭐ 用户认证系统
- ⭐ 内容管理系统（CMS）
- ⭐ 搜索引擎优化（SEO）
- ⭐ 数据分析与可视化

## 📚 推荐资源

### 在线教程
- [MDN Web Docs](https://developer.mozilla.org/) - Web 开发权威指南
- [freeCodeCamp](https://www.freecodecamp.org/) - 免费编程课程
- [菜鸟教程](https://www.runoob.com/) - 中文编程教程

### 视频课程
- B站: 黑马程序员、尚硅谷
- Coursera: Web Development 课程
- YouTube: Traversy Media, Fireship

### 书籍推荐
- 《JavaScript 高级程序设计》
- 《MySQL 必知必会》
- 《深入浅出 Node.js》

## 🆘 常见问题

### Q: 如何处理大量数据？
A: 
1. 实现分页加载（每页 20-50 条）
2. 使用虚拟滚动
3. 采用服务器端渲染
4. 使用数据库索引

### Q: 如何保护数据安全？
A:
1. 使用 HTTPS
2. API 添加认证（JWT Token）
3. 数据库访问权限控制
4. 输入验证和 SQL 注入防护

### Q: 如何支持多用户协作？
A:
1. 实现用户认证系统
2. 添加角色权限管理
3. 使用版本控制
4. 实时协作（WebSocket）

---

**下一步行动建议**:

1. **立即可做**: 
   - 将当前 JS 数组数据提取到 JSON 文件
   - 添加更多真实数据和图片

2. **短期目标**（1-2周）:
   - 学习基础后端知识
   - 搭建简单的 API 服务

3. **中期目标**（1-2月）:
   - 实现完整的数据库系统
   - 添加用户管理功能

4. **长期目标**（3-6月）:
   - 开发内容管理后台
   - 实现高级搜索和数据分析

