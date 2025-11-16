# 🔐 更换 Sanity 账号完整指南

## 📋 目录
1. [方案选择](#方案选择)
2. [方案 A：添加新账号到现有项目（推荐）](#方案-a-推荐)
3. [方案 B：创建新项目](#方案-b)
4. [方案 C：转移项目所有权](#方案-c)

---

## 🎯 方案选择

### ✅ 方案 A：添加新账号到现有项目（**推荐**）
- **优点**：保留所有数据，两个账号都能管理
- **缺点**：需要用原账号邀请新账号
- **适合**：您可以访问原账号

### 🆕 方案 B：创建新项目
- **优点**：完全独立，新账号完全控制
- **缺点**：需要重新录入数据，需要更新网站配置
- **适合**：原账号无法访问，或想全新开始

### 🔄 方案 C：转移项目所有权
- **优点**：保留数据，新账号成为唯一管理员
- **缺点**：原账号失去访问权限
- **适合**：完全替换账号

---

## 方案 A：添加新账号到现有项目（推荐）

### 步骤 1：登出浏览器中的当前账号

#### 方法 1：在 Studio 中登出
1. 访问 http://localhost:3333
2. 点击右上角的**用户图标/头像**
3. 点击 **"Sign out"**

#### 方法 2：清除浏览器 Cookie
**Chrome:**
1. 右上角 ⋮ → 设置 → 隐私和安全
2. Cookie 和其他网站数据 → 查看所有网站数据
3. 搜索 "sanity.io"
4. 点击 🗑️ 删除

**Safari:**
1. Safari → 偏好设置 → 隐私
2. 管理网站数据
3. 搜索 "sanity"
4. 移除

### 步骤 2：用原账号邀请新账号

#### 方法 A：通过网页邀请（最简单）

1. 用**原账号**登录 https://sanity.io/manage
2. 找到并点击您的项目（**My Knowledge Base**，Project ID: `8i1xhvuq`）
3. 点击左侧菜单的 **"Team"** 或 **"成员"**
4. 点击 **"Invite member"** 或 **"邀请成员"**
5. 输入您的**新 Gmail 地址**
6. 选择角色：**Administrator**（管理员）
7. 点击 **"Send invitation"**

#### 方法 B：通过命令行邀请

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 确保用原账号登录
npx sanity login

# 列出项目（确认正确的项目）
npx sanity projects list

# 邀请新成员
npx sanity users invite

# 按提示输入：
# - Email: 您的新 Gmail 地址
# - Role: administrator
```

### 步骤 3：接受邀请

1. 检查新 Gmail 的收件箱
2. 找到来自 Sanity 的邀请邮件
3. 点击邮件中的 **"Accept invitation"** 链接
4. 用新 Gmail 账号登录授权

### 步骤 4：用新账号登录 Studio

1. 访问 http://localhost:3333
2. 点击 **"Sign in with Google"**
3. 选择您的**新 Gmail 账号**
4. 授权 Sanity 访问
5. ✅ 完成！您现在可以用新账号管理项目了

### 步骤 5：移除原账号（可选）

如果您不再需要原账号：
1. 用新账号登录 https://sanity.io/manage
2. 进入项目 → Team
3. 找到原账号，点击 **"Remove"**

---

## 方案 B：创建新项目

⚠️ **警告**：这会创建全新项目，原有数据不会自动迁移！

### 步骤 1：登出当前账号

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity logout
```

### 步骤 2：用新账号登录

```bash
npx sanity login
```
- 浏览器会打开
- 选择您的**新 Gmail 账号**
- 授权

### 步骤 3：创建新项目

```bash
npx sanity init --reconfigure
```

按提示操作：
- **Project name**: `MatriChina`（或您喜欢的名称）
- **Use default dataset?**: Yes
- **Dataset name**: `production`

### 步骤 4：获取新的 Project ID

```bash
npx sanity projects list
```

会显示类似：
```
┌─────────────┬──────────────────────┬────────────────┐
│ Project ID  │ Project Name         │ Organization   │
├─────────────┼──────────────────────┼────────────────┤
│ abc123xyz   │ MatriChina           │ Personal       │
└─────────────┴──────────────────────┴────────────────┘
```

记下新的 **Project ID**（例如 `abc123xyz`）

### 步骤 5：更新配置文件

需要在以下文件中替换 `projectId`:

#### 1. `studio/sanity.config.js`

```javascript
projectId: 'abc123xyz',  // 替换为新的 Project ID
dataset: 'production',
```

#### 2. `src/js/sanityClient.js`

```javascript
const client = sanityClient({
  projectId: 'abc123xyz',  // 替换
  dataset: 'production',
  // ...
});
```

#### 3. `src/js/sanity-browser.js`

```javascript
const client = window.sanityClient({
  projectId: 'abc123xyz',  // 替换
  dataset: 'production',
  // ...
});
```

### 步骤 6：配置 CORS

1. 访问 https://sanity.io/manage
2. 选择您的新项目
3. 进入 **API** → **CORS Origins**
4. 点击 **"Add CORS origin"**
5. 添加以下网址：
   - `http://localhost:8000`
   - `http://localhost:3333`
   - `https://matrichina.netlify.app`
6. 勾选 **"Allow credentials"**

### 步骤 7：重新部署网站

如果网站托管在 Netlify：
1. 提交并推送代码到 Git
2. Netlify 会自动重新部署

### 步骤 8：迁移旧数据（可选）

如果您想从旧项目导入数据：

```bash
# 从旧项目导出数据
# 需要先切换回原账号
npx sanity logout
npx sanity login  # 用原账号登录
npx sanity dataset export production old-data.tar.gz --project 8i1xhvuq

# 切换到新账号
npx sanity logout
npx sanity login  # 用新账号登录

# 导入到新项目
npx sanity dataset import old-data.tar.gz production
```

---

## 方案 C：转移项目所有权

如果您想让新账号成为项目的唯一所有者：

### 步骤 1：添加新账号（参考方案 A）

先按照方案 A 的步骤添加新账号为管理员

### 步骤 2：转移所有权

1. 用**原账号**登录 https://sanity.io/manage
2. 选择项目 → **Settings** → **Transfer project**
3. 输入**新 Gmail 地址**
4. 确认转移

### 步骤 3：接受转移

1. 新 Gmail 收到邮件
2. 点击 **"Accept transfer"**
3. ✅ 项目所有权转移完成

⚠️ **注意**：转移后，原账号将失去访问权限

---

## 🎯 推荐方案

### 如果您可以访问原账号：
👉 **使用方案 A**（添加新账号到现有项目）

**优点：**
- ✅ 保留所有数据
- ✅ 操作最简单
- ✅ 两个账号都能用（可以稍后移除原账号）
- ✅ 无需修改配置

### 如果无法访问原账号：
👉 **使用方案 B**（创建新项目）

**注意：**
- ⚠️ 需要重新录入数据
- ⚠️ 需要更新配置文件
- ⚠️ 需要重新部署网站

---

## 📝 快速操作指南

### 最简单的方法（方案 A）：

```bash
# 1. 用原账号邀请新账号
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity login  # 用原账号登录
npx sanity users invite  # 输入新 Gmail

# 2. 新账号接受邮件邀请

# 3. Studio 中登出再登录
# 访问 http://localhost:3333
# 右上角 → Sign out
# 然后用新 Gmail 登录

# ✅ 完成！
```

---

## 🆘 常见问题

### Q: 我忘记了原账号密码怎么办？

**A:** 
- Google 账号：访问 https://accounts.google.com/signin/recovery
- GitHub 账号：访问 https://github.com/password_reset

### Q: 新账号收不到邀请邮件？

**A:** 
1. 检查垃圾邮件文件夹
2. 等待 5-10 分钟
3. 在 Sanity 管理后台重新发送邀请

### Q: 可以同时用两个账号吗？

**A:** 
可以！方案 A 允许多个账号管理同一项目。您可以：
- 在不同浏览器使用不同账号
- 或在同一浏览器切换账号

### Q: 切换账号会丢失数据吗？

**A:** 
- **方案 A**: ✅ 不会，数据完全保留
- **方案 B**: ⚠️ 需要手动迁移数据
- **方案 C**: ✅ 不会，只是转移所有权

### Q: 如何确认当前登录的是哪个账号？

**A:**
```bash
npx sanity whoami
```

或者访问 Studio，右上角会显示当前登录的用户头像

---

## 💡 建议

1. **备份数据**（重要！）
   ```bash
   cd studio
   npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz
   ```

2. **使用方案 A**
   - 最安全
   - 最简单
   - 保留所有数据

3. **测试登录**
   - 在私密/隐身窗口测试新账号
   - 确认有管理权限后再移除原账号

4. **文档记录**
   - 记下新账号的 Gmail 地址
   - 记下项目 ID
   - 保存备份文件

---

**需要我帮您执行具体步骤吗？请告诉我您想用哪个方案！** 🔐


