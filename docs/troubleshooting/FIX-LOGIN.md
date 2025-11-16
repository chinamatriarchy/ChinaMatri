## 🔧 解决登录问题 - 替代方案

如果 `sanity login` 一直卡住或失败，请尝试以下方法：

### **方案 1：直接部署（推荐）**

直接运行部署命令，它会自动检测登录状态：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity deploy
```

如果需要登录，它会自动打开浏览器。

---

### **方案 2：使用环境变量**

如果您已经在 https://sanity.io 登录过，可以生成一个 token：

1. 访问 https://sanity.io/manage
2. 选择您的项目
3. 点击 **Settings** → **API** → **Tokens**
4. 点击 **Add API token**
5. Name: `Deploy Token`
6. Permissions: **Editor**
7. 复制生成的 token

然后运行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
SANITY_AUTH_TOKEN=your-token-here npx sanity deploy
```

（将 `your-token-here` 替换为实际的 token）

---

### **方案 3：网页直接构建**

使用 Sanity 的网页界面部署：

1. 构建静态文件：
```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity build
```

2. 访问 https://sanity.io/manage
3. 选择您的项目
4. 上传 `dist/` 文件夹

---

### **方案 4：检查是否已经部署**

访问 https://sanity.io/manage

查看您的项目是否已经有部署的 Studio URL。

---

## 💡 最简单的方法

**直接在终端运行：**

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity deploy
```

**不要管登录提示**，直接试试看能不能部署。如果真的需要登录，它会给出明确的提示并打开浏览器。

---

## 🆘 如果还是不行

请在终端运行这个命令，然后把输出发给我：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
ls -la ~/.sanity
cat ~/.sanity/config 2>/dev/null || echo "没有配置文件"
```


