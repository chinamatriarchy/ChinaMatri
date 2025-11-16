# 🔄 数据结构扩展指南

## ✨ 好消息：修改 Schema 非常简单！

### 为什么不困难？

1. **只需修改一个文件**
   - 找到对应的 schema 文件
   - 添加新字段
   - 保存并重启 Studio
   - 完成！

2. **向后兼容**
   - 新字段是可选的
   - 旧数据不受影响
   - 可以逐步填充新字段

3. **实时生效**
   - 修改 schema 后重启 Studio
   - 新字段立即出现在编辑界面
   - 无需迁移数据库

---

## 📝 实际操作示例

### 示例 1: 给"女神"模型添加新字段

假设您想添加：
- 供奉地点
- 相关节日
- 影响力评分

#### 步骤 1: 打开文件
```
studio/schemas/goddess.js
```

#### 步骤 2: 在 fields 数组中添加新字段

```javascript
export default {
  name: 'goddess',
  title: '女神',
  type: 'document',
  fields: [
    // ... 现有字段 ...
    
    // 👇 添加新字段
    {
      name: 'worshipSites',
      title: '供奉地点',
      type: 'array',
      of: [{type: 'string'}],
      description: '主要供奉该女神的庙宇或地点'
    },
    {
      name: 'festivals',
      title: '相关节日',
      type: 'array',
      of: [{type: 'string'}],
      description: '与该女神相关的传统节日'
    },
    {
      name: 'influenceScore',
      title: '影响力评分',
      type: 'number',
      validation: Rule => Rule.min(0).max(10),
      description: '文化影响力评分（0-10）'
    }
  ]
}
```

#### 步骤 3: 重启 Studio
```bash
# Ctrl+C 停止
# 然后重新运行
cd studio
npm run dev
```

#### 步骤 4: 完成！
- 打开任何女神条目
- 看到新的字段
- 可以开始填写
- 旧数据不受影响（新字段为空）

---

## 🎯 常见修改场景

### 场景 1: 添加新字段 ✅ 简单

**操作：**
```javascript
{
  name: 'newField',
  title: '新字段',
  type: 'string'
}
```

**影响：**
- 旧数据：不受影响，新字段为空
- 新数据：可以填写新字段

---

### 场景 2: 修改字段类型 ⚠️ 需要注意

**示例：** 把 `string` 改成 `number`

**操作：**
```javascript
// 旧的
{
  name: 'year',
  type: 'string'  // "2024"
}

// 新的
{
  name: 'year',
  type: 'number'  // 2024
}
```

**影响：**
- 旧数据可能需要转换
- 建议：创建新字段，逐步迁移

---

### 场景 3: 重命名字段 ⚠️ 需要迁移

**不推荐直接重命名！** 会丢失数据

**推荐做法：**
1. 创建新字段
2. 保留旧字段
3. 逐步迁移数据
4. 删除旧字段

```javascript
{
  name: 'oldFieldName',
  title: '旧字段（待删除）',
  type: 'string',
  hidden: true  // 在 UI 中隐藏
},
{
  name: 'newFieldName',
  title: '新字段',
  type: 'string'
}
```

---

### 场景 4: 删除字段 ✅ 安全

**操作：**
- 直接从 schema 中删除字段定义
- 数据仍保留在数据库中
- 只是不再显示在 UI 中

---

## 📊 实际例子：扩展"考古遗址"模型

### 当前字段：
```javascript
{
  title: '标题',
  period: '时期',
  location: '位置',
  findings: '发现'
}
```

### 新需求：添加更多信息

