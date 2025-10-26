// 数据迁移脚本 - 将静态数据导入到 Sanity
// 使用方法: node src/data/migrate-to-sanity.js

import {createClient} from '@sanity/client'

// 配置 Sanity 客户端
const client = createClient({
  projectId: 'your-project-id', // 替换为你的 project ID
  dataset: 'production',
  useCdn: false, // 写入操作不使用 CDN
  apiVersion: '2024-01-01',
  token: 'your-write-token' // 需要从 Sanity 获取写入 token
})

// 考古遗址数据（从 map.html 提取）
const archaeologicalSites = [
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
    description: '位于陕西西安，是仰韶文化的典型遗址，发现了大量母系氏族社会的房屋遗迹和陶器。',
    findings: '彩陶、石器、房屋遗址',
    region: '陕西西安'
  },
  {
    _type: 'archaeologicalSite',
    name: '姜寨遗址',
    period: 'yangshao',
    periodName: '仰韶文化',
    location: {
      _type: 'geopoint',
      lat: 34.53,
      lng: 109.35
    },
    date: '约公元前5000-3000年',
    description: '位于陕西临潼，保存完好的母系氏族村落遗址，展现了母系社会的聚落形态。',
    findings: '环壕聚落、彩陶、墓葬',
    region: '陕西临潼'
  },
  {
    _type: 'archaeologicalSite',
    name: '河姆渡遗址',
    period: 'hemudu',
    periodName: '河姆渡文化',
    location: {
      _type: 'geopoint',
      lat: 30.03,
      lng: 121.35
    },
    date: '约公元前5500-4500年',
    description: '位于浙江余姚，长江下游新石器文化代表，发现了干栏式建筑和稻作农业证据。',
    findings: '干栏建筑、骨耜、陶器、稻谷遗存',
    region: '浙江余姚'
  },
  // ... 可以继续添加更多数据
]

// 女神数据（从 goddess.html 提取）
const goddesses = [
  {
    _type: 'goddess',
    name: '女娲',
    category: 'creation',
    categoryName: '创世女神',
    title: '创世女神与人类之母',
    summary: '中华民族的创世女神，传说用黄土造人，五彩石补天。',
    relatedCultures: ['女娲庙', '补天神话', '人类起源']
  },
  {
    _type: 'goddess',
    name: '西王母',
    category: 'nature',
    categoryName: '自然女神',
    title: '昆仑山的至高女神',
    summary: '居住在昆仑山上的瑶池，是掌管不死药和长生的女神。',
    relatedCultures: ['昆仑神话', '蟠桃会', '长生不老']
  },
  // ... 更多女神
]

// 学者数据（从 scholars.html 提取）
const scholars = [
  {
    _type: 'scholar',
    name: '蔡华',
    region: 'chinese',
    field: '摩梭文化研究',
    institution: '北京大学',
    description: '长期从事摩梭人母系社会的田野调查，著有《无父无夫的社会》，对走婚制度有深入研究。',
    works: ['无父无夫的社会', '中国母系社会']
  },
  {
    _type: 'scholar',
    name: '李银河',
    region: 'chinese',
    field: '性别研究',
    institution: '中国社会科学院',
    description: '著名社会学家，研究领域包括性别关系、婚姻家庭、性社会学，对母系社会有独特见解。',
    works: ['女性主义', '性社会学']
  },
  // ... 更多学者
]

// 批量导入函数
async function migrateData(dataArray, typeName) {
  console.log(`\n开始导入 ${typeName} 数据...`)
  let successCount = 0
  let errorCount = 0

  for (const item of dataArray) {
    try {
      const result = await client.create(item)
      console.log(`✅ Created: ${item.name || item.title}`)
      successCount++
    } catch (error) {
      console.error(`❌ Error creating ${item.name || item.title}:`, error.message)
      errorCount++
    }
  }

  console.log(`\n${typeName} 导入完成:`)
  console.log(`  成功: ${successCount}`)
  console.log(`  失败: ${errorCount}`)
}

// 执行迁移
async function runMigration() {
  console.log('=' .repeat(50))
  console.log('MatriArchive 数据迁移工具')
  console.log('=' .repeat(50))

  try {
    // 检查连接
    console.log('\n检查 Sanity 连接...')
    const config = await client.config()
    console.log(`✅ 已连接到项目: ${config.projectId}`)
    console.log(`✅ 数据集: ${config.dataset}`)

    // 导入各类数据
    await migrateData(archaeologicalSites, '考古遗址')
    await migrateData(goddesses, '女神')
    await migrateData(scholars, '学者')

    console.log('\n' + '='.repeat(50))
    console.log('✅ 所有数据迁移完成！')
    console.log('=' .repeat(50))
    console.log('\n下一步：')
    console.log('1. 访问 Sanity Studio 查看数据')
    console.log('2. 开始重构前端页面')
    console.log('3. 测试动态数据加载')

  } catch (error) {
    console.error('\n❌ 迁移失败:', error.message)
    console.log('\n请检查：')
    console.log('1. Project ID 是否正确？')
    console.log('2. Token 是否有写入权限？')
    console.log('3. 网络连接是否正常？')
  }
}

// 运行迁移
runMigration()

/* 
使用步骤：

1. 获取写入 Token：
   - 访问 https://www.sanity.io/manage
   - 选择你的项目
   - Settings > API > Tokens
   - 创建新 token，权限选择 "Editor"
   - 复制 token 到上面的配置中

2. 更新配置：
   - 替换 projectId
   - 替换 token

3. 运行脚本：
   node src/data/migrate-to-sanity.js

4. 检查结果：
   访问 Studio 查看导入的数据
*/

