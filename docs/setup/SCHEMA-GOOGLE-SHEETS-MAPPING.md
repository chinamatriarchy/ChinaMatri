# 📊 CMS Schema 字段映射 - 完全匹配 Google Sheets

**基于 Google Sheets**: https://docs.google.com/spreadsheets/d/1NFBG4SM1StEtxRD_dMZSW1KBcxK7OQrKQ_zyTL6Feqc/

---

## ✅ 已完成的 Schema 更新

### 1. 🗺️ **母系考古/时间线** (`archaeologicalSite.js`)

**Google Sheets 字段** → **Sanity 字段**:
- 地点 → `location`
- 文化/遗址 → `cultureSite`
- 年代 → `era`
- 社会与权力特征 → `socialCharacteristics`

**额外字段**:
- `startYear`, `endYear` (用于时间线排序)
- `coordinates` (地图坐标)
- `description` (详细描述)
- `mainImage` (主图片)
- `region`, `cultureType`, `societyType` (分类标签)

---

### 2. 👸 **女神谱系** (`goddess.js`) - Holly

**Google Sheets 字段** → **Sanity 字段**:
- 时间 → `time`
- 名字 → `name` ✓ (必填)
- 角色 → `role`
- 与其他神的关系 → `relationships`
- 故事 → `story` (富文本)
- 神话出处 → `mythologySource`
- 标注 → `note`
- 标签 → `tags` (数组)
- URL → `url`
- 附件/图片 → `attachments` (支持图片和文件)

**额外字段**:
- `category` (女神类别：创世/自然/文化/保护神)
- `region` (相关地区)

---

### 3. 🏘️ **现存氏族** (`community.js`) - 李雯

**Google Sheets 字段** → **Sanity 字段**:
- 氏族名 → `clanName` ✓ (必填)
- 分布地区 → `region` ✓ (必填)
- 人口 → `population`
- 母权或母系特征 → `matriarchalFeatures`
- 历史渊源 → `historicalOrigin` (富文本)
- 宗教信仰 → `religion`
- 著名人物 → `notableFigures` (数组)
- 民族女神 → `tribalGoddess`
- 相关研究 → `relatedResearch`
- 相关影视文学作品 → `mediaWorks` (数组)
- 标签 → `tags` (数组)
- URL → `url`
- 附件/图片 → `attachments` (支持图片和文件)

**额外字段**:
- `location` (地图坐标 geopoint)
- `featured` (是否重点展示)

---

### 4. 🏛️ **古代母权社会** (`ancientMatriarchalSociety.js`) - 李雯

**Google Sheets 字段** → **Sanity 字段**:
- 氏族名 → `clanName` ✓ (必填)
- 分布地区 → `region` ✓ (必填)
- 人口 → `population`
- 母权或母系特征 → `matriarchalFeatures`
- 历史渊源 → `historicalOrigin` (富文本)
- 宗教信仰 → `religion`
- 著名人物 → `notableFigures` (数组)
- 民族女神 → `tribalGoddess`
- 相关研究 → `relatedResearch`
- 标签 → `tags` (数组)
- URL → `url`
- 附件/图片 → `attachments` (支持图片和文件)

**额外字段**:
- `timePeriod` (时代)
- `startYear`, `endYear` (年份 BCE)
- `location` (地图坐标 geopoint)
- `featured` (是否重点展示)

---

### 5. 📚 **相关论著** (`publication.js`) - Pei Pei/艺帆

**Google Sheets 字段** → **Sanity 字段**:
- 标题 → `title` ✓ (必填)
- 著作年份 → `year` ✓ (必填)
- 著作研究朝代 → `researchDynasty`
- 类别 → `category` (人类学/经济史/民族学/考古学/社会学/历史学)
- 作者 → `author` ✓ (必填)
- 来源 → `source`
- 摘要 → `abstract`
- URL → `url`
- 附件/图片 → `attachments` (支持 PDF/DOC/图片)
- 标签 → `tags` (数组)

**额外字段**:
- `isbn` (ISBN 号)
- `publisher` (出版社)
- `purchaseLink` (购买链接)
- `coverImage` (封面图片)

---

### 6. 👨‍🏫 **学者名录** (`scholar.js`) - Peipei/艺帆

**现有字段**:
- 姓名 → `name` ✓ (必填)
- 地区 → `region` (中国学者/西方学者)
- 研究领域 → `field` ✓ (必填)
- 所属机构 → `institution`
- 简介 → `description`
- 代表作品 → `works` (数组)
- 照片 → `photo`
- 出生年份 → `birthYear`
- 逝世年份 → `deathYear`
- 个人网站 → `website`

