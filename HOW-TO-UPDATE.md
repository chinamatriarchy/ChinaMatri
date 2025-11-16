# 📖 日常使用指南 - 两种更新方式

---

## 🎨 方式 1：更新前端网站视觉设计

**适用于**: 修改样式、布局、颜色、功能等

### 📋 工作流程

#### 1️⃣ 在本地修改代码

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 启动本地服务测试
./scripts/start-all.sh

# 访问本地网站预览
# http://localhost:8000
```

#### 2️⃣ 修改相应文件

**修改颜色和样式**:
```bash
# 编辑地图配置（颜色、时间线等）
vim src/js/mapConfig.js

# 编辑 HTML 页面
vim index.html
vim pages/map-cms.html

# 修改 CSS 样式
vim src/css/styles.css  # 如果有的话
```

**常见修改示例**:

##### A. 修改地图文化类型颜色

编辑 `src/js/mapConfig.js`:
```javascript
export const mapConfig = {
  periodColors: {
    yangshao: '#FF0000',    // 改成红色
    hemudu: '#00FF00',      // 改成绿色
    // ...
  }
};
```

##### B. 修改首页标题

编辑 `index.html`:
```html
<h1>母权数据库</h1>
<!-- 改成 -->
<h1>中国母系社会研究平台</h1>
```

##### C. 修改页面背景色

在 HTML 文件的 `<style>` 标签中:
```css
body {
  background-color: #f5f5f5; /* 改成您想要的颜色 */
}
```

#### 3️⃣ 本地测试

```bash
# 在浏览器中查看
# http://localhost:8000

# 刷新页面查看效果
# Cmd + R (普通刷新)
# Cmd + Shift + R (强制刷新)
```

#### 4️⃣ 提交并推送到 GitHub

```bash
# 查看修改了什么
git status

# 添加修改的文件
git add src/js/mapConfig.js
# 或添加所有修改
git add .

# 提交（写清楚改了什么）
git commit -m "style: 更新地图颜色配置"

# 推送到 GitHub
git push
```

#### 5️⃣ 自动部署（等待 2-3 分钟）

- Netlify 会自动检测到推送
- 自动构建和部署
- 网站自动更新 ✓

**查看部署进度**:
1. 访问 https://app.netlify.com
2. 点击 matrichina 站点
3. 查看 Deploys 标签

#### 6️⃣ 验证更新

访问线上网站查看效果:
```
https://matrichina.netlify.app
```

---

## 📝 方式 2：添加/更新一条信息（内容数据）

**适用于**: 添加考古遗址、女神信息、学者资料等

### 📋 工作流程

#### 1️⃣ 访问 Studio CMS

```
https://matrichina-studio.netlify.app
```

#### 2️⃣ 登录

- 点击登录按钮
- 用 Google 或 GitHub 账号登录

#### 3️⃣ 选择内容类型

点击左侧菜单，选择要添加的类型：

- 🗺️ **母系考古/时间线** - 考古遗址数据
- 👸 **女神谱系** - 女神神话信息
- 🏘️ **现存氏族** - 现存母系社会
- 🏛️ **古代母权社会** - 历史母权社会
- 📚 **相关论著** - 学术论文和书籍
- 👨‍🏫 **学者名录** - 研究学者信息

#### 4️⃣ 创建新条目

点击右上角 **"+ 创建"** 按钮

#### 5️⃣ 填写数据

**示例 A: 添加考古遗址**

点击 "母系考古/时间线" → "+ 创建"

填写必填字段（标 ✓ 的）:
```
地点 ✓: 陕西临潼姜寨
文化/遗址 ✓: 仰韶文化
年代 ✓: 公元前5000–4000年
社会与权力特征 ✓: 母系，村落自治，无人祭
```

填写可选字段:
```
开始年份（BCE）: 5000
结束年份（BCE）: 4000
描述: 仰韶文化的典型村落...
地图坐标: 
  纬度: 34.53
  经度: 109.35
