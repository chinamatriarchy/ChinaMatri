# MatriArchive CMS 重构指南

## 🎉 项目结构

您的项目现在已经设置好 Sanity CMS 集成！

```
ChinaMatri/
├── studio/                    # Sanity Studio (CMS 管理后台)
│   ├── sanity.config.js      # Sanity 配置
│   └── schemas/              # 内容模型定义
│       ├── archaeologicalSite.js  # 考古遗址
│       ├── goddess.js            # 女神
│       ├── scholar.js            # 学者
│       ├── publication.js        # 论著
│       ├── community.js          # 现存氏族
│       └── index.js              # Schema 索引
├── src/
│   └── js/
│       ├── sanityClient.js      # Node.js 客户端
│       └── sanity-browser.js    # 浏览器客户端
├── index.html                # 主页（将重构）
├── map.html                  # 地图页（将重构）
├── goddess.html              # 女神页（将重构）
├── scholars.html             # 学者页（将重构）
├── works.html               # 论著页（将重构）
└── communities.html         # 氏族页（将重构）
```

## 🚀 快速开始

### 步骤 1: 创建 Sanity 项目

1. **登录 Sanity.io**
   ```bash
   npx sanity login
   ```

2. **初始化项目**（在 studio 目录中）
   ```bash
   cd studio
   npx sanity init
   ```
   
   选择：
   - Create new project
   - Project name: MatriArchive CMS
   - Dataset: production
   - Output path: 当前目录

3. **获取 Project ID**
   - 完成后会显示 Project ID
   - 复制这个 ID

### 步骤 2: 配置 Project ID

需要在以下文件中替换 `your-project-id`：

1. `studio/sanity.config.js`
2. `src/js/sanityClient.js`
3. `src/js/sanity-browser.js`

```javascript
// 示例：替换为你的实际 Project ID
projectId: 'abc123xyz'  // 替换 'your-project-id'
```

### 步骤 3: 启动 Sanity Studio

```bash
cd studio
npx sanity dev
```

Studio 将在 http://localhost:3333 启动

### 步骤 4: 添加测试数据

在 Studio 中手动添加一些测试数据：
1. 打开 http://localhost:3333
2. 点击 "考古遗址" 添加一个遗址
3. 填写所有字段
4. 点击 "Publish"

## 📊 内容模型说明

### 1. 考古遗址 (archaeologicalSite)

字段：
- `name`: 遗址名称 *
- `period`: 文化时期（yangshao/hemudu/hongshan/dawenkou）*
- `periodName`: 文化时期中文名
- `location`: 地理坐标 (geopoint) *
- `date`: 年代
- `description`: 描述
- `findings`: 主要发现
- `image`: 图片
- `region`: 所在区域
- `sourceLink`: 参考资料链接

### 2. 女神 (goddess)

字段：
- `name`: 女神名称 *
- `category`: 类别（creation/nature/culture/guardian）*
- `title`: 称号
- `summary`: 简介
- `description`: 详细描述（富文本）
- `mythology`: 神话故事（富文本）
- `historicalSignificance`: 历史意义（富文本）
- `image`: 图片
- `relatedCultures`: 相关文化（数组）
- `sourceLink`: 参考资料

### 3. 学者 (scholar)

字段：
- `name`: 姓名 *
- `region`: 地区（chinese/western）
- `field`: 研究领域 *
- `institution`: 所属机构
- `description`: 简介
- `works`: 代表作品（数组）
- `photo`: 照片
- `birthYear`: 出生年份
- `deathYear`: 逝世年份
- `website`: 个人网站

### 4. 论著 (publication)

字段：
- `title`: 书名 *
- `author`: 作者 *
- `year`: 出版年份
- `category`: 分类（classic/chinese/anthropology/archaeology）
- `description`: 简介
- `tags`: 标签（数组）
- `coverImage`: 封面图片
- `isbn`: ISBN
- `publisher`: 出版社
- `purchaseLink`: 购买链接

### 5. 现存氏族 (community)

字段：
- `name`: 民族名称 *
- `region`: 地理位置 *
- `location`: 精确坐标 (geopoint)
- `population`: 人口
- `summary`: 概述
- `description`: 详细介绍（富文本）
- `familyStructure`: 家庭结构（富文本）
- `marriageSystem`: 婚姻制度（富文本）
- `inheritance`: 财产继承（富文本）
- `modernChanges`: 当代变迁（富文本）
- `images`: 图片集（数组）
- `featured`: 重点展示（布尔值）

## 🔄 数据迁移

### 从静态数据迁移到 Sanity

现有的 JavaScript 数组数据需要导入到 Sanity。有两种方法：

**方法 1: 手动输入（小量数据）**
- 在 Sanity Studio 中逐个创建文档
- 适合重要的核心数据

**方法 2: 批量导入（推荐）**

创建导入脚本 `migrate-data.js`：

```javascript
import {sanityClient} from './src/js/sanityClient.js'

// 从 map.html 提取的数据
const sites = [
  {
    _type: 'archaeologicalSite',
    name: '半坡遗址',
    period: 'yangshao',
    periodName: '仰韶文化',
    location: {
      _type: 'geopoint',
      lat: 34.27,
      lng: 109.00
    },
    date: '约公元前4800-3600年',
    description: '位于陕西西安，是仰韶文化的典型遗址...',
    findings: '彩陶、石器、房屋遗址',
    region: '陕西西安'
  },
  // ... 更多数据
]

// 批量导入
async function migrateSites() {
  for (const site of sites) {
    try {
      const result = await sanityClient.create(site)
      console.log(`✅ Created: ${site.name}`)
    } catch (error) {
      console.error(`❌ Error creating ${site.name}:`, error)
    }
  }
}

migrateSites()
```

