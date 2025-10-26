# 📁 MatriArchive CMS - 项目结构

## 🎉 重构完成！

您的项目现在已经设置好 Sanity CMS 集成！

```
ChinaMatri/
│
├── 📄 HTML 页面
│   ├── index.html              # 主页（待重构）
│   ├── timeline.html           # 时间线（待重构）
│   ├── map.html               # 地图（静态版本）
│   ├── map-cms.html           # 地图（CMS版本）✨ NEW
│   ├── goddess.html           # 女神谱系（待重构）
│   ├── scholars.html          # 学者名录（待重构）
│   ├── works.html            # 相关论著（待重构）
│   └── communities.html      # 现存氏族（待重构）
│
├── 🎨 Studio (Sanity CMS 管理后台)
│   ├── sanity.config.js       # Sanity 配置文件
│   └── schemas/              # 内容模型定义
│       ├── index.js                    # Schema 导出
│       ├── archaeologicalSite.js      # 考古遗址模型
│       ├── goddess.js                 # 女神模型
│       ├── scholar.js                 # 学者模型
│       ├── publication.js             # 论著模型
│       └── community.js               # 现存氏族模型
│
├── 💻 源代码
│   ├── js/
│   │   ├── sanityClient.js       # Node.js Sanity 客户端
│   │   └── sanity-browser.js     # 浏览器 Sanity 客户端
│   └── data/
│       └── migrate-to-sanity.js  # 数据迁移脚本
│
├── 📚 文档
│   ├── README.md              # 项目说明
│   ├── GUIDE.md               # 完整技术指南
│   ├── GIT-GUIDE.md          # Git 版本管理指南
│   ├── CMS-SETUP.md          # CMS 详细设置指南
│   └── QUICKSTART.md         # 15分钟快速开始 ⭐
│
├── 🔧 配置文件
│   ├── package.json           # NPM 依赖配置
│   ├── .gitignore            # Git 忽略文件
│   └── node_modules/         # 依赖包（已安装）
│
└── 📝 Git 版本控制
    └── .git/                 # Git 仓库
        └── v1.0 标签          # 原始静态版本
```

## 🚀 快速命令

### 开发模式
```bash
# Terminal 1: 启动 Sanity Studio
cd studio
npx sanity dev
# 访问: http://localhost:3333

# Terminal 2: 启动网站
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
python3 -m http.server 8000
# 访问: http://localhost:8000
```

### 数据管理
```bash
# 运行数据迁移
node src/data/migrate-to-sanity.js

# 导出数据备份
cd studio
npx sanity dataset export production backup.tar.gz

# 导入数据
npx sanity dataset import backup.tar.gz production
```

### 部署
```bash
# 部署 Studio
cd studio
npx sanity deploy

# 网站部署（取决于托管平台）
# Netlify/Vercel: 连接 Git 自动部署
# 或手动上传构建文件
```

## 📊 内容模型概览

### 1. 考古遗址 (archaeologicalSite)
- 用于：map.html, map-cms.html
- 字段：name, period, location (geopoint), date, description, image
- 状态：Schema 已创建 ✅

### 2. 女神 (goddess)
- 用于：goddess.html
- 字段：name, category, title, summary, description, image
- 状态：Schema 已创建 ✅

### 3. 学者 (scholar)
- 用于：scholars.html
- 字段：name, region, field, institution, works, photo
- 状态：Schema 已创建 ✅

### 4. 论著 (publication)
- 用于：works.html
- 字段：title, author, year, category, description, tags
- 状态：Schema 已创建 ✅

### 5. 现存氏族 (community)
- 用于：communities.html
- 字段：name, region, location, population, description, images
- 状态：Schema 已创建 ✅

## 🎯 重构进度

### ✅ 已完成
- [x] Sanity 项目结构
- [x] 5个内容模型（Schemas）
- [x] 浏览器客户端
- [x] 示例页面（map-cms.html）
- [x] 数据迁移脚本
- [x] 完整文档

### 🔄 进行中
- [ ] 创建 Sanity 项目（需要手动操作）
- [ ] 配置 Project ID
- [ ] 添加测试数据

