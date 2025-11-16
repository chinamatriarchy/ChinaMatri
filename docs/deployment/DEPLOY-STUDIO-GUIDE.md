# 🚀 部署 Sanity Studio 到线上 - 完整指南

## 🎯 目标

将 Sanity Studio 部署到线上，让团队成员可以通过浏览器直接访问管理后台，无需在本地运行。

---

## ✅ 部署前准备

### 1. 确认登录状态

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity whoami
```

如果显示您的邮箱，说明已登录 ✅  
如果显示未登录，运行：

```bash
npx sanity login
```

---

## 🚀 部署步骤

### 步骤 1：确保 Studio 可以正常运行

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

# 测试本地运行
npx sanity dev
```

访问 http://localhost:3333 确认一切正常。

### 步骤 2：停止本地 Studio

```bash
# 按 Ctrl+C 停止
# 或在新终端窗口运行：
pkill -f "sanity dev"
```

### 步骤 3：部署到线上

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity deploy
```

系统会询问：

#### 问题 1：Studio hostname（域名）

```
Studio hostname (<value>.sanity.studio):
```

**输入示例**：`matrichina`

这将创建：`https://matrichina.sanity.studio`

**建议**：
- 使用项目名称
- 小写字母和连字符
- 简短易记

#### 问题 2：确认部署

```
Deploy Sanity Studio to https://matrichina.sanity.studio? (Y/n)
```

**输入**：`Y` 或直接按 Enter

### 步骤 4：等待部署完成

部署通常需要 1-2 分钟，会显示：

```
✔ Deploying to Sanity
✔ Deployed to https://matrichina.sanity.studio
```

---

## 🎉 部署成功！

### 访问您的线上 Studio

```
https://matrichina.sanity.studio
```
（将 `matrichina` 替换为您实际使用的域名）

---

## 👥 邀请团队成员

### 方法 1：通过网页管理（推荐）

#### 1. 访问 Sanity 管理后台
```
https://sanity.io/manage
```

#### 2. 选择您的项目
找到 **"My Knowledge Base"** 或您的项目名称

#### 3. 进入 Team 标签
点击左侧菜单的 **"Team"** 或 **"成员"**

#### 4. 邀请成员
- 点击 **"Invite member"** 或 **"邀请成员"**
- 输入成员的**邮箱地址**
- 选择角色：
  - **Administrator** - 完全管理权限（推荐给核心团队）
  - **Editor** - 可以编辑内容
  - **Viewer** - 只能查看

#### 5. 发送邀请
- 点击 **"Send invitation"**
- 成员会收到邮件邀请
- 点击邮件中的链接接受邀请

### 方法 2：通过命令行

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity users invite

# 按提示输入：
# Email: member@example.com
# Role: administrator
```

---

## 📝 团队成员使用流程

### 新成员第一次使用

#### 1. 接受邀请
- 检查邮箱（包括垃圾邮件）
- 点击邮件中的 **"Accept invitation"** 链接
- 使用 Google 或 GitHub 账号授权

#### 2. 访问 Studio
直接访问：
```
https://matrichina.sanity.studio
```

#### 3. 登录
- 点击 **"Sign in with Google"** 或 **"Sign in with GitHub"**
- 使用邀请时填写的邮箱对应的账号登录
- 授权 Sanity 访问

#### 4. 开始使用
登录后就可以：
- ✅ 查看所有内容
- ✅ 添加新内容
- ✅ 编辑现有内容
- ✅ 发布内容到网站

---

## 🔐 权限说明

### Administrator（管理员）
- ✅ 完全管理权限
- ✅ 创建、编辑、删除内容
- ✅ 邀请和移除成员
- ✅ 修改项目设置
- ✅ 部署 Studio

### Editor（编辑者）
- ✅ 创建、编辑、删除内容
- ✅ 发布内容
- ❌ 不能管理成员
- ❌ 不能修改项目设置

### Viewer（查看者）
- ✅ 查看所有内容
- ❌ 不能编辑或发布
- 适合审核人员

**推荐**：给核心团队成员 **Administrator** 权限

---

## 📊 使用场景

### 场景 1：团队协作
```
成员 A 在办公室 → 访问 matrichina.sanity.studio → 添加遗址数据
成员 B 在家中    → 访问 matrichina.sanity.studio → 审核并发布
成员 C 在路上    → 用手机访问 → 查看数据
```

### 场景 2：数据录入
```
研究员提供数据 Excel
数据录入员访问 Studio
逐条录入到系统
主管审核后发布
```

### 场景 3：远程管理
```
不需要安装任何软件
不需要运行本地服务
只需要浏览器和网络
随时随地访问
```

---

## 🌐 配置 CORS（重要！）

部署后需要确保 CORS 配置正确，否则网站无法读取数据。

### 检查 CORS 设置

1. 访问 https://sanity.io/manage
2. 选择您的项目
3. 点击 **API** → **CORS Origins**
4. 确认包含以下地址：

```
✅ http://localhost:3333 (允许凭证)
✅ http://localhost:8000 (允许凭证)
✅ https://matrichina.netlify.app (允许凭证)
✅ https://matrichina.sanity.studio (允许凭证)
```

### 如果缺少，添加：

1. 点击 **"Add CORS origin"**
2. 输入地址
3. 勾选 **"Allow credentials"**
4. 点击 **Save**

---

## 🔄 更新已部署的 Studio

如果您修改了 Studio 配置（如添加新字段），需要重新部署：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity deploy
```

