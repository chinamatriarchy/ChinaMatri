// 统一数据模型 CSV 导入工具（扁平化字段结构）
// 支持导入所有类型的数据到同一个 'entry' 模型

const fs = require('fs');
const csv = require('csv-parser');
const {sanityClient} = require('../js/sanityClient');

// CSV 列名映射到 Sanity 字段（扁平化结构）
const FIELD_MAPPING = {
  // 基础字段
  'title': 'title',
  'category': 'category',
  'subcategory': 'subcategory',
  'subtitle': 'subtitle',
  'summary': 'summary',
  'description': 'description',
  'dateRange': 'dateRange',
  'year': 'year',
  'tags': 'tags',  // 逗号分隔
  
  // 地理位置（扁平化）
  'latitude': 'coordinates.lat',
  'longitude': 'coordinates.lng',
  'lat': 'coordinates.lat',
  'lng': 'coordinates.lng',
  'region': 'region',
  'address': 'address',
  
  // 人物信息（扁平化）
  'field': 'field',
  'institution': 'institution',
  'birthYear': 'birthYear',
  'deathYear': 'deathYear',
  'nationality': 'nationality',
  'biography': 'biography',
  
  // 作品信息（扁平化）
  'author': 'author',
  'publisher': 'publisher',
  'isbn': 'isbn',
  'pages': 'pages',
  
  // 考古遗址特有
  'findings': 'findings',  // 逗号分隔
  'excavationPeriod': 'excavationPeriod',
  
  // 现存氏族特有
  'population': 'population',
  'language': 'language',
  
  // 其他
  'works': 'works',  // 逗号分隔
  'featured': 'featured',
  'status': 'status',
  'sourceLink': 'sourceLink'
};

// 设置嵌套字段值（仅用于 coordinates）
function setNestedValue(obj, path, value) {
  if (!value) return;
  
  const keys = path.split('.');
  
  // 特殊处理 coordinates
  if (keys[0] === 'coordinates') {
    if (!obj.coordinates) {
      obj.coordinates = {
        _type: 'geopoint'
      };
    }
    const key = keys[1]; // lat 或 lng
    obj.coordinates[key] = parseFloat(value);
    return;
  }
  
  // 其他字段直接设置
  const finalKey = keys[keys.length - 1];
  
  // 类型转换
  if (finalKey === 'birthYear' || finalKey === 'deathYear' || finalKey === 'year' || finalKey === 'pages') {
    obj[finalKey] = parseInt(value);
  } else if (finalKey === 'featured') {
    obj[finalKey] = value.toLowerCase() === 'true' || value === '1';
  } else {
    obj[finalKey] = value;
  }
}

// 主导入函数
async function importFromCSV(filePath) {
  const records = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        records.push(row);
      })
      .on('end', async () => {
        console.log(`\n📊 读取到 ${records.length} 条记录\n`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const row of records) {
          try {
            const doc = {
              _type: 'entry'
            };
            
            // 映射所有字段
            for (const [csvCol, sanityPath] of Object.entries(FIELD_MAPPING)) {
              if (row[csvCol]) {
                // 处理数组字段（逗号或分号分隔）
                if (['tags', 'works', 'findings'].includes(csvCol)) {
                  const separator = row[csvCol].includes(';') ? ';' : ',';
                  doc[sanityPath] = row[csvCol].split(separator).map(s => s.trim()).filter(Boolean);
                } 
                // 普通字段
                else {
                  setNestedValue(doc, sanityPath, row[csvCol]);
                }
              }
            }
            
            // 验证必填字段
            if (!doc.title || !doc.category) {
              console.error(`❌ 跳过: 缺少必填字段 (title 或 category) - ${JSON.stringify(row)}`);
              errorCount++;
              continue;
            }
            
            // 生成唯一 ID（基于标题和分类）
            const slugTitle = doc.title.toLowerCase()
              .replace(/[\u4e00-\u9fa5]/g, (char) => char) // 保留中文
              .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
              .substring(0, 50);
            doc._id = `${doc.category}-${slugTitle}`;
            
            // 创建或更新文档
            await sanityClient.createOrReplace(doc);
            
            const emoji = {
              site: '🗺️',
              goddess: '⭐',
              scholar: '👤',
              work: '📚',
              community: '🏘️'
            }[doc.category] || '📝';
            
            console.log(`✅ ${emoji} ${doc.category} | ${doc.title}`);
            successCount++;
            
          } catch (error) {
            console.error(`❌ 错误: ${row.title || 'Unknown'} - ${error.message}`);
            errorCount++;
          }
        }
        
        console.log(`\n📈 导入完成:`);
        console.log(`   ✅ 成功: ${successCount} 条`);
        console.log(`   ❌ 失败: ${errorCount} 条`);
        console.log(`\n🎉 数据已导入到统一的 'entry' 模型中！`);
        console.log(`💡 访问 Sanity Studio 查看: http://localhost:3333\n`);
        
        resolve();
      })
      .on('error', reject);
  });
}

// 命令行参数
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
📥 统一数据模型 CSV 导入工具

用法:
  node src/data/import-unified.js <csv文件路径>

示例:
  node src/data/import-unified.js data/entries-example.csv
  npm run import data/entries-example.csv

CSV 格式要求:
  ✅ 必填列: title, category
  📝 通用可选列: subtitle, summary, tags, featured, sourceLink
  📍 地理位置: latitude, longitude, region, address
  👤 人物信息: field, institution, birthYear, deathYear, biography
  📚 作品信息: author, publisher, isbn, year
  🗺️ 遗址特有: findings, excavationPeriod
  
支持的 category 值:
  - site (考古遗址)
  - goddess (女神)
  - scholar (学者)
  - work (论著)
  - community (现存氏族)

💡 提示: 
  1. 可以将不同类型的数据放在同一个 CSV 文件中！
  2. 字段会根据 category 自动在 Studio 中显示/隐藏
  3. 多个值用逗号或分号分隔（如 tags）
  `);
  process.exit(0);
}

const csvFile = args[0];

if (!fs.existsSync(csvFile)) {
  console.error(`❌ 文件不存在: ${csvFile}`);
  process.exit(1);
}

console.log(`\n🚀 开始导入: ${csvFile}\n`);
importFromCSV(csvFile)
  .then(() => {
    console.log('✨ 全部完成！');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 导入失败:', error);
    process.exit(1);
  });
