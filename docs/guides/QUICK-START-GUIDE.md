# 🚀 快速启动指南

## 一键启动（推荐）

打开终端，运行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
./start-all.sh
```

这个脚本会自动：
- ✅ 启动前端网站服务器（端口 8000）
- ✅ 启动 Sanity Studio 管理后台（端口 3333）
- ✅ 自动打开浏览器到管理中心页面

## 停止服务

```bash
./stop-all.sh
```

## 手动启动（分步）

### 1. 启动 Sanity Studio（管理后台）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dev
```

访问：http://localhost:3333

### 2. 启动前端网站

打开新的终端窗口：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
python3 -m http.server 8000
```

访问：http://localhost:8000

## 📱 访问地址

启动后可访问以下页面：

| 页面 | 地址 | 说明 |
|------|------|------|
| 🎨 **管理中心** | http://localhost:8000/START-HERE.html | 一站式管理入口 |
| 🔧 **Sanity Studio** | http://localhost:3333 | 数据管理后台 |
| 🏠 **网站首页** | http://localhost:8000 | 前端首页 |
| ⏱️ **时间线** | http://localhost:8000/timeline.html | 考古时间线 |
| 🗺️ **地图** | http://localhost:8000/map-cms.html | 遗址地图 |
| ⭐ **女神谱系** | http://localhost:8000/goddess-cms.html | 女神列表 |
| 👤 **学者名录** | http://localhost:8000/scholars.html | 学者信息 |

## 📝 如何使用

### Step 1: 打开管理后台

访问 http://localhost:3333，用 Google 或 GitHub 账号登录

### Step 2: 添加数据

1. 点击左侧 **"🗺️ 母系考古/时间线"**
2. 点击右上角 **"➕ 创建新条目"**
3. 填写字段：
   - **地点**：例如 `陕西临潼姜寨`
   - **文化/遗址**：例如 `仰韶文化`
   - **年代**：例如 `公元前5000–4000年`
   - **社会与权力特征**：例如 `母系，村落自治，无人祭`
4. 点击右上角 **"✅ Publish"** 发布

### Step 3: 查看效果

刷新前端网站，立即看到新添加的数据！

## 📊 数据结构（来自您的 Google Sheets）

您的数据有四个核心字段：

1. **地点** - 遗址位置
2. **文化/遗址** - 文化类型名称
3. **年代** - 时间范围
4. **社会与权力特征** - 社会特征描述

示例数据：

| 地点 | 文化/遗址 | 年代 | 社会与权力特征 |
|------|----------|------|---------------|
| 陕西临潼姜寨 | 仰韶文化 | 公元前5000–4000年 | 母系，村落自治，无人祭 |
| 宝鸡北首岭 | 仰韶晚期 | 公元前4800年左右 | 中箭与斩首，冲突萌芽 |
| 山西襄汾陶寺 | 龙山文化 | 公元前2500–1900年 | 宫殿、人殉、王级墓，父权 |

## 📚 详细文档

- **完整使用指南**：[HOW-TO-USE.md](HOW-TO-USE.md)
- **快速开始**：[QUICKSTART.md](QUICKSTART.md)
- **修改数据结构**：[SCHEMA-MODIFICATION-GUIDE.md](SCHEMA-MODIFICATION-GUIDE.md)
- **部署上线**：[DEPLOYMENT.md](DEPLOYMENT.md)

## 🆘 遇到问题？

### 端口被占用

```bash
# 停止所有服务
./stop-all.sh

# 或手动停止
pkill -f "sanity dev"
pkill -f "http.server 8000"
```

### Studio 无法启动

```bash
cd studio
npm install
npx sanity dev
```

### 数据不显示

1. 确认数据已在 Studio 中 **Publish**（而不只是 Save）
2. 刷新浏览器（Cmd + R）
3. 清除缓存（Cmd + Shift + R）
4. 查看浏览器控制台是否有错误（F12）

## 💡 快速命令参考

```bash
# 一键启动所有服务
./start-all.sh

# 停止所有服务
./stop-all.sh

# 只启动 Studio
cd studio && npx sanity dev

# 只启动前端
python3 -m http.server 8000

# 数据备份
cd studio && npx sanity dataset export production backup.tar.gz

# 部署 Studio 到线上
cd studio && npx sanity deploy
```

## 🎯 下一步

1. ✅ 运行 `./start-all.sh` 启动服务
2. ✅ 访问 http://localhost:3333 登录 Studio
3. ✅ 添加第一条考古遗址数据
4. ✅ 查看前端效果
5. ✅ 阅读 HOW-TO-USE.md 了解更多功能

**祝您使用愉快！** 🎉


