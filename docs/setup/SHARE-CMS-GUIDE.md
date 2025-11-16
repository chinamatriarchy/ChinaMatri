# 🎨 分享 Sanity Studio（CMS 界面）给团队

## 🎯 两种方式

### 方案 A: 云端部署（推荐）⭐

#### 为什么推荐？
- ✅ 团队任何地方都能访问
- ✅ 不需要您的电脑一直开机
- ✅ 完全免费
- ✅ 自动 HTTPS 安全连接
- ✅ 全球 CDN 加速

#### 部署步骤：

**1. 登录 Sanity（如果还没登录）**
```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity login
```
会打开浏览器让您登录 Sanity 账户

**2. 部署 Studio**
```bash
npx sanity deploy
```

**3. 输入 Studio 名称**
```
? Studio hostname (<value>.sanity.studio): 
输入: chinamatri
```

**4. 完成！得到 URL**
```
✅ Success! Studio deployed to:
https://chinamatri.sanity.studio
```

**5. 分享给团队**
```
🎨 CMS 管理界面
https://chinamatri.sanity.studio

团队成员需要：
1. 被您邀请到项目（见下方）
2. 登录 Sanity 账户
3. 即可编辑内容
```

---

### 方案 B: 本地网络分享（临时演示）

#### 适合场景：
- 快速演示给团队看
- 团队在同一办公室/网络
- 不需要编辑权限，只是看看界面

#### 步骤：

**1. Studio 已经在运行**
```
当前运行在: http://localhost:3333
```

**2. 获取您的 IP**
```
您的 IP: 192.168.2.65 或 10.21.27.108
```

**3. 分享给团队（同一网络）**
```
http://192.168.2.65:3333
或
http://10.21.27.108:3333
```

**限制：**
- ❌ 只有同一网络的人能访问
- ❌ 您的电脑必须开机
- ❌ 团队成员仍需登录 Sanity 才能编辑

---

## 👥 邀请团队成员（重要！）

无论使用哪种方案，团队成员都需要被邀请到项目才能编辑内容。

### 步骤 1: 访问项目管理页面
```
https://www.sanity.io/manage/personal/project/8i1xhvuq
```

### 步骤 2: 邀请成员
1. 点击左侧 **"Team"** 或 **"Members"**
2. 点击 **"Invite members"**
3. 输入团队成员的邮箱地址
4. 选择权限：
   ```
   Administrator - 完全控制
   Editor - 可以编辑和发布内容 ⭐ 推荐
   Viewer - 只能查看
   ```
5. 点击 **"Send invitation"**

### 步骤 3: 团队成员操作
1. 收到邀请邮件
2. 点击邮件中的链接
3. 创建/登录 Sanity 账户
4. 接受邀请
5. 访问 Studio URL
6. 开始编辑内容！

---

## 📋 完整演示流程

### 给团队演示 CMS 界面

**仅查看界面（不需要编辑）**
```
方式 1: 本地分享
http://192.168.2.65:3333

方式 2: 屏幕共享
您打开 http://localhost:3333
通过 Zoom/腾讯会议分享屏幕
```

**让团队试用编辑功能**
```
1. 部署 Studio 到云端
   npx sanity deploy → chinamatri.sanity.studio

2. 邀请团队成员
   https://www.sanity.io/manage → Team → Invite

3. 分享链接
   https://chinamatri.sanity.studio

4. 团队登录后可以编辑
```

---

## 🎯 权限说明

### Editor（编辑者）- 推荐给内容团队
- ✅ 创建新内容
- ✅ 编辑现有内容
- ✅ 发布/取消发布
- ✅ 上传图片
- ❌ 不能修改 schema
- ❌ 不能邀请新成员
- ❌ 不能修改项目设置

### Administrator（管理员）- 给项目负责人
- ✅ Editor 的所有权限
- ✅ 邀请/移除成员
- ✅ 修改项目设置
- ✅ 管理 API tokens
- ✅ 查看使用统计

### Viewer（查看者）- 给审核人员
- ✅ 查看所有内容
- ❌ 不能编辑
- ❌ 不能发布

---

## 💰 成本

### Sanity 免费计划包括：
- ✅ **3 个用户**（够用）
- ✅ **无限文档**
- ✅ **Studio 托管**（免费）
- ✅ **10GB 带宽/月**
- ✅ **500,000 API 请求/月**

### 如果需要更多用户
- **Growth 计划**：$99/月，无限用户
- 或者：使用多个免费项目

---

## 🎨 Studio 界面预览

团队成员登录后会看到：

```
┌─────────────────────────────────────┐
│  母权文化知识库 CMS                    │
├─────────────────────────────────────┤
│                                     │
│  📋 内容类型：                        │
│    ⭐ Goddess (女神)                 │
│    🗺️ Archaeological Site (遗址)    │
│    👤 Scholar (学者)                 │
│    📚 Publication (论著)             │
│    🏘️ Community (氏族)              │
│                                     │
│  每个类型点击后可以：                  │
│    - 查看现有内容                     │
│    - 创建新内容                       │
│    - 编辑/删除内容                    │
│    - 发布/取消发布                    │
│                                     │
└─────────────────────────────────────┘
```

---

## ⚡ 快速决策

### 今天就想演示？
```bash
# 方案 B: 本地分享
已经在运行！
分享: http://192.168.2.65:3333
```

### 想要正式使用？
```bash
# 方案 A: 云端部署
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity login
npx sanity deploy
```

---

## 🆘 常见问题

**Q: 团队成员看不到 Studio？**
A: 确保：
1. 他们被邀请到项目
2. 已登录 Sanity 账户
3. URL 正确

**Q: 免费计划够用吗？**
A: 够！3 个用户，无限内容。

**Q: 可以自定义域名吗？**
A: 免费计划使用 `xxx.sanity.studio`，付费计划可以自定义。

**Q: 部署后如何更新 Studio？**
A: 修改代码后，再次运行 `npx sanity deploy`

**Q: 团队成员需要安装什么吗？**
A: 不需要！只需要浏览器和 Sanity 账户。

---

## 📞 下一步

告诉我您想要：

1️⃣ **立即部署到云端**（我帮您执行 sanity login 和 deploy）
2️⃣ **先用本地分享演示**（已经可用）
3️⃣ **帮我邀请团队成员**（指导您操作）





