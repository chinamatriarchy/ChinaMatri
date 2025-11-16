🚀 部署 Sanity Studio 到线上

需要先登录 Sanity 账号。

请在您的终端中运行以下命令：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity login
```

这会打开浏览器，请：
1. 选择 "Sign in with Google"
2. 使用您的新 Gmail 账号登录
3. 授权 Sanity 访问

登录成功后，再运行：

```bash
npx sanity deploy
```

系统会询问域名（hostname），建议输入：
```
matrichina
```

这将创建：https://matrichina.sanity.studio

---

或者，直接在终端中依次运行：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity login
npx sanity deploy
```