运行：
```bash
node migrate-data.js
```

## 🔗 前端集成

### 在 HTML 中使用 Sanity 数据

#### 方法 1: 在浏览器中直接使用

在 HTML 中引入客户端：

```html
<script src="src/js/sanity-browser.js"></script>

<script>
  // 获取并渲染数据
  async function loadSites() {
    const sites = await window.SanityAPI.getSites();
    renderSites(sites);
  }
  
  function renderSites(sites) {
    const container = document.getElementById('sites-container');
    container.innerHTML = sites.map(site => `
      <div class="site-card">
        <h3>${site.name}</h3>
        <p>${site.description}</p>
        ${site.image ? `<img src="${window.SanityAPI.getImageUrl(site.image)}">` : ''}
      </div>
    `).join('');
  }
  
  // 页面加载时调用
  document.addEventListener('DOMContentLoaded', loadSites);
</script>
```

#### 方法 2: 使用构建工具（推荐用于生产）

如果使用打包工具（Vite/Webpack）：

```javascript
import {api, urlFor} from './src/js/sanityClient.js'

async function loadData() {
  const sites = await api.getSites()
  // 使用数据渲染
}
```

## 🎨 保持现有设计

重构时保持所有 Tailwind CSS 类和结构，只替换数据来源：

**之前（静态）：**
```javascript
const sites = [
  {name: '半坡遗址', ...}
]

function renderSites(sites) {
  // ... 渲染代码
}

renderSites(sites)  // 使用静态数据
```

**之后（动态）：**
```javascript
async function loadAndRenderSites() {
  const sites = await window.SanityAPI.getSites()
  renderSites(sites)  // 使用 CMS 数据
}

loadAndRenderSites()
```

## 🖼️ 图片处理

### 上传图片到 Sanity

1. 在 Studio 中上传图片
2. Sanity 自动处理图片优化

### 在前端显示图片

```javascript
// 使用浏览器客户端
const imageUrl = window.SanityAPI.getImageUrl(site.image, 800)

// 使用 Node 客户端
import {urlFor} from './src/js/sanityClient.js'
const imageUrl = urlFor(site.image).width(800).url()
```

### 响应式图片

```javascript
// 生成不同尺寸
const thumbnailUrl = window.SanityAPI.getImageUrl(image, 400)
const mediumUrl = window.SanityAPI.getImageUrl(image, 800)
const largeUrl = window.SanityAPI.getImageUrl(image, 1200)
```

## 🔒 配置 CORS（重要！）

在 Sanity 项目设置中配置 CORS：

1. 访问 https://www.sanity.io/manage
2. 选择你的项目
3. Settings > API > CORS Origins
4. 添加：
   - `http://localhost:8000` (本地开发)
   - `http://localhost:3000` (备用)
   - `https://yourdomain.com` (生产域名)

## 📝 开发工作流

### 日常开发

```bash
# Terminal 1: 运行 Sanity Studio
cd studio
npx sanity dev

# Terminal 2: 运行网站
cd ..
python3 -m http.server 8000
```

访问：
- Studio: http://localhost:3333
- 网站: http://localhost:8000

### 内容更新流程

1. 在 Studio 中编辑内容
2. 点击 "Publish"
3. 刷新网站即可看到更新（因为使用 CDN）

## 🚀 部署

### Studio 部署

```bash
cd studio
npx sanity deploy
```

这会将 Studio 部署到 Sanity 托管的子域：
`https://your-project.sanity.studio`

### 网站部署

网站可以部署到任何静态托管服务：
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

记得在生产环境的 CORS 设置中添加你的域名！

## 🔧 故障排除

### 问题 1: CORS 错误

```
Access to fetch at 'https://xxx.api.sanity.io' has been blocked by CORS policy
```

**解决方案：**
在 Sanity 项目设置中添加你的域名到 CORS Origins

### 问题 2: 数据不显示

**检查清单：**
1. ✅ Project ID 是否正确？
2. ✅ Studio 中是否有数据？
3. ✅ 数据是否已 Publish？
4. ✅ 浏览器控制台是否有错误？

### 问题 3: 图片显示 403

**原因：** 图片资源需要正确的 URL 格式

**解决方案：** 使用 `getImageUrl()` 函数生成正确的 URL

## 📚 有用的资源

- [Sanity 文档](https://www.sanity.io/docs)
- [GROQ 查询语法](https://www.sanity.io/docs/groq)
- [Sanity 图片 API](https://www.sanity.io/docs/image-url)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)

## 🎯 下一步

完成基础设置后：

1. ✅ 启动 Studio 并添加测试数据
2. ✅ 配置 CORS
3. ✅ 重构一个页面测试（建议从 map.html 开始）
4. ✅ 迁移所有静态数据到 Sanity
5. ✅ 重构所有页面
6. ✅ 测试和优化
7. ✅ 部署！

---

需要帮助？查看控制台日志或联系我！

