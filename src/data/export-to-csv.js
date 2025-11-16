# 📊 Excel 式数据管理指南

## 问题
Sanity Studio 是一条一条编辑内容，不适合批量数据管理。

## 解决方案

### 🎯 方案 1：Excel → CSV → Sanity（最推荐）

#### 工作流程：
```
1. Excel 编辑数据 → 
2. 另存为 CSV → 
3. 运行导入脚本 → 
4. 数据进入 Sanity
```

#### 步骤：

**1. 在 Excel 中准备数据**

| name | period | periodName | lat | lng | date | description | findings | region |
|------|--------|------------|-----|-----|------|-------------|----------|--------|
| 半坡遗址 | yangshao | 仰韶文化 | 34.27 | 109.00 | 约公元前4800-3600年 | 描述... | 彩陶、石器 | 陕西西安 |

**2. 另存为 CSV**
- File → Save As → CSV (Comma delimited)
- 保存到 `data/sites.csv`

**3. 获取 Sanity 写入权限**
```bash
# 访问 https://www.sanity.io/manage
# 选择项目 → Settings → API → Tokens
# 创建 Editor 权限的 token
```

**4. 运行导入**
```bash
# 安装依赖
npm install csv-parser

# 设置 token
export SANITY_WRITE_TOKEN="your-token-here"

# 导入数据
node src/data/import-from-csv.js data/sites.csv archaeologicalSite
```

---

### 🎯 方案 2：Sanity → CSV → Excel（导出编辑）

如果您想编辑现有数据：

<function_calls>
<invoke name="write">
<parameter name="contents">// 导出 Sanity 数据到 CSV
// 使用: node src/data/export-to-csv.js

import {createClient} from '@sanity/client'
import {createObjectCsvWriter} from 'csv-writer'

const client = createClient({
  projectId: '8i1xhvuq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
})

async function exportToCSV(contentType, outputPath) {
  console.log(`📥 正在导出 ${contentType}...`)
  
  // 查询所有数据
  const query = `*[_type == "${contentType}"]`
  const docs = await client.fetch(query)
  
  console.log(`✅ 找到 ${docs.length} 条数据`)
  
  // 转换数据格式
  const records = docs.map(doc => {
    if (contentType === 'archaeologicalSite') {
      return {
        _id: doc._id,
        name: doc.name || '',
        period: doc.period || '',
        periodName: doc.periodName || '',
        lat: doc.location?.lat || '',
        lng: doc.location?.lng || '',
        date: doc.date || '',
        description: doc.description || '',
        findings: doc.findings || '',
        region: doc.region || ''
      }
    }
    return doc
  })
  
  // 写入 CSV
  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: Object.keys(records[0]).map(key => ({id: key, title: key}))
  })
  
  await csvWriter.writeRecords(records)
  console.log(`✅ 导出完成: ${outputPath}`)
  console.log(`\n📝 下一步:`)
  console.log(`1. 用 Excel 打开: ${outputPath}`)
  console.log(`2. 编辑数据`)
  console.log(`3. 保存为 CSV`)
  console.log(`4. 运行: node src/data/update-from-csv.js ${outputPath}`)
}

const contentType = process.argv[2] || 'archaeologicalSite'
const outputPath = process.argv[3] || `./data/${contentType}-export.csv`

exportToCSV(contentType, outputPath)

/* 
使用：
npm install csv-writer
node src/data/export-to-csv.js archaeologicalSite data/sites.csv
*/





