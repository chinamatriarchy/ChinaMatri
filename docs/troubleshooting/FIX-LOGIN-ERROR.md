# 🔧 修复 Sanity 登录错误

## ❌ 错误信息

```
Unable to verify authorization request state
statusCode: 400
```

这是一个常见的 OAuth 认证问题，通常由浏览器 Cookie/缓存引起。

---

## ✅ 解决方案（按顺序尝试）

### 🎯 方案 1：使用隐身/无痕模式（最简单，推荐先试）

1. **打开隐身/无痕窗口**
   - **Chrome**: 按 `Cmd + Shift + N`
   - **Safari**: 按 `Cmd + Shift + N`
   - **Firefox**: 按 `Cmd + Shift + P`

2. **在隐身窗口访问**
   ```
   http://localhost:3333
   ```

3. **点击登录**
   - 选择 Google 登录
   - 使用您的新 Gmail 账号

4. **✅ 如果成功**
   - 说明是浏览器缓存问题
   - 继续用隐身模式，或清除缓存后用正常模式

---

### 🎯 方案 2：清除浏览器数据

#### Chrome 浏览器：

1. 按 `Cmd + Shift + Delete` 打开清除浏览数据
2. 选择时间范围：**过去 1 小时** 或 **全部时间**
3. 勾选以下选项：
   - ✅ Cookie 和其他网站数据
   - ✅ 缓存的图片和文件
4. 点击 **"清除数据"**
5. 关闭所有 Chrome 窗口
6. 重新打开 Chrome
7. 访问 http://localhost:3333

#### Safari 浏览器：

1. **Safari** → **偏好设置** → **隐私**
2. 点击 **"管理网站数据"**
3. 在搜索框输入 `sanity`
4. 选中所有 sanity 相关条目
5. 点击 **"移除"** 或 **"全部移除"**
6. 重启 Safari
7. 访问 http://localhost:3333

#### Firefox 浏览器：

1. 按 `Cmd + Shift + Delete`
2. 时间范围：**全部**
3. 勾选：
   - ✅ Cookie
   - ✅ 缓存
4. 点击 **"立即清除"**
5. 重启 Firefox
6. 访问 http://localhost:3333

---

### 🎯 方案 3：重启 Studio 服务

我已经为您重启了服务，等待 15 秒后访问：

```bash
# 查看 Studio 状态
lsof -ti:3333
```

如果需要手动重启：

```bash
# 停止 Studio
pkill -f "sanity dev"

# 清除缓存
rm -rf ~/.sanity

# 重新启动
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dev
```

---

### 🎯 方案 4：使用命令行登录

如果浏览器登录持续失败，使用命令行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 登出
npx sanity logout

# 重新登录
npx sanity login
```

这会打开浏览器进行授权，完成后在 Studio 中就自动登录了。

---

### 🎯 方案 5：检查浏览器设置

某些隐私设置可能阻止 OAuth 登录：

#### Chrome：

1. 设置 → 隐私和安全 → Cookie 和其他网站数据
2. 选择：**允许所有 Cookie**（临时）
3. 或添加例外：
   - `[*.]sanity.io`
   - `[*.]google.com`

#### Safari：

1. Safari → 偏好设置 → 隐私
2. 取消勾选 **"阻止所有 Cookie"**
3. 或临时关闭 **"防止跨网站跟踪"**

---

### 🎯 方案 6：换一个浏览器

如果当前浏览器持续出问题：

1. 尝试用另一个浏览器访问
2. 推荐顺序：
   - Chrome → Safari → Firefox → Edge

---

## 📝 现在请按以下步骤操作：

### 步骤 1：等待 Studio 启动（15秒）

我已经重启了 Studio 服务，请等待约 15 秒。

### 步骤 2：打开隐身模式

- **Chrome**: `Cmd + Shift + N`
- **Safari**: `Cmd + Shift + N`

### 步骤 3：在隐身窗口访问

```
http://localhost:3333
```

### 步骤 4：登录

- 点击 **"Sign in with Google"**
- 选择您的**新 Gmail 账号**
- 授权 Sanity

### 步骤 5：测试

如果成功登录，您应该能看到管理界面！

---

## 🔍 为什么会出现这个错误？

这个错误通常是因为：

1. **浏览器缓存了旧的认证状态**
   - 您之前用旧账号登录过
   - 浏览器保存了旧的 Cookie 和 Session

2. **认证状态过期**
   - OAuth 的 state 参数有时间限制
   - 如果登录页面打开太久，state 会过期

3. **Cookie 被阻止**
   - 浏览器的隐私设置过于严格
   - 阻止了 Sanity 的第三方 Cookie

4. **网络问题**
   - 回调请求被中断
   - 重定向失败

---

## ✅ 验证是否修复

登录成功后，您应该看到：

```
┌────────────────────────────────┐
│  My Knowledge Base             │
├──────────┬─────────────────────┤
│ 🗺️ 母系  │  内容列表            │
│   考古   │                     │
│ ⭐ 女神  │  [+ 创建新条目]      │
│ 👤 学者  │                     │
└──────────┴─────────────────────┘
```

在右上角应该显示您的新 Gmail 账号头像！

---

## 🆘 如果还是不行

### 最后的方法：使用 CLI 登录

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 完全重置
npx sanity logout
rm -rf ~/.sanity

# 重新登录
npx sanity login
```

这会：
1. 打开浏览器授权页面
2. 用新 Gmail 登录
3. 授权完成后，CLI 会保存凭证
4. 刷新 Studio，自动登录

---

## 💡 临时解决方案

如果浏览器登录持续有问题，您可以：

### 使用 CLI 管理数据

虽然没有可视化界面，但可以用命令行：

```bash
# 查看所有文档
npx sanity documents get

# 创建文档
npx sanity documents create

# 查询数据
npx sanity exec script.js
```

### 部署 Studio 到线上

```bash
npx sanity deploy
```

部署后通过线上地址访问，可能不会有这个问题。

---

## 📞 需要进一步帮助？

如果以上方法都不行，请告诉我：

1. 您使用的是什么浏览器？版本是？
2. 尝试了哪些方案？
3. 是否有其他错误信息？

我会帮您进一步诊断！

---

**现在请等待 15 秒，然后在隐身模式中访问 http://localhost:3333** 🚀


