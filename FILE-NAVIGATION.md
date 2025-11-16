# 📂 项目文件导航 - MatriChina

**整理时间**: 2025-11-09
**项目地址**: https://matrichina.netlify.app

---

## 🗂️ 文件夹结构

```
ChinaMatri/
├── 📄 index.html              # 网站首页（保留在根目录）
├── 📄 map.html                # 静态地图页面（保留在根目录）
├── 📄 README.md               # 项目说明
├── 📄 OPTIMIZATION-COMPLETE.md  # 最近的优化报告
├── 📄 netlify.toml            # Netlify 部署配置
├── 📄 package.json            # Node.js 项目配置
│
├── 📁 pages/                  # 网站页面
│   ├── communities.html       # 现存氏族页面
│   ├── goddess.html           # 女神谱系页面（静态）
│   ├── goddess-cms.html       # 女神谱系页面（CMS）
│   ├── map-cms.html          # 地图页面（CMS）
│   ├── scholars.html          # 学者名录页面
│   ├── timeline.html          # 时间线页面
│   ├── works.html            # 论著页面
│   └── START-HERE.html       # 开始页面（引导）
│
├── 📁 docs/                   # 文档目录
│   ├── 📁 guides/            # 使用指南
│   │   ├── HOW-TO-USE.md     # 📌 主要使用指南
│   │   ├── QUICK-START-GUIDE.md
│   │   ├── QUICKSTART.md
│   │   ├── GUIDE.md
│   │   └── GIT-GUIDE.md      # Git 使用指南
│   │
│   ├── 📁 deployment/        # 部署文档
│   │   ├── DEPLOY-NOW.md
│   │   ├── DEPLOY-STUDIO-GUIDE.md
│   │   ├── DEPLOY-STUDIO-NOW.md
│   │   ├── DEPLOY-WEBSITE.md
│   │   ├── DEPLOY-WITH-TOKEN.md
│   │   ├── DEPLOYMENT.md
│   │   ├── DEPLOYMENT-CHECK.md
│   │   ├── QUICK-DEPLOY.md
│   │   ├── MANUAL-DEPLOY.md
│   │   └── AUTO-DEPLOY-STUDIO.md
│   │
│   ├── 📁 setup/            # 设置和配置文档
│   │   ├── CMS-INTEGRATION-COMPLETE.md
│   │   ├── CMS-SETUP.md
│   │   ├── SCHEMA-GOOGLE-SHEETS-MAPPING.md  # 📌 Schema 字段映射
│   │   ├── SCHEMA-MODIFICATION-GUIDE.md
│   │   ├── CONDITIONAL-FIELDS-GUIDE.md
│   │   ├── UNIFIED-MODEL-GUIDE.md
│   │   ├── UNIFIED-QUICKSTART.md
│   │   ├── SHARE-CMS-GUIDE.md
│   │   ├── TEAM-COLLABORATION.md
│   │   ├── MANAGE-ONLINE-SITE.md
│   │   └── PERSONAL-SETUP.md
│   │
│   └── 📁 troubleshooting/  # 故障排除
│       ├── FIX-LOGIN.md
│       ├── FIX-LOGIN-ERROR.md
│       ├── BUG-FIX-REPORT.md
│       ├── TEST-FIXES.md
│       ├── MAP-FIX-GUIDE.md
│       └── SWITCH-ACCOUNT-GUIDE.md
│
├── 📁 scripts/               # 脚本工具
│   ├── start-all.sh          # 启动所有服务
│   ├── stop-all.sh           # 停止所有服务
│   ├── start.sh              # 启动前端服务
│   ├── deploy-studio.sh      # 部署 Studio
│   ├── deploy-studio-auto.sh # 自动部署 Studio
│   ├── create-new-project.sh # 创建新项目
│   ├── fix-sanity-login.sh   # 修复登录问题
│   ├── invite-member.sh      # 邀请团队成员
│   └── FIX-MAP-TILES.js     # 修复地图瓦片
│
├── 📁 archived/             # 已归档的旧文档
│   ├── ALTERNATIVE-DEPLOY.md
│   ├── ARCHITECTURE-COMPARISON.md
│   ├── REFACTORING-PLAN.md
│   ├── SYSTEM-STATUS.md
│   ├── STUDIO-READY.md
│   ├── TIMELINE-FEATURE-GUIDE.md
│   └── PROJECT-STRUCTURE.md
│
├── 📁 src/                  # 源代码
│   ├── js/                  # JavaScript
│   │   ├── config.js        # 📌 Sanity 配置中心
│   │   ├── mapConfig.js     # 📌 地图配置中心
│   │   ├── sanityClient.js
│   │   ├── sanity-browser.js
│   │   └── sanity-unified.js
│   │
│   └── data/                # 数据导入导出脚本
│       ├── export-to-csv.js
│       ├── export-unified.js
│       ├── import-from-csv.js
│       ├── import-unified.js
│       └── migrate-to-sanity.js
│
├── 📁 data/                 # 示例数据
│   ├── entries-example.csv
│   └── sites-example.csv
│
└── 📁 studio/               # Sanity Studio（CMS）
    ├── sanity.config.js     # Studio 配置
    ├── sanity.cli.js        # CLI 配置
    ├── package.json
    ├── netlify.toml         # Studio 部署配置
    │
    └── schemas/             # 数据模型
        ├── index.js
        ├── archaeologicalSite.js        # 母系考古/时间线
        ├── goddess.js                   # 女神谱系
        ├── community.js                 # 现存氏族
        ├── ancientMatriarchalSociety.js # 古代母权社会
        ├── publication.js               # 相关论著
        ├── scholar.js                   # 学者名录
        └── entry.js                     # 统一模型（备用）
```

