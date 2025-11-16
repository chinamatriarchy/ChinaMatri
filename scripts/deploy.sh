#!/bin/bash

# 🚀 快速部署到网站
# 在 Cursor 中修改代码后，运行此脚本快速部署

echo "======================================"
echo "🚀 快速部署到 GitHub 和网站"
echo "======================================"

# 检查是否在项目目录
if [ ! -d ".git" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo ""
echo "📊 检查修改的文件..."
git status --short

echo ""
read -p "📝 请输入提交信息（描述您的修改）: " commit_message

if [ -z "$commit_message" ]; then
    echo "❌ 提交信息不能为空"
    exit 1
fi

echo ""
echo "======================================"
echo "📦 步骤 1: 添加所有修改的文件"
echo "======================================"
git add .

echo ""
echo "======================================"
echo "💾 步骤 2: 提交到本地仓库"
echo "======================================"
git commit -m "$commit_message"

if [ $? -ne 0 ]; then
    echo "⚠️  没有新的修改需要提交"
    read -p "是否强制推送？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

echo ""
echo "======================================"
echo "📤 步骤 3: 推送到 GitHub"
echo "======================================"
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ 部署成功！"
    echo "======================================"
    echo ""
    echo "🌐 您的更改正在部署到："
    echo "   https://matrichina.netlify.app"
    echo ""
    echo "⏰ 预计等待时间：2-3 分钟"
    echo ""
    echo "📊 查看部署状态："
    echo "   https://app.netlify.com"
    echo ""
    echo "💡 提示："
    echo "   - Netlify 正在自动构建和部署"
    echo "   - 等待 2-3 分钟后访问网站查看效果"
    echo "   - 如需强制刷新浏览器：Cmd + Shift + R"
    echo ""
else
    echo ""
    echo "======================================"
    echo "❌ 推送失败"
    echo "======================================"
    echo ""
    echo "可能的原因："
    echo "1. 网络问题"
    echo "2. 需要输入 GitHub 密码或 Token"
    echo "3. 远程仓库有冲突"
    echo ""
    echo "解决方法："
    echo "先运行: git pull"
    echo "然后再运行: git push"
    echo ""
fi

