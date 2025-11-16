const {sanityClient} = require('../js/sanityClient');
const fs = require('fs');

// 导出统一模型数据为 CSV
async function exportToCSV(category = null, outputFile = null) {
  try {
    // 构建查询
    let query = '*[_type == "entry"';
    if (category) {
      query += ` && category == "${category}"`;
    }
    query += '] | order(_createdAt desc)';
    
    console.log(`\n📊 查询: ${query}\n`);
    
    const data = await sanityClient.fetch(query);
    
    if (data.length === 0) {
      console.log('❌ 没有找到数据');
      return;
    }
    
    console.log(`✅ 找到 ${data.length} 条记录\n`);
    
    // 定义 CSV 列（常用字段）
    const columns = [
      'title',
      'category',
      'subcategory',
      'subtitle',
      'summary',
      'dateRange',
      'year',
      'tags',
      'latitude',
      'longitude',
      'region',
      'field',
      'institution',
      'author',
      'publisher',
      'featured',
      'status'
    ];
    
    // 构建 CSV 内容
    const csvRows = [];
    csvRows.push(columns.join(','));
    
    for (const item of data) {
      const row = columns.map(col => {
        let value = '';
        
        // 处理嵌套字段
        if (col === 'latitude') {
          value = item.location?.coordinates?.lat || '';
        } else if (col === 'longitude') {
          value = item.location?.coordinates?.lng || '';
        } else if (col === 'region') {
          value = item.location?.region || '';
        } else if (col === 'field') {
          value = item.personInfo?.field || '';
        } else if (col === 'institution') {
          value = item.personInfo?.institution || '';
        } else if (col === 'author') {
          value = item.workInfo?.author || '';
        } else if (col === 'publisher') {
          value = item.workInfo?.publisher || '';
        } else if (col === 'tags') {
          value = Array.isArray(item.tags) ? item.tags.join(';') : '';
        } else {
          value = item[col] || '';
        }
        
        // 处理逗号和引号
        value = String(value).replace(/"/g, '""');
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          value = `"${value}"`;
        }
        
        return value;
      });
      
      csvRows.push(row.join(','));
    }
    
    const csvContent = csvRows.join('\n');
    
    // 输出文件名
    if (!outputFile) {
      const timestamp = new Date().toISOString().split('T')[0];
      outputFile = `data/export-${category || 'all'}-${timestamp}.csv`;
    }
    
    fs.writeFileSync(outputFile, '\uFEFF' + csvContent); // 添加 BOM for Excel
    
    console.log(`✅ 数据已导出到: ${outputFile}`);
    console.log(`   共 ${data.length} 条记录\n`);
    
  } catch (error) {
    console.error('❌ 导出失败:', error);
  }
}

// 命令行参数
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📤 统一数据模型 CSV 导出工具

用法:
  node src/data/export-unified.js [category] [输出文件]

参数:
  category   - 可选，指定分类 (goddess, site, scholar, work, community)
  输出文件    - 可选，指定输出文件路径

示例:
  # 导出所有数据
  node src/data/export-unified.js
  
  # 导出女神数据
  node src/data/export-unified.js goddess
  
  # 导出到指定文件
  node src/data/export-unified.js site data/sites-backup.csv
  
  # 导出所有学者
  node src/data/export-unified.js scholar data/scholars.csv
  `);
  process.exit(0);
}

const category = args[0] || null;
const outputFile = args[1] || null;

console.log(`\n🚀 开始导出${category ? ` category: ${category}` : '所有数据'}...\n`);

exportToCSV(category, outputFile)
  .then(() => {
    console.log('✨ 导出完成！');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 导出失败:', error);
    process.exit(1);
  });