不需要确认，会直接更新到同一个地址。

---

## 📱 移动端访问

线上 Studio 在移动设备上也能使用：
- ✅ 响应式设计
- ✅ 触摸操作
- ✅ 拍照上传图片
- ⚠️ 建议用平板或电脑获得更好体验

---

## 💡 最佳实践

### 1. 定期备份数据

即使在线上运行，也建议定期备份：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity dataset export production backup-$(date +%Y%m%d).tar.gz
```

### 2. 明确分工

为不同成员分配不同任务：
- **数据录入员**：添加新内容
- **审核员**：检查并发布内容
- **管理员**：管理成员和设置

### 3. 使用草稿功能

- 先 **Save**（保存为草稿）
- 检查无误后再 **Publish**（发布）
- 避免错误数据上线

### 4. 添加内部备注

使用 "内部备注" 字段记录：
- 数据来源
- 待完善的内容
- 需要审核的地方

### 5. 定期沟通

建立团队群组，讨论：
- 数据标准
- 录入规范
- 遇到的问题

---

## 🆘 常见问题

### Q1: 团队成员无法访问？

**检查清单**：
- ✅ 是否发送了邀请？
- ✅ 成员是否点击了邮件中的链接？
- ✅ 登录时使用的邮箱是否正确？
- ✅ 是否有网络连接？

### Q2: 部署失败怎么办？

**解决方案**：
```bash
# 1. 确认登录
npx sanity login

# 2. 重新部署
npx sanity deploy

# 3. 如果还是失败，检查网络连接
```

### Q3: 如何更改 Studio 域名？

**答**：重新部署并输入新域名：
```bash
npx sanity deploy
# 输入新的 hostname
```

旧域名会失效。

### Q4: 可以部署到自己的服务器吗？

**答**：可以，但需要额外配置：
```bash
# 构建静态文件
npx sanity build

# 将 dist/ 目录上传到您的服务器
```

不推荐，使用 Sanity 托管更简单。

### Q5: Studio 访问速度慢？

**原因**：
- Sanity 服务器在国外
- 网络延迟

**解决方案**：
- 使用稳定的网络
- 或使用加速器

### Q6: 如何移除团队成员？

**步骤**：
1. 访问 https://sanity.io/manage
2. 选择项目 → Team
3. 找到成员，点击 **Remove**

### Q7: 免费版有限制吗？

**Sanity 免费版限制**：
- ✅ 无限文档数量
- ✅ 10GB 资源存储
- ✅ 3 个管理员账号
- ✅ 无限编辑者和查看者

对于大多数项目完全够用！

---

## 📊 部署后的架构

```
┌─────────────────────────────┐
│  团队成员（世界各地）         │
│  - 成员 A (办公室)            │
│  - 成员 B (家中)              │
│  - 成员 C (咖啡厅)            │
└──────────────┬──────────────┘
               │ 通过浏览器访问
               ↓
┌──────────────────────────────┐
│  Sanity Studio (线上)        │
│  https://matrichina.sanity.studio│
│  - 24/7 在线                  │
│  - 自动更新                   │
│  - 全球 CDN                   │
└──────────────┬──────────────┘
               │ 读写数据
               ↓
┌──────────────────────────────┐
│  Sanity 数据库 (云端)         │
│  Project ID: 8i1xhvuq        │
│  Dataset: production         │
└──────────────┬──────────────┘
               │ 提供数据
               ↓
┌──────────────────────────────┐
│  前端网站                     │
│  https://matrichina.netlify.app│
│  - 自动读取最新数据           │
└──────────────────────────────┘
```

---

## 📝 部署检查清单

部署前：
- [ ] Studio 本地运行正常
- [ ] 已登录 Sanity 账号
- [ ] 想好 Studio 域名

部署后：
- [ ] 访问线上 Studio 确认可以打开
- [ ] 测试登录功能
- [ ] 检查 CORS 配置
- [ ] 邀请团队成员
- [ ] 发送使用指南给团队

团队成员：
- [ ] 接受邀请邮件
- [ ] 访问 Studio 并登录
- [ ] 测试创建内容
- [ ] 测试发布功能

---

## 🎯 快速命令参考

```bash
# 登录
npx sanity login

# 部署
cd studio
npx sanity deploy

# 检查登录状态
npx sanity whoami

# 邀请成员
npx sanity users invite

# 查看项目信息
npx sanity projects list

# 重新部署（更新）
npx sanity deploy
```

---

## 📞 获取帮助

如果遇到问题：

1. **查看 Sanity 文档**
   https://sanity.io/docs

2. **查看部署状态**
   https://sanity.io/manage

3. **联系 Sanity 支持**
   support@sanity.io

---

## 🎉 完成后

部署成功后，您的团队可以：

✅ **随时访问** - 无需本地环境  
✅ **协作编辑** - 多人同时工作  
✅ **实时同步** - 数据即时更新  
✅ **移动访问** - 手机也能管理  
✅ **全球访问** - 不受地理限制  

---

**祝您部署顺利！** 🚀

*指南创建时间：2025-11-09*


