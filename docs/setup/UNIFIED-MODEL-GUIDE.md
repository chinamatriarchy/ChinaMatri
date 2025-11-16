# 📘 统一数据模型指南

## 🎯 核心理念

**一个内容类型，多种展示方式**

所有数据都使用同一个 `entry` 模型，通过 `category` 字段区分不同类型。

```
entry (统一模型)
  ├── category: 'site' → map.html (遗址地图)
  ├── category: 'goddess' → goddess.html (女神谱系)
  ├── category: 'scholar' → scholars.html (学者目录)
  ├── category: 'work' → works.html (学术论著)
  └── category: 'community' → communities.html (现存氏族)
```

---

## ✅ 优势

### 1. **数据管理更简单**
- 只需要管理一个内容类型
- 批量导入/导出更容易
- 类似 Excel 的体验

### 2. **更灵活**
- 不同内容可以有不同字段
- 字段都是可选的
- 添加新分类很简单

### 3. **前端自动化**
- 根据 category 自动路由
- 每个页面查询对应分类的数据
- 无需修改后端结构

### 4. **易于扩展**
- 想添加新类型？只需要添加一个 category 值
- 想添加新字段？所有内容都可用

---

## 📝 字段说明

### 🔴 必填字段
| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 标题/名称 | "女娲"、"李济"、"半坡遗址" |
| `category` | 分类标签 | goddess, scholar, site, work, community |

### 🟢 通用可选字段
| 字段 | 说明 | 适用于 |
|------|------|--------|
| `subtitle` | 副标题 | 所有类型 |
| `summary` | 简介 | 所有类型 |
| `description` | 详细描述 | 所有类型 |
| `tags` | 标签 | 所有类型 |
| `subcategory` | 子分类 | 所有类型 |
| `dateRange` | 年代 | site, goddess |
| `year` | 年份 | work, scholar |
| `mainImage` | 主图片 | 所有类型 |
| `gallery` | 图片集 | 所有类型 |
| `featured` | 是否重点展示 | 所有类型 |

### 🔵 专用字段（根据 category 自动显示/隐藏）

#### 人物相关 (`personInfo`)
适用于：`scholar`, `goddess`
- `field` - 研究领域
- `institution` - 所属机构
- `birthYear` - 出生年份
- `deathYear` - 逝世年份
- `nationality` - 国籍

#### 作品相关 (`workInfo`)
适用于：`work`
- `author` - 作者
- `publisher` - 出版社
- `isbn` - ISBN

#### 地理位置 (`location`)
适用于：`site`, `community`
- `coordinates` - GPS 坐标
- `region` - 地区
- `address` - 详细地址

---

## 🚀 使用示例

### 示例 1: 添加一位女神

```json
{
  "title": "女娲",
  "category": "goddess",
  "subcategory": "creation",
  "subtitle": "创世女神",
  "summary": "中国上古神话中的创世女神和造物主",
  "description": "女娲是中华民族的母神...",
  "tags": ["创世", "补天", "造人"],
  "personInfo": {
    "nationality": "中国"
  },
  "mainImage": {...},
  "featured": true
}
```

### 示例 2: 添加一个考古遗址

```json
{
  "title": "半坡遗址",
  "category": "site",
  "subcategory": "yangshao",
  "subtitle": "仰韶文化",
  "dateRange": "约公元前4800-3600年",
  "summary": "黄河流域新石器时代文化遗址",
  "location": {
    "coordinates": {
      "lat": 34.28,
      "lng": 109.04
    },
    "region": "陕西西安"
  },
  "works": [
    "发现大量女性雕像",
    "母系氏族公共墓地"
  ]
}
```

### 示例 3: 添加一位学者

```json
{
  "title": "李济",
  "category": "scholar",
  "subcategory": "chinese",
  "personInfo": {
    "field": "考古学",
    "institution": "中央研究院",
    "birthYear": 1896,
    "deathYear": 1979
  },
  "works": [
    "《西阴村史前遗存》",
    "《殷墟发掘报告》"
  ]
}
```

---

## 🔄 数据导入流程

### 方法 1: CSV 批量导入 ✨ 推荐

1. **准备 CSV 文件**
```csv
title,category,subcategory,summary,latitude,longitude,dateRange
女娲,goddess,creation,创世女神,,,
半坡遗址,site,yangshao,仰韶文化遗址,34.28,109.04,公元前4800-3600年
```

