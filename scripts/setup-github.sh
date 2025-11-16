#!/bin/bash

# 🚀 GitHub 仓库连接助手

echo "======================================"
echo "🚀 GitHub 仓库连接向导"
echo "======================================"
echo ""

echo "📋 步骤 1: 创建 GitHub 仓库"
echo ""
echo "请在浏览器中打开以下地址："
echo "👉 https://github.com/new"
echo ""
echo "填写信息："
echo "  - Repository name: ChinaMatri"
echo "  - Description: 母权中国 - 母系社会研究网站"
echo "  - Public (推荐)"
echo "  - ⚠️ 不要勾选 README, .gitignore"
echo ""
echo "创建完成后，复制仓库 URL，例如："
echo "  https://github.com/YOUR_USERNAME/ChinaMatri.git"
echo ""

read -p "已创建仓库？请粘贴仓库 URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ 未输入 URL，退出"
    exit 1
fi

echo ""
echo "======================================"
echo "📋 步骤 2: 连接远程仓库"
echo "======================================"

# 检查是否已有 origin
if git remote | grep -q "origin"; then
    echo "⚠️  检测到已有 origin 远程仓库"
    read -p "是否替换？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo "✅ 已移除旧的 origin"
    else
        echo "❌ 取消操作"
        exit 1
    fi
fi

# 添加远程仓库
git remote add origin "$REPO_URL"
echo "✅ 已添加远程仓库"

# 验证
echo ""
echo "验证远程仓库："
git remote -v

echo ""
echo "======================================"
echo "📋 步骤 3: 提交并推送代码"
echo "======================================"

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "当前分支: $CURRENT_BRANCH"

# 提交更改
echo ""
echo "📦 提交所有更改..."
git add -A

if git diff --cached --quiet; then
    echo "ℹ️  没有新的更改需要提交"
else
    git commit -m "feat: 整理项目结构，优化配置管理，准备自动部署"
    echo "✅ 更改已提交"
fi

# 推送到 GitHub
echo ""
echo "📤 推送到 GitHub..."
echo "⚠️  可能需要输入 GitHub 用户名和密码（或 Personal Access Token）"
echo ""

if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    git push -u origin "$CURRENT_BRANCH"
else
    # 如果不是 main/master，切换到 main
    echo "⚠️  当前分支不是 main，正在切换..."
    git branch -M main
    git push -u origin main
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ 成功推送到 GitHub！"
    echo "======================================"
    echo ""
    echo "🌐 访问您的仓库："
    echo "👉 ${REPO_URL%.git}"
    echo ""
    echo "📝 下一步："
    echo "1. 在浏览器中确认代码已上传"
    echo "2. 继续配置 Netlify 自动部署"
    echo "3. 查看详细步骤: cat DEPLOY-STEPS.md"
    echo ""
else
    echo ""
    echo "======================================"
    echo "❌ 推送失败"
    echo "======================================"
    echo ""
    echo "可能的原因："
    echo "1. 用户名/密码错误"
    echo "2. 需要使用 Personal Access Token"
    echo "3. 网络问题"
    echo ""
    echo "💡 如何创建 Personal Access Token:"
    echo "1. 访问: https://github.com/settings/tokens"
    echo "2. Generate new token (classic)"
    echo "3. 勾选 'repo' 权限"
    echo "4. 复制 token"
    echo "5. 使用 token 作为密码"
    echo ""
    echo "或使用 SSH:"
    echo "git remote set-url origin git@github.com:YOUR_USERNAME/ChinaMatri.git"
    echo ""
fi

