# Sanity CMS 快速开始指南

## ✅ 完成状态检查

### 已完成 ✓
- [x] 安装 Sanity 依赖
- [x] 创建项目结构
- [x] 定义 5 个内容模型（Schema）
- [x] 创建 Sanity 客户端
- [x] 创建数据迁移脚本
- [x] 创建示例页面（map-cms.html）
- [x] 编写完整文档

### 待完成 □
- [ ] 创建 Sanity 项目并获取 Project ID
- [ ] 配置 Project ID 到所有文件
- [ ] 启动 Sanity Studio
- [ ] 添加测试数据
- [ ] 配置 CORS
- [ ] 测试数据加载
- [ ] 重构所有页面

---

## 🚀 15分钟快速开始

### 1. 创建 Sanity 项目 (5分钟)

```bash
# 登录 Sanity
npx sanity login

# 初始化项目
cd studio
npx sanity init --project-plan free

# 按提示选择：
# - Create new project
# - Project name: MatriArchive CMS  
# - Use default dataset configuration? Y
# - Output path: ./ (当前目录)
```

**重要！** 完成后会显示类似这样的信息：
```
✅ Success! Below are your project details:

Project ID: abc123xyz      👈 复制这个！
Dataset: production
```

### 2. 配置 Project ID (2分钟)

需要在以下 **3个文件** 中替换 `your-project-id`：

```javascript
// 1. studio/sanity.config.js
projectId: 'abc123xyz',  // 👈 粘贴你的 Project ID

// 2. src/js/sanityClient.js
projectId: 'abc123xyz',  // 👈 粘贴你的 Project ID

// 3. src/js/sanity-browser.js
projectId: 'abc123xyz',  // 👈 粘贴你的 Project ID
```

### 3. 启动 Studio (2分钟)

```bash
cd studio
npx sanity dev
```

Studio 将在 http://localhost:3333 启动 🎉

### 4. 添加测试数据 (3分钟)

在 Studio 中添加一个测试遗址：

1. 打开 http://localhost:3333
2. 点击 **"考古遗址"**
3. 点击右上角 **"Create"** 按钮
4. 填写数据：
   - **遗址名称**: 半坡遗址
   - **文化时期**: 选择 "yangshao"
   - **文化时期名称**: 仰韶文化
   - **地理位置**: 点击地图，选择大致位置
   - **年代**: 约公元前4800-3600年
   - **描述**: 位于陕西西安，是仰韶文化的典型遗址
   - **主要发现**: 彩陶、石器、房屋遗址
5. 点击右下角 **"Publish"**

### 5. 配置 CORS (2分钟)

1. 访问 https://www.sanity.io/manage
2. 选择你的项目 **"MatriArchive CMS"**
3. 点击 **Settings** → **API** → **CORS Origins**
4. 点击 **"Add CORS origin"**
5. 添加：`http://localhost:8000`
6. 勾选 **"Allow credentials"**
7. 点击 **"Save"**

### 6. 测试！(1分钟)

```bash
# Terminal 1: Studio 继续运行
# cd studio
# npx sanity dev

# Terminal 2: 启动网站
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
python3 -m http.server 8000
```

打开浏览器：
- Studio: http://localhost:3333
- CMS版地图: http://localhost:8000/map-cms.html

应该能看到你刚才添加的数据！🎉

---

## 🔧 故障排除

### 问题 1: "Sanity client not loaded"

**解决方案：**
检查 `src/js/sanity-browser.js` 中的 Project ID 是否正确

### 问题 2: CORS 错误

```
Access to fetch at 'https://xxx.api.sanity.io' blocked by CORS
```

**解决方案：**
1. 确认已在 Sanity 管理后台添加 CORS origin
2. 确认 URL 完全匹配（包括端口号）
3. 刷新浏览器

### 问题 3: 数据不显示

**检查步骤：**
```bash
# 1. 检查控制台是否有错误
打开浏览器开发者工具 (F12)

# 2. 检查 Project ID
console.log(window.SanityAPI.config.projectId)

# 3. 手动测试 API
window.SanityAPI.getSites().then(console.log)
```

### 问题 4: Studio 无法启动

```bash
# 清除缓存重新安装
cd studio
rm -rf node_modules
npm install
npx sanity dev
```

---

## 📚 下一步

完成快速开始后：

### 立即可做
1. ✅ 在 Studio 中添加更多数据
2. ✅ 查看 map-cms.html 的效果
3. ✅ 尝试筛选功能

### 本周计划
1. 📝 运行数据迁移脚本（`src/data/migrate-to-sanity.js`）
2. 📝 重构其他页面（goddess.html, scholars.html 等）
3. 📝 上传真实图片到 Sanity

### 长期计划
1. 🎯 部署 Studio 到 Sanity 云端
2. 🎯 部署网站到 Netlify/Vercel
3. 🎯 添加搜索功能
4. 🎯 添加内容版本控制
5. 🎯 创建内容编辑指南

---

## 🎓 学习资源

### 必看视频
- [Sanity.io 入门教程](https://www.sanity.io/docs/getting-started)
- [GROQ 查询语言](https://www.sanity.io/docs/groq)

### 有用工具
- [GROQ Playground](https://www.sanity.io/docs/groq) - 测试查询
- [Vision Plugin](http://localhost:3333/vision) - Studio 中的查询工具
- [Sanity 管理后台](https://www.sanity.io/manage) - 项目设置

### 社区
- [Sanity Slack](https://slack.sanity.io/)
- [Sanity Exchange](https://www.sanity.io/exchange)

---

## 💡 专业提示

### 开发工作流

```bash
# 推荐的开发设置

# Terminal 1: Sanity Studio
cd studio && npx sanity dev

# Terminal 2: 网站
python3 -m http.server 8000

# Terminal 3: Git
git status
```

### Studio 自定义

在 `studio/sanity.config.js` 中可以：
- 更改 Studio 标题
- 添加自定义组件
- 配置工作区布局

### 数据备份

```bash
# 导出数据
cd studio
npx sanity dataset export production backup.tar.gz

# 导入数据
npx sanity dataset import backup.tar.gz production
```

### 性能优化

1. 使用 CDN (useCdn: true)
2. 缓存图片 URL
3. 只查询需要的字段
4. 使用分页加载大量数据

---

## ✨ 成功！

如果你完成了上面的步骤，你现在有：

- ✅ 一个功能完整的 Sanity Studio
- ✅ 可以动态加载内容的网站
- ✅ 完整的内容管理能力
- ✅ 现代化的 CMS 架构

**恭喜！你已经将静态网站成功升级为 CMS 驱动的动态网站！** 🎉

有问题？查看 `CMS-SETUP.md` 获取详细信息。

Happy coding! 🚀