---

## 🎯 快速访问

### 📌 新手必看

1. **开始使用**: `docs/guides/HOW-TO-USE.md`
2. **Schema 字段说明**: `docs/setup/SCHEMA-GOOGLE-SHEETS-MAPPING.md`
3. **最新优化报告**: `OPTIMIZATION-COMPLETE.md`

### 🌐 访问网站

- **线上网站**: https://matrichina.netlify.app
- **本地网站**: http://localhost:8000
- **本地 Studio**: http://localhost:3333

### 🚀 常用命令

```bash
# 启动所有服务（网站 + Studio）
./scripts/start-all.sh

# 停止所有服务
./scripts/stop-all.sh

# 只启动网站
./scripts/start.sh

# 部署 Studio
./scripts/deploy-studio-auto.sh
```

---

## 📖 文档分类说明

### 1. 📁 pages/ - 网站页面

**用途**: 所有 HTML 页面文件
**访问**: 
- 本地: http://localhost:8000/pages/xxx.html
- 线上: https://matrichina.netlify.app/pages/xxx.html

**主要页面**:
- `map-cms.html` - 地图（从 CMS 读取数据）
- `goddess-cms.html` - 女神谱系（CMS）
- `communities.html` - 现存氏族
- `scholars.html` - 学者名录
- `timeline.html` - 时间线
- `works.html` - 论著

**注意**: `index.html` 和 `map.html` 保留在根目录作为主页和静态地图。

---

### 2. 📁 docs/ - 文档目录

#### 📁 guides/ - 使用指南

**用途**: 项目使用说明、快速开始指南

**推荐阅读顺序**:
1. `HOW-TO-USE.md` - 完整使用指南 ⭐
2. `QUICK-START-GUIDE.md` - 快速开始
3. `GIT-GUIDE.md` - Git 版本控制

---

#### 📁 deployment/ - 部署文档

**用途**: 如何部署网站和 Studio 到线上

**推荐阅读**:
- `DEPLOYMENT-CHECK.md` - 部署状态检查
- `AUTO-DEPLOY-STUDIO.md` - 自动部署 Studio
- `QUICK-DEPLOY.md` - 快速部署指南

---

#### 📁 setup/ - 设置和配置

**用途**: CMS 设置、Schema 配置、团队协作

**重要文档**:
- `SCHEMA-GOOGLE-SHEETS-MAPPING.md` - Schema 字段映射 ⭐
- `CMS-SETUP.md` - CMS 设置指南
- `TEAM-COLLABORATION.md` - 团队协作指南

---

#### 📁 troubleshooting/ - 故障排除