### 📋 待完成
- [ ] 重构 goddess.html → goddess-cms.html
- [ ] 重构 scholars.html → scholars-cms.html
- [ ] 重构 works.html → works-cms.html
- [ ] 重构 communities.html → communities-cms.html
- [ ] 重构 index.html
- [ ] 重构 timeline.html（可选）

## 🔗 重要链接

### 开发环境
- Studio: http://localhost:3333
- 网站: http://localhost:8000
- CMS地图示例: http://localhost:8000/map-cms.html

### Sanity 服务
- 管理后台: https://www.sanity.io/manage
- 文档: https://www.sanity.io/docs
- Vision 查询工具: http://localhost:3333/vision

## 💡 设计决策

### 为什么选择 Sanity.io？
1. ✅ **无头 CMS**: 前后端完全分离
2. ✅ **实时预览**: 内容更新即时可见
3. ✅ **强大的查询**: GROQ 查询语言
4. ✅ **图片优化**: 自动 CDN 和图片处理
5. ✅ **版本控制**: 内容历史和恢复
6. ✅ **免费套餐**: 适合小型项目

### 架构优势
```
之前：静态网站
HTML ← JavaScript 数组 (硬编码)

现在：CMS驱动
HTML ← Sanity Client ← Sanity API ← Sanity Studio
       ↑
    可以从任何地方更新内容！
```

## 🔒 安全考虑

### API 访问
- ✅ **Read**: 公开，任何人可以读取发布的内容
- 🔐 **Write**: 需要 Token，仅授权用户可以修改

### CORS 配置
- 仅允许特定域名访问
- 开发环境：localhost:8000, localhost:3000
- 生产环境：你的实际域名

### 环境变量
```bash
# 敏感信息不要提交到 Git
# 使用 .env 文件（已在 .gitignore 中）
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_TOKEN=your-write-token  # 仅服务器端使用
```

## 📈 性能优化

### 已实现
- ✅ 使用 Sanity CDN
- ✅ 图片自动优化
- ✅ 按需加载数据

### 未来可做
- [ ] 图片懒加载
- [ ] 虚拟滚动（大数据列表）
- [ ] Service Worker 缓存
- [ ] 预加载关键数据

## 🐛 调试技巧

### 浏览器控制台
```javascript
// 检查配置
console.log(window.SanityAPI.config)

// 测试查询
window.SanityAPI.getSites().then(console.log)

// 检查图片 URL
window.SanityAPI.getImageUrl(imageObject, 800)
```

### Vision 工具
在 Studio 中测试 GROQ 查询：
1. 访问 http://localhost:3333/vision
2. 输入查询：`*[_type == "archaeologicalSite"]`
3. 查看结果

## 📞 获取帮助

### 问题检查清单
1. ✅ Project ID 是否正确？
2. ✅ CORS 是否已配置？
3. ✅ 数据是否已发布？
4. ✅ 网络请求是否成功？（查看 Network 标签）

### 有用资源
- 📖 QUICKSTART.md - 15分钟快速开始
- 📖 CMS-SETUP.md - 详细设置指南
- 📖 GUIDE.md - 完整技术指南
- 🌐 Sanity 文档: https://www.sanity.io/docs

## 🎓 学习路径

### 第1天：基础设置
- [x] 阅读 QUICKSTART.md
- [ ] 创建 Sanity 项目
- [ ] 添加测试数据
- [ ] 查看 map-cms.html

### 第1周：数据迁移
- [ ] 运行迁移脚本
- [ ] 上传图片
- [ ] 完善数据
- [ ] 重构2-3个页面

### 第1月：完整重构
- [ ] 所有页面重构完成
- [ ] 添加搜索功能
- [ ] 性能优化
- [ ] 部署上线

## 🎉 恭喜！

您现在拥有：
- ✅ 现代化的 CMS 架构
- ✅ 可扩展的内容管理系统
- ✅ 灵活的数据模型
- ✅ 完整的文档支持

**开始您的 CMS 之旅吧！** 🚀

下一步：阅读 `QUICKSTART.md` 并在15分钟内运行起来！

