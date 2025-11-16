// 从 CSV 批量导入数据到 Sanity
// 使用方法: node src/data/import-from-csv.js

import {createClient} from '@sanity/client'
import fs from 'fs'
import csv from 'csv-parser'

const client = createClient({
  projectId: '8i1xhvuq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || 'your-write-token' // 需要设置
})

// CSV 格式示例：
// name,period,periodName,lat,lng,date,description,findings,region
// 半坡遗址,yangshao,仰韶文化,34.27,109.00,约公元前4800-3600年,位于陕西西安...,彩陶、石器,陕西西安

async function importFromCSV(csvPath, contentType) {
  const results = []
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        console.log(`📝 读取到 ${results.length} 条数据`)
        
        for (let i = 0; i < results.length; i++) {
          const row = results[i]
          
          try {
            // 转换 CSV 数据为 Sanity 格式
            const doc = convertToSanityFormat(row, contentType)
            
            // 创建文档
            const result = await client.create(doc)
            console.log(`✅ [${i+1}/${results.length}] 导入成功: ${row.name}`)
          } catch (error) {
            console.error(`❌ [${i+1}/${results.length}] 导入失败: ${row.name}`, error.message)
          }
        }
        
        console.log('\n🎉 导入完成！')
        resolve()
      })
      .on('error', reject)
  })
}

function convertToSanityFormat(row, type) {
  if (type === 'archaeologicalSite') {
    return {
      _type: 'archaeologicalSite',
      name: row.name,
      period: row.period,
      periodName: row.periodName,
      location: {
        _type: 'geopoint',
        lat: parseFloat(row.lat),
        lng: parseFloat(row.lng)
      },
      date: row.date,
      description: row.description,
      findings: row.findings,
      region: row.region
    }
  }
  
  // 其他类型...
  return row
}

// 批量更新示例
async function batchUpdate(query, updates) {
  const docs = await client.fetch(query)
  console.log(`📝 找到 ${docs.length} 条数据需要更新`)
  
  for (const doc of docs) {
    try {
      await client.patch(doc._id).set(updates).commit()
      console.log(`✅ 更新成功: ${doc.name || doc._id}`)
    } catch (error) {
      console.error(`❌ 更新失败: ${doc._id}`, error.message)
    }
  }
}

// 批量删除示例
async function batchDelete(query) {
  const docs = await client.fetch(query)
  console.log(`⚠️  将删除 ${docs.length} 条数据`)
  
  for (const doc of docs) {
    try {
      await client.delete(doc._id)
      console.log(`✅ 删除成功: ${doc._id}`)
    } catch (error) {
      console.error(`❌ 删除失败: ${doc._id}`, error.message)
    }
  }
}

// 使用示例
const csvPath = process.argv[2] || './data/sites.csv'
const contentType = process.argv[3] || 'archaeologicalSite'

console.log(`📂 导入文件: ${csvPath}`)
console.log(`📋 内容类型: ${contentType}\n`)

importFromCSV(csvPath, contentType)
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ 导入失败:', error)
    process.exit(1)
  })

/* 
使用步骤：

1. 准备 CSV 文件 (data/sites.csv):
   name,period,periodName,lat,lng,date,description,findings,region
   半坡遗址,yangshao,仰韶文化,34.27,109.00,约公元前4800-3600年,描述,彩陶,陕西
   
2. 获取写入 Token:
   - 访问 https://www.sanity.io/manage
   - 选择项目 → Settings → API → Tokens
   - 创建 Editor 权限的 token
   
3. 设置环境变量:
   export SANITY_WRITE_TOKEN="your-token-here"
   
4. 运行导入:
   npm install csv-parser
   node src/data/import-from-csv.js data/sites.csv archaeologicalSite

5. 在 Excel 中编辑数据，导出为 CSV，再运行导入
*/