```

**示例 B: 添加女神信息**

点击 "女神谱系" → "+ 创建"

填写:
```
名字 ✓: 女娲
时间: 上古时期
角色: 创世女神
故事: 女娲抟土造人，炼石补天...
神话出处: 《山海经》、《淮南子》
标签: 创世神话, 上古神话
```

**示例 C: 添加论著**

点击 "相关论著" → "+ 创建"

填写:
```
标题 ✓: 母系氏族社会研究
作者 ✓: 张三
著作年份 ✓: 2005
类别: 人类学
摘要: 对商朝晚期母系社会结构的考古学研究...
URL: http://example.com/paper1
```

#### 6️⃣ 发布

- 填写完成后，点击右下角 **"✅ Publish"** 按钮
- 数据立即保存到 Sanity 数据库

#### 7️⃣ 查看效果

访问前端网站:
```
https://matrichina.netlify.app
```

- 数据会**立即**显示在网站上
- 无需等待，实时同步 ✓

#### 8️⃣ 编辑已有数据

在 Studio 中:
1. 点击内容类型（如：母系考古/时间线）
2. 找到并点击要编辑的条目
3. 修改内容
4. 点击 **"✅ Publish"** 保存

---

## 🆚 两种方式对比

| 方面 | 修改视觉设计 | 添加内容数据 |
|------|------------|------------|
| **修改内容** | 样式、布局、功能 | 文字、图片、数据 |
| **使用工具** | 代码编辑器 | Studio CMS（浏览器）|
| **需要技能** | HTML/CSS/JS | 不需要编程 |
| **更新方式** | Git push → 自动部署 | 直接在 Studio 发布 |
| **生效时间** | 2-3 分钟 | 立即生效 |
| **谁可以做** | 开发者 | 任何团队成员 |
| **本地测试** | 需要 | 不需要 |

---

## 💡 实际应用场景

### 场景 1: 修改网站配色

**目标**: 把地图上仰韶文化的颜色从粉色改成红色

**步骤**:
```bash
# 1. 本地修改
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
vim src/js/mapConfig.js

# 修改
periodColors: {
  yangshao: '#FF0000',  // 改成红色
}

# 2. 测试
./scripts/start-all.sh
# 访问 http://localhost:8000 查看

# 3. 部署
git add src/js/mapConfig.js
git commit -m "style: 修改仰韶文化为红色"
git push

# 4. 等待 2-3 分钟，网站自动更新
```

### 场景 2: 添加新的考古遗址

**目标**: 添加河姆渡文化遗址信息

**步骤**:
1. 访问 https://matrichina-studio.netlify.app
2. 登录
3. 点击 "母系考古/时间线"
4. 点击 "+ 创建"
5. 填写：
   ```
   地点: 浙江余姚河姆渡
   文化/遗址: 河姆渡文化
   年代: 公元前5000-3300年
   社会与权力特征: 母系社会，稻作农业
   ```
6. 点击 "✅ Publish"
7. 立即在网站上查看 ✓

### 场景 3: 修改首页标题并添加内容

**两步走**:

**第一步 - 修改标题（视觉设计）**:
```bash
vim index.html
# 修改 <h1>母权数据库</h1>

git add index.html
git commit -m "feat: 更新首页标题"
git push
```

**第二步 - 添加女神信息（内容数据）**:
1. 在 Studio 添加女娲、西王母等女神信息
2. 立即发布

---

## 📂 常用文件位置

### 前端设计相关文件

```
ChinaMatri/
├── index.html              # 首页
├── pages/
│   ├── map-cms.html       # 地图页面
│   ├── goddess.html       # 女神页面
│   └── ...                # 其他页面
├── src/
│   ├── js/
│   │   ├── config.js      # Sanity 配置
│   │   └── mapConfig.js   # 地图配置（颜色等）
│   └── css/               # CSS 样式文件
└── images/                # 图片资源
```

### 内容数据（在 Studio 中管理）

不在代码中，存储在 Sanity Cloud：
- 考古遗址数据
- 女神信息
- 学者资料
- 论著信息
- 等等

---

## 🚀 快速命令

### 本地开发

```bash
# 启动本地服务
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
./scripts/start-all.sh

# 访问
# 前端: http://localhost:8000
# Studio: http://localhost:3333

# 停止服务
./scripts/stop-all.sh
```

### 部署到线上

```bash
# 查看修改
git status

# 添加所有修改
git add .

# 提交（写清楚改了什么）
git commit -m "描述您的修改"

# 推送到 GitHub（自动触发部署）
git push
```

---

## 🎯 建议工作流

### 团队分工

**开发者负责**:
- 修改网站设计和功能
- 更新配置文件
- 修复 Bug
- 使用 Git 推送

**内容编辑负责**:
- 在 Studio 添加数据
- 编辑文字和图片
- 管理内容分类
- 不需要懂代码

### 协作流程

1. **开发者**搭建好框架和样式
2. **内容团队**在 Studio 填充数据
3. **开发者**根据反馈优化功能
4. **内容团队**持续更新内容

---

## 💡 提示

### 修改视觉设计时

- ✅ 先在本地测试
- ✅ 确认无误后再推送
- ✅ 写清楚 commit message
- ✅ 一次改一个功能

### 添加内容数据时

- ✅ 填写完整信息
- ✅ 使用统一格式
- ✅ 记得点 Publish
- ✅ 可随时编辑

---

## 📞 需要帮助？

**修改设计遇到问题**:
- 查看 Git 历史：`git log`
- 回退更改：`git reset --hard HEAD^`

**Studio 使用问题**:
- 查看文档：`cat docs/setup/SCHEMA-GOOGLE-SHEETS-MAPPING.md`
- 检查 CORS 配置

---

*创建时间: 2025-11-09*