**用途**: 遇到问题时的解决方案

**常见问题**:
- `FIX-LOGIN.md` - 登录问题
- `MAP-FIX-GUIDE.md` - 地图显示问题
- `BUG-FIX-REPORT.md` - Bug 修复记录

---

### 3. 📁 scripts/ - 脚本工具

**用途**: 自动化脚本，启动、部署、修复等

**使用方法**:
```bash
# 给予执行权限（首次使用）
chmod +x scripts/*.sh

# 运行脚本
./scripts/start-all.sh
```

**常用脚本**:
- `start-all.sh` - 启动网站 + Studio ⭐
- `stop-all.sh` - 停止所有服务
- `deploy-studio-auto.sh` - 自动部署 Studio

---

### 4. 📁 archived/ - 已归档文档

**用途**: 已过时或不再使用的文档

**说明**: 这些文档可能包含有用的历史信息，但不再推荐使用。

---

### 5. 📁 src/ - 源代码

#### 📁 src/js/ - JavaScript 代码

**重要文件**:
- `config.js` - Sanity 配置中心 ⭐
- `mapConfig.js` - 地图配置中心 ⭐
- `sanityClient.js` - Sanity 客户端
- `sanity-browser.js` - 浏览器端使用

**修改配置**: 参考 `OPTIMIZATION-COMPLETE.md`

---

#### 📁 src/data/ - 数据脚本

**用途**: 导入导出数据、数据迁移

**脚本说明**:
- `import-from-csv.js` - 从 CSV 导入
- `export-to-csv.js` - 导出到 CSV
- `migrate-to-sanity.js` - 迁移到 Sanity

---

### 6. 📁 studio/ - Sanity Studio

**用途**: 内容管理系统（CMS）

**重要文件**:
- `sanity.config.js` - Studio 配置
- `schemas/` - 数据模型定义
- `netlify.toml` - Studio 部署配置

**访问**: http://localhost:3333

---

## 🔍 查找文件

### 按用途查找

**我想...**

- **开始使用项目** → `docs/guides/HOW-TO-USE.md`
- **修改 Schema 字段** → `docs/setup/SCHEMA-GOOGLE-SHEETS-MAPPING.md`
- **部署网站** → `docs/deployment/QUICK-DEPLOY.md`
- **修复登录问题** → `docs/troubleshooting/FIX-LOGIN.md`
- **修改地图颜色** → `src/js/mapConfig.js`
- **修改 Sanity 配置** → `src/js/config.js`
- **启动服务** → `./scripts/start-all.sh`
- **添加数据模型** → `studio/schemas/`

---

## 📝 文件命名规范

### HTML 文件
- 网站页面: `pages/xxx.html`
- 主页: `index.html` (根目录)

### Markdown 文档
- 使用指南: `docs/guides/`
- 部署文档: `docs/deployment/`
- 设置配置: `docs/setup/`
- 故障排除: `docs/troubleshooting/`

### 脚本文件
- Shell 脚本: `scripts/xxx.sh`
- JavaScript 脚本: `scripts/xxx.js` 或 `src/data/xxx.js`

### 配置文件
- Netlify: `netlify.toml`
- Sanity: `src/js/config.js`
- 地图: `src/js/mapConfig.js`

---

## 🎨 保持整洁

### 添加新文件时

1. **确定文件类型**:
   - 网站页面 → `pages/`
   - 文档 → `docs/` 的相应子文件夹
   - 脚本 → `scripts/`
   - 源代码 → `src/`

2. **使用描述性名称**:
   - ✅ `goddess-detail-page.html`
   - ❌ `page1.html`

3. **添加到此导航文档**

---

## 🔄 更新历史

- **2025-11-09**: 初始整理，创建文件夹结构
  - 创建 `pages/`, `docs/`, `scripts/`, `archived/` 文件夹
  - 按类型移动所有文件
  - 创建导航文档

---

## 📞 需要帮助?

- **找不到文件?** 查看本文档的"查找文件"部分
- **不确定文档在哪?** 所有文档都在 `docs/` 文件夹
- **想要回退?** 所有文件都在，只是移动了位置

---

*最后更新：2025-11-09*
*维护人：项目团队*

