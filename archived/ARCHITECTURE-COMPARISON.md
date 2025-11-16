# 🔄 架构对比：独立模型 vs 统一模型

## 📊 核心区别

### ❌ 旧架构：独立模型
```
archaeologicalSite (考古遗址模型)
goddess (女神模型)
scholar (学者模型)
publication (论著模型)
community (氏族模型)
```
**问题：**
- 5 个独立的内容类型
- 批量管理困难
- 添加新类型需要创建新模型
- 字段不通用

### ✅ 新架构：统一模型
```
entry (统一内容模型)
  └── category: goddess | site | scholar | work | community
```
**优势：**
- 只有 1 个内容类型
- 批量管理简单（类似 Excel）
- 添加新类型只需添加 category 值
- 所有字段可复用

---

## 🎯 实际对比

### 场景 1: 添加新内容

#### 旧方式
```
1. 决定内容类型
2. 找到对应的模型
3. 填写该模型的特定字段
4. 如果字段不够用，需要修改模型定义
```

#### 新方式
```
1. 创建 Entry
2. 选择 category
3. 填写需要的字段（其他字段可留空）
4. 发布
```

---

### 场景 2: 批量导入 100 条数据

#### 旧方式
```
需要创建不同的 CSV 文件和导入脚本：
- import-sites.js → sites.csv
- import-goddesses.js → goddesses.csv
- import-scholars.js → scholars.csv
...
```

#### 新方式
```
所有数据放在一个 CSV 中：
entries.csv
  女娲,goddess,...
  半坡遗址,site,...
  李济,scholar,...
  
一个命令导入所有：
npm run import data/entries.csv
```

---

### 场景 3: 数据导出到 Excel 编辑

#### 旧方式
```bash
# 需要多次导出
node export-sites.js
node export-goddesses.js
node export-scholars.js

# 得到多个文件
sites-export.csv
goddesses-export.csv
scholars-export.csv
```

#### 新方式
```bash
# 一次导出所有
npm run export

# 或按类型导出
npm run export goddess
npm run export site

# 在 Excel 中编辑后重新导入
npm run import data/entries-edited.csv
```

---

### 场景 4: 前端查询

#### 旧方式
```javascript
// 需要查询不同的 _type
const sites = await fetch('*[_type == "archaeologicalSite"]');
const goddesses = await fetch('*[_type == "goddess"]');
const scholars = await fetch('*[_type == "scholar"]');

// 每个类型的字段名可能不同
sites[0].period vs goddesses[0].category
```

#### 新方式
```javascript
// 统一查询接口
const sites = await SanityAPI.getByCategory('site');
const goddesses = await SanityAPI.getByCategory('goddess');
const scholars = await SanityAPI.getByCategory('scholar');

// 字段名统一
entry.category, entry.subcategory
```

---

## 📝 字段映射

### 旧模型 → 统一模型

| 旧模型 | 旧字段 | 统一模型字段 |
|--------|--------|--------------|
| **archaeologicalSite** | title | title |
| | period | subcategory |
| | periodName | subtitle |
| | location.lat/lng | location.coordinates.lat/lng |
| | | **category = 'site'** |
| **goddess** | title | title |
| | category | subcategory |
| | categoryName | subtitle |
| | | **category = 'goddess'** |
| **scholar** | name | title |
| | field | personInfo.field |
| | institution | personInfo.institution |
| | | **category = 'scholar'** |
| **publication** | title | title |
| | author | workInfo.author |
| | year | year |
| | | **category = 'work'** |
| **community** | name | title |
| | region | location.region |
| | location | location.coordinates |
| | | **category = 'community'** |

---

## 🔄 迁移策略

### 选项 1: 全新开始（推荐）
```
✅ 使用统一模型重新导入所有数据
✅ 更简洁、更灵活
✅ 利用 CSV 批量导入
```

### 选项 2: 并行使用
```
🔶 保留旧模型（已有数据）
🔶 新数据使用统一模型
🔶 前端兼容两种模型
```

### 选项 3: 逐步迁移
```
🔹 保留旧模型
🔹 编写迁移脚本
🔹 分批次迁移数据
🔹 完成后删除旧模型
```

---

## 💡 何时使用哪种架构

### 使用统一模型（推荐）✅
- 内容类型之间有相似性
- 需要频繁添加新类型
- 需要批量管理数据
- 想要类似 Excel 的体验
- **您的情况：母权文化知识库**

### 使用独立模型
- 内容类型完全不同
- 字段差异很大
- 不需要批量操作
- 内容类型固定不变

---

## 🚀 推荐行动

### 立即行动
```bash
# 1. 重启 Studio（应用新模型）
cd studio
npm run dev

# 2. 准备示例数据
# 编辑 data/entries-example.csv

# 3. 批量导入
npm install csv-parser  # 如果还没安装
npm run import data/entries-example.csv

# 4. 查看效果
# 打开 goddess-cms.html
```

---

## 📊 数据示例

### CSV 示例（统一模型）

```csv
title,category,subcategory,subtitle,summary,latitude,longitude,tags,featured
女娲,goddess,creation,创世女神,创世神话和造人,"","","创世,补天,造人",true
盘古,goddess,creation,开天辟地,开天辟地的神话,"","","创世,盘古",false
半坡遗址,site,yangshao,仰韶文化,黄河流域新石器时代,34.28,109.04,"仰韶,母系氏族",true
河姆渡遗址,site,hemudu,河姆渡文化,长江下游稻作文化,29.96,121.36,"河姆渡,稻作",true
李济,scholar,chinese,考古学家,中国考古学之父,"","","考古,殷墟",true
摩尔根,scholar,western,人类学家,《古代社会》作者,"","","母权制,人类学",true
```

**一个文件，所有类型！**

---

## ✨ 总结

| 特性 | 独立模型 | 统一模型 |
|------|----------|----------|
| 数据模型数量 | 5+ | 1 |
| 批量导入 | 困难 | 简单 |
| Excel 编辑 | 复杂 | 容易 |
| 添加新类型 | 创建新模型 | 添加 category 值 |
| 字段灵活性 | 固定 | 灵活可选 |
| 学习曲线 | 陡峭 | 平缓 |
| 适合场景 | 固定内容类型 | 动态内容类型 |

**🎯 对于您的知识库网站：统一模型是更好的选择！**

---

## 📚 相关文档

- `UNIFIED-QUICKSTART.md` - 5 分钟快速开始
- `UNIFIED-MODEL-GUIDE.md` - 详细使用指南
- `studio/schemas/entry.js` - 模型定义
- `src/js/sanity-unified.js` - 前端 API

---

🚀 **准备好了吗？开始使用统一模型吧！**