**说明**: Scholar schema 保持现有结构（已较完善）

---

## 📋 在 Sanity Studio 中的显示顺序

访问 http://localhost:3333 后，您会看到这些内容类型：

1. 🗺️ **母系考古/时间线**
2. 👸 **女神谱系**
3. 🏘️ **现存氏族**
4. 🏛️ **古代母权社会**
5. 📚 **相关论著**
6. 👨‍🏫 **学者**

---

## 🎯 字段类型说明

### 基础类型
- **string**: 短文本（单行）
- **text**: 长文本（多行）
- **number**: 数字
- **boolean**: 是/否
- **url**: 网址链接
- **geopoint**: 地图坐标（纬度/经度）

### 高级类型
- **array**: 数组（多个值）
  - `array of string`: 多个文本
  - `array of block`: 富文本编辑器（支持格式化）
- **image**: 图片上传
- **file**: 文件上传（PDF/DOC等）

### 特殊配置
- **validation: Rule => Rule.required()**: 必填字段 ✓
- **rows: 3**: 文本框显示行数
- **options.layout: 'tags'**: 标签样式显示
- **options.hotspot: true**: 图片可设置焦点
- **description**: 字段说明提示

---

## 🔄 与 Google Sheets 的对应关系

| Google Sheets Tab | Sanity Schema 文件 | 负责人 |
|-------------------|-------------------|--------|
| 母系考古/时间线 | `archaeologicalSite.js` | - |
| 女神谱系（Holly） | `goddess.js` | Holly |
| 现存氏族（李雯） | `community.js` | 李雯 |
| 古代母权社会（李雯） | `ancientMatriarchalSociety.js` | 李雯 |
| 相关论著（Pei Pei/艺帆） | `publication.js` | Pei Pei/艺帆 |
| 学者名录（Peipei/艺帆） | `scholar.js` | Peipei/艺帆 |

---

## 📝 使用指南

### 在 Studio 中添加数据

1. **访问 Studio**: http://localhost:3333
2. **选择内容类型**（例如：女神谱系）
3. **点击 "+ 创建"**
4. **填写字段**:
   - ✓ 必填字段必须填写
   - 其他字段可选
5. **点击 "✅ Publish"** 发布

### 字段填写示例

#### 女神谱系示例
```
时间: 新石器时代
名字: 女娲 ✓
角色: 创世女神
与其他神的关系: 伏羲之妹
故事: [富文本] 抟土造人，炼石补天...
神话出处: 《山海经》、《淮南子》
标注: 中国创世神话核心人物
标签: 创世神话, 上古神话, 母系文化
URL: https://...
附件/图片: [上传图片]
```

#### 现存氏族示例
```
氏族名: 摩梭人 ✓
分布地区: 云南泸沽湖、四川盐源 ✓
人口: 约4-5万人
母权或母系特征: 走婚制，母系血统，母亲掌管家庭财产...
历史渊源: [富文本] 古羌人后裔...
宗教信仰: 达巴教
著名人物: [杨二车娜姆]
民族女神: 格姆女神
相关研究: 周华山《无父无夫的国度》...
相关影视文学作品: [纪录片《女儿国》, 电视剧《泸沽湖》]
标签: 走婚制, 母系社会, 活化石
URL: https://...
附件/图片: [上传图片]
```

---

## 🚀 下一步

### 1. 测试 Schema
```bash
# 确保 Studio 正在运行
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npm run dev

# 访问 http://localhost:3333
```

### 2. 添加示例数据
- 每个内容类型添加1-2条测试数据
- 验证所有字段正常工作

### 3. 部署到线上
```bash
# 推送到 GitHub
git add .
git commit -m "feat: 更新所有 schemas 匹配 Google Sheets"
git push

# Netlify 会自动部署
```

---

## 🐛 故障排除

### Schema 更新后 Studio 报错

**重启 Studio**:
```bash
# 停止
pkill -f "sanity dev"

# 重新启动
cd studio
npm run dev
```

### 字段不显示

检查：
1. `studio/schemas/index.js` 是否导入了所有 schema
2. Schema 语法是否正确
3. 浏览器控制台是否有错误

---

## 📞 需要帮助？

如果某个 schema 需要调整，告诉我：
1. 哪个 schema（例如：女神谱系）
2. 需要改什么（例如：添加字段、修改类型）
3. 字段名称和要求

---

*最后更新：2025-11-09*
*基于 Google Sheets: https://docs.google.com/spreadsheets/d/1NFBG4SM1StEtxRD_dMZSW1KBcxK7OQrKQ_zyTL6Feqc/*

