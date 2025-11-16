# 🔧 完整部署指南 - 项目 8i1xhvuq

## 📝 当前状态
- ✅ 项目 ID: 8i1xhvuq（属于您）
- ✅ 本地 Studio 运行正常 (localhost:3333)
- ❌ 需要部署到云端
- ❌ 需要登录认证

---

## 🚀 立即操作步骤

### 步骤 1: 在终端登录（需要浏览器）

**在终端运行：**
```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity login
```

**会发生什么：**
1. 终端显示 "Fetching providers..."（正常！）
2. 浏览器自动打开授权页面
3. **如果浏览器没打开**，手动访问：
   ```
   https://api.sanity.io/v1/auth/login/cli
   ```

**在浏览器中：**
1. 选择登录方式（GitHub/Google/Email）
2. 登录您的 Sanity 账户
3. 点击 **"Authorize"** 授权 CLI
4. 看到 "Success! You are now authenticated."
5. **关闭浏览器标签页**
6. **回到终端**

**终端会显示：**
```
✓ Login successful
```

---

### 步骤 2: 立即部署

**在终端运行：**
```bash
npx sanity deploy
```

**会提示输入名称：**
```
? Studio hostname (<value>.sanity.studio): 
```

**输入（建议）：**
```
chinamatri
```

**或者其他名称：**
- chinamatri-studio
- matriarchy-cms
- 任何您喜欢的英文名称

**完成！会显示：**
```
✓ Checking configuration files...
✓ Building Sanity
✓ Deploying Sanity Studio

Success! Studio deployed to:
https://chinamatri.sanity.studio

You can now visit your studio at:
https://chinamatri.sanity.studio
```

---

## 🔐 配置 CORS（部署后立即做）

### 方法 1: 网页配置（推荐）

1. 访问：https://www.sanity.io/manage/personal/project/8i1xhvuq/api

2. 找到 **"CORS Origins"** 部分

3. 点击 **"Add CORS origin"**

4. 添加以下 URL：
   ```
   https://chinamatri.sanity.studio
   ```
   勾选 ✓ Allow credentials

5. 再添加：
   ```
   http://localhost:3333
   ```
   勾选 ✓ Allow credentials

6. 再添加：
   ```
   http://localhost:8000
   ```
   勾选 ✓ Allow credentials

7. 点击 **"Save"**

### 方法 2: 命令行配置

```bash
# 添加已部署的 Studio URL
npx sanity cors add https://chinamatri.sanity.studio --credentials

# 添加本地开发 URL
npx sanity cors add http://localhost:3333 --credentials
npx sanity cors add http://localhost:8000 --credentials
```

---

## 👥 邀请团队成员

### 步骤 1: 访问项目管理
```
https://www.sanity.io/manage/personal/project/8i1xhvuq
```

### 步骤 2: 添加成员
1. 点击左侧菜单 **"Team"** 或 **"Members"**
2. 点击 **"Invite members"** 按钮
3. 输入团队成员的邮箱地址
4. 选择角色：
   - **Editor** ⭐ 推荐（可以编辑和发布内容）
   - Administrator（完全控制）
   - Viewer（只能查看）
5. 点击 **"Send invitation"**

### 步骤 3: 通知团队成员
发送给他们：

```
Hi，

母权文化知识库的 CMS 已上线！

📝 管理地址：
https://chinamatri.sanity.studio
（请使用邀请邮件中的链接注册/登录）

🌐 网站预览：
http://192.168.2.65:8000

可以开始上传内容了！
```

---

## 🎯 完整命令列表（复制粘贴）

```bash
# 1. 进入 studio 目录
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 2. 登录（会打开浏览器）
npx sanity login
# 等待浏览器授权完成

# 3. 部署
npx sanity deploy
# 输入: chinamatri

# 4. 配置 CORS
npx sanity cors add https://chinamatri.sanity.studio --credentials

# 5. 完成！
echo "部署成功！访问 https://chinamatri.sanity.studio"
```

---

## 🆘 常见问题

### Q1: `sanity login` 一直转圈
**原因：** 在等待浏览器授权  
**解决：** 
1. 检查是否有浏览器窗口打开
2. 如果没有，手动访问：https://api.sanity.io/v1/auth/login/cli
3. 完成授权后回到终端

### Q2: "Studio hostname already taken"
**解决：** 换个名称
- chinamatri-kb
- chinamatri-cms  
- matriarchy-china

### Q3: 部署后团队成员看不到内容
**检查：**
- [ ] 已邀请成员
- [ ] 成员已接受邀请
- [ ] 成员已登录
- [ ] CORS 已配置

### Q4: 在 sanity.io 看不到项目
**可能原因：**
- 登录了不同的账户
- 项目在其他 organization 下

**检查：**
1. 访问：https://www.sanity.io/manage
2. 检查右上角账户
3. 查看是否有多个 organization

---

## 📞 下一步

1. **现在**：在终端运行 `npx sanity login`
2. **等待**：浏览器打开并授权
3. **然后**：运行 `npx sanity deploy`
4. **完成**：把 URL 告诉我，我帮您验证配置

---

## 💡 如果一直有问题

### 备选方案：使用 Sanity Manage 手动部署

1. 访问：https://www.sanity.io/manage/personal/project/8i1xhvuq
2. 点击 **"Studio"** 或 **"Deploys"**
3. 尝试通过网页界面部署

---

**现在请在终端尝试登录，让浏览器完成授权！** 🚀