```javascript
export default {
  name: 'archaeologicalSite',
  title: '考古遗址',
  type: 'document',
  fields: [
    // 原有字段保持不变
    { name: 'title', title: '标题', type: 'string' },
    { name: 'period', title: '时期', type: 'string' },
    // ... 其他原有字段 ...
    
    // 👇 新增字段
    {
      name: 'excavationLeader',
      title: '发掘负责人',
      type: 'string',
      description: '主要考古学家或发掘队负责人'
    },
    {
      name: 'protectionLevel',
      title: '保护级别',
      type: 'string',
      options: {
        list: [
          {title: '国家级', value: 'national'},
          {title: '省级', value: 'provincial'},
          {title: '市级', value: 'municipal'}
        ]
      }
    },
    {
      name: 'visitingInfo',
      title: '参观信息',
      type: 'object',
      fields: [
        {name: 'openToPublic', title: '是否开放', type: 'boolean'},
        {name: 'ticketPrice', title: '门票价格', type: 'string'},
        {name: 'openingHours', title: '开放时间', type: 'string'}
      ]
    },
    {
      name: 'relatedMuseum',
      title: '相关博物馆',
      type: 'string',
      description: '文物展出的博物馆'
    }
  ]
}
```

### 修改后的效果：
- ✅ 所有旧数据正常显示
- ✅ 新字段可以逐步填写
- ✅ 前端可以选择性显示新字段

---

## 🔄 数据迁移（如果需要）

### 简单迁移：使用 Sanity API

```javascript
// migrate-add-field.js
const {sanityClient} = require('./src/js/sanityClient');

async function addDefaultValue() {
  // 获取所有女神数据
  const goddesses = await sanityClient.fetch('*[_type == "goddess"]');
  
  // 为每个条目添加默认值
  for (const goddess of goddesses) {
    await sanityClient
      .patch(goddess._id)
      .set({
        influenceScore: 5,  // 默认评分
        festivals: []       // 空数组
      })
      .commit();
    
    console.log(`Updated: ${goddess.title}`);
  }
}

addDefaultValue();
```

---

## ✨ 最佳实践

### 1. 添加新字段时
```javascript
{
  name: 'newField',
  title: '新字段',
  type: 'string',
  description: '清晰的描述',  // 👈 添加描述
  validation: Rule => Rule.required(),  // 可选：验证规则
  initialValue: '默认值'  // 可选：默认值
}
```

### 2. 字段分组（提高可读性）
```javascript
fieldsets: [
  {
    name: 'basic',
    title: '基础信息',
    options: { collapsible: true }
  },
  {
    name: 'extended',
    title: '扩展信息',
    options: { collapsible: true, collapsed: true }
  }
]
```

### 3. 渐进式添加
```javascript
{
  name: 'experimentalField',
  title: '实验性字段',
  type: 'string',
  hidden: true,  // 👈 先隐藏，测试后再显示
  description: '测试阶段'
}
```

---

## 📋 修改 Schema 的检查清单

修改前：
- [ ] 确定要添加哪些字段
- [ ] 字段类型选择正确
- [ ] 考虑是否必填
- [ ] 添加字段描述

修改时：
- [ ] 在正确的 schema 文件中修改
- [ ] 保存文件
- [ ] 重启 Studio

修改后：
- [ ] 测试新字段是否显示
- [ ] 测试旧数据是否正常
- [ ] 更新前端代码（如果需要显示新字段）
- [ ] 通知团队成员新字段的用途

---

## 🎯 总结

### ✅ 简单的操作
- 添加新字段
- 删除字段
- 修改字段标题/描述
- 添加验证规则

### ⚠️ 需要小心的操作
- 修改字段类型
- 重命名字段
- 将可选字段改为必填

### ❌ 避免的操作
- 直接在生产环境大量修改
- 删除有数据的必填字段
- 修改已使用字段的 `name` 属性

---

## 💡 推荐工作流程

### 开发阶段（现在）
1. 快速迭代，频繁修改 schema
2. 数据量小，可以随意调整
3. 测试各种字段组合

### 正式使用（有数据后）
1. 谨慎修改现有字段
2. 新需求用新字段
3. 保持向后兼容
4. 做好数据备份

---

**结论：修改数据结构并不困难！** 

只要遵循最佳实践，您可以随时根据需求调整模型结构。🎉





