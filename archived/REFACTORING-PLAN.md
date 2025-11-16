# 🔄 网站重构计划 - 从静态到动态

## 📊 当前状态总览

### ✅ 已完成
- [x] Sanity CMS 基础设置
- [x] Project ID 配置 (8i1xhvuq)
- [x] Studio 可运行
- [x] 5 个内容模型（Schemas）
- [x] 浏览器客户端（sanity-browser.js）
- [x] **map-cms.html** - 动态版地图（唯一完成的页面）

### ❌ 待重构（6 个页面）
- [ ] goddess.html → goddess-cms.html（女神谱系）
- [ ] scholars.html → scholars-cms.html（学者名录）
- [ ] works.html → works-cms.html（相关论著）
- [ ] communities.html → communities-cms.html（现存氏族）
- [ ] timeline.html → timeline-cms.html（时间线）
- [ ] index.html → 更新首页链接和预览

---

## 🎯 重构计划（按优先级）

### 阶段 1：核心内容页面（优先）

#### 1. goddess-cms.html（女神谱系）✨
**工作量：** 中等  
**原因：** 数据结构简单，有分类

**需要：**
- 从 Sanity 加载女神数据
- 保留筛选功能（按 category）
- 动态渲染卡片

#### 2. scholars-cms.html（学者名录）✨
**工作量：** 中等  
**原因：** 数据结构简单

**需要：**
- 从 Sanity 加载学者数据
- 保留筛选功能（按 region）
- 动态渲染卡片

#### 3. works-cms.html（论著）✨
**工作量：** 简单  
**原因：** 纯列表展示

**需要：**
- 从 Sanity 加载论著数据
- 保留分类筛选
- 动态渲染

---

### 阶段 2：复杂内容页面

#### 4. communities-cms.html（现存氏族）🔶
**工作量：** 较大  
**原因：** 包含多个富文本字段、图片集

**需要：**
- 处理富文本内容
- 处理图片数组
- 保留布局

#### 5. timeline-cms.html（时间线）🔶
**工作量：** 较大（可选）  
**原因：** 可能需要新的内容模型

**建议：** 
- 可以暂时保持静态
- 或创建新的 timeline Schema

---

### 阶段 3：首页整合

#### 6. index.html 更新
**工作量：** 简单  
**需要：**
- 更新所有链接指向 -cms.html 版本
- 首页预览从 CMS 加载
- 确保导航正确

---

## 🚀 快速重构模板

### 重构步骤（以 goddess.html 为例）：

**1. 复制静态页面**
```bash
cp goddess.html goddess-cms.html
```

**2. 引入 Sanity 客户端**
```html
<script src="src/js/sanity-browser.js"></script>
```

**3. 替换数据源**
```javascript
// ❌ 之前：硬编码
const goddesses = [
  {name: '女娲', category: 'creation', ...},
  // ...
]

// ✅ 现在：从 CMS 加载
async function loadGoddesses() {
  const goddesses = await window.SanityAPI.getGoddesses()
  renderGoddesses(goddesses)
}
```

**4. 保持原有样式和功能**
- 所有 Tailwind 类保持不变
- 筛选功能保持不变
- 只改数据来源

---

## 📝 每个页面的具体任务

### goddess-cms.html
```javascript
需要修改的地方：
1. 添加 <script src="src/js/sanity-browser.js">
2. 将 goddesses 数组改为从 API 加载
3. 图片 URL 使用 window.SanityAPI.getImageUrl()
4. 其他保持不变 ✅
```

### scholars-cms.html
```javascript
需要修改的地方：
1. 添加 Sanity 客户端
2. 将 scholars 数组改为从 API 加载
3. 照片 URL 处理
4. 其他保持不变 ✅
```

### works-cms.html
```javascript
需要修改的地方：
1. 添加 Sanity 客户端
2. 将 books 数组改为从 API 加载
3. 封面图处理（如果有）
4. 其他保持不变 ✅
```

---

## 🔧 配置 CORS（重要！）

在所有页面上线前，需要配置 CORS：

1. 访问 https://www.sanity.io/manage
2. 选择项目（8i1xhvuq）
3. Settings → API → CORS Origins
4. 添加：
   - `http://localhost:8000`（开发）
   - `https://yourdomain.com`（生产，上线时）

---

## 📊 重构进度追踪

```
总进度：1/7 页面完成 (14%)

✅ map-cms.html          [████████████████████] 100%
⏳ goddess-cms.html      [░░░░░░░░░░░░░░░░░░░░]   0%
⏳ scholars-cms.html     [░░░░░░░░░░░░░░░░░░░░]   0%
⏳ works-cms.html        [░░░░░░░░░░░░░░░░░░░░]   0%
⏳ communities-cms.html  [░░░░░░░░░░░░░░░░░░░░]   0%
⏳ timeline-cms.html     [░░░░░░░░░░░░░░░░░░░░]   0%
⏳ index.html            [░░░░░░░░░░░░░░░░░░░░]   0%
```

---

## 🎯 推荐的执行顺序

### 选项 A：逐个重构（稳妥）
```
第1天：goddess-cms.html
第2天：scholars-cms.html
第3天：works-cms.html
第4天：communities-cms.html
第5天：timeline-cms.html（可选）
第6天：更新 index.html
第7天：测试 + 上线
```

### 选项 B：快速上线（最小化）
```
第1天：goddess-cms.html + scholars-cms.html
第2天：works-cms.html + 更新 index.html
第3天：测试 + 上线
（其他页面暂时保持静态链接）
```

---

## ⚠️ 上线前检查清单

### 数据准备
- [ ] 在 Studio 中添加所有内容
- [ ] 所有内容已 Publish（不是 Draft）
- [ ] 图片已上传
- [ ] 数据完整性检查

### 技术配置
- [ ] CORS 配置完成
- [ ] 所有页面链接正确
- [ ] 404 页面处理
- [ ] 移动端测试通过

### 性能优化
- [ ] 图片优化（Sanity 自动）
- [ ] 加载状态显示
- [ ] 错误处理

### SEO 和分析
- [ ] 添加 meta 标签
- [ ] Google Analytics（可选）
- [ ] Sitemap 生成

---

## 💡 现在该做什么？

### 建议：

**立即行动：**
1. ✅ 先在 Studio 中添加一些测试数据
2. ✅ 测试 map-cms.html 是否能正确显示
3. ✅ 配置 CORS

**然后选择：**

**选项 1：我帮您重构所有页面**
- 我可以立即开始重构
- 预计 1-2 小时完成所有页面
- 您只需要添加数据

**选项 2：您自己逐步重构**
- 参考 map-cms.html 作为模板
- 按照上面的步骤操作
- 遇到问题随时问我

**选项 3：部分上线**
- 只重构核心页面
- 其他页面暂时显示"即将推出"
- 快速上线，逐步完善

---

## 🎯 下一步行动

**告诉我您想：**

1. **立即重构所有页面** → 我现在就开始
2. **先重构 2-3 个页面测试** → 我帮您做核心页面
3. **您自己学习重构** → 我提供详细指导
4. **先添加数据，稍后重构** → 我教您如何添加内容

**您想选哪一个？** 🚀