2. **运行导入脚本**
```bash
node src/data/import-unified.js data/entries.csv
```

### 方法 2: Sanity Studio 手动添加

1. 访问 http://localhost:3333
2. 点击 "Create" → "Entry"
3. 选择分类（category）
4. 填写字段（不需要全部填写）
5. 发布

### 方法 3: API 批量操作

```javascript
const {sanityClient} = require('./src/js/sanityClient');

await sanityClient.create({
  _type: 'entry',
  title: '女娲',
  category: 'goddess',
  // ...
});
```

---

## 🎨 前端查询示例

### 在任何页面中加载数据

```html
<script src="src/js/sanity-unified.js"></script>

<script>
  // 获取所有女神
  const goddesses = await SanityAPI.getByCategory('goddess');
  
  // 获取创世女神
  const creationGoddesses = await SanityAPI.getByCategory('goddess', 'creation');
  
  // 获取考古遗址
  const sites = await SanityAPI.getSites();
  
  // 获取学者
  const scholars = await SanityAPI.getScholars();
  
  // 搜索
  const results = await SanityAPI.search('女娲');
</script>
```

---

## 📊 字段组合建议

### 🗺️ 考古遗址 (site)
必填：`title`, `category: 'site'`
建议：`subtitle`, `location`, `dateRange`, `summary`, `works`, `mainImage`

### ⭐ 女神 (goddess)
必填：`title`, `category: 'goddess'`
建议：`subcategory`, `subtitle`, `summary`, `tags`, `mainImage`

### 👤 学者 (scholar)
必填：`title`, `category: 'scholar'`
建议：`personInfo`, `works`, `summary`, `mainImage`

### 📚 论著 (work)
必填：`title`, `category: 'work'`
建议：`workInfo`, `year`, `summary`, `tags`, `mainImage`

### 🏘️ 现存氏族 (community)
必填：`title`, `category: 'community'`
建议：`location`, `subtitle`, `summary`, `gallery`

---

## 🔧 自定义和扩展

### 添加新的分类

1. 编辑 `studio/schemas/entry.js`
2. 在 `category` 字段的 `options.list` 中添加：
```javascript
{title: '🎭 新分类', value: 'newcategory'}
```

### 添加新的子分类

在 `subcategory` 字段的 `options.list` 中添加：
```javascript
{title: '新子分类', value: 'newsubcat'}
```

### 添加新的字段

在 `studio/schemas/entry.js` 的 `fields` 数组中添加：
```javascript
{
  name: 'myNewField',
  title: '我的新字段',
  type: 'string'
}
```

---

## ✨ 最佳实践

1. **保持一致性**：同类内容使用相同的字段
2. **使用标签**：便于分类和搜索
3. **填写简介**：summary 字段用于列表展示
4. **上传图片**：提升视觉效果
5. **关联内容**：使用 relatedItems 建立连接
6. **设置重点**：featured 字段标记重要内容

---

## 🎯 快速开始

### 1. 启动 Sanity Studio
```bash
cd studio
npm run dev
```

### 2. 打开浏览器
访问 http://localhost:3333

### 3. 创建第一条内容
- 点击 "Create"
- 选择 "内容条目 (Entry)"
- 选择分类（category）
- 填写标题和其他字段
- 点击 "Publish"

### 4. 在前端查看
打开 `goddess-cms.html`（或其他 CMS 页面）

---

## 📦 相关文件

| 文件 | 说明 |
|------|------|
| `studio/schemas/entry.js` | 统一数据模型定义 |
| `src/js/sanity-unified.js` | 前端查询 API |
| `goddess-cms.html` | 女神页面示例 |
| `src/data/import-unified.js` | CSV 导入脚本 |
| `src/data/export-to-csv.js` | CSV 导出脚本 |

---

## 💡 常见问题

**Q: 我可以不填写某些字段吗？**
A: 可以！除了 `title` 和 `category`，其他都是可选的。

**Q: 如何批量修改数据？**
A: 导出为 CSV → 在 Excel 中编辑 → 重新导入

**Q: 可以添加新的字段吗？**
A: 可以！编辑 `studio/schemas/entry.js` 即可

**Q: 前端如何知道显示哪些字段？**
A: 每个页面的查询函数会指定需要的字段

---

✨ **开始使用统一数据模型，享受更简单的数据管理体验！**





