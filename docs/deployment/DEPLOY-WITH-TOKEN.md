# 🚀 使用 Token 立即部署

## 请在您的终端执行以下命令：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 设置 token（将 YOUR_TOKEN_HERE 替换成您的实际 token）
export SANITY_AUTH_TOKEN=YOUR_TOKEN_HERE

# 部署
npx sanity deploy
```

## 📝 详细步骤：

### 1. 复制下面的命令到文本编辑器

```bash
export SANITY_AUTH_TOKEN=YOUR_TOKEN_HERE
```

### 2. 替换 YOUR_TOKEN_HERE 为您的实际 token

您的 token 看起来像这样：
```
sk开头的一长串字符...
```

替换后应该是：
```bash
export SANITY_AUTH_TOKEN=sk...您的token...
```

### 3. 在终端执行

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 粘贴您修改后的 export 命令
export SANITY_AUTH_TOKEN=sk...您的token...

# 部署
npx sanity deploy
```

### 4. 输入 Studio 名称

```
? Studio hostname (<value>.sanity.studio): chinamatri
```

建议输入：`chinamatri` 或 `chinamatri-studio`

### 5. 完成！

会显示：
```
✓ Success! Studio deployed to:
https://chinamatri.sanity.studio
```

---

## 🎯 完整命令（复制后替换 token）

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
export SANITY_AUTH_TOKEN=粘贴您的token
npx sanity deploy
```

**把这个复制到终端，记得替换 token！**





