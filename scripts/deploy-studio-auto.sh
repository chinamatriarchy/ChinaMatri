#!/bin/bash

# 🚀 自动部署 Sanity Studio 到 Netlify

echo "======================================"
echo "🚀 准备部署 Sanity Studio"
echo "======================================"

# 1. 检查当前目录
if [ ! -d "studio" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 2. 检查 Git 状态
echo ""
echo "📋 检查 Git 状态..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改"
    echo ""
    git status --short
    echo ""
    read -p "是否提交所有更改？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "💾 提交更改..."
        git add .
        echo "请输入提交信息："
        read commit_message
        git commit -m "$commit_message"
    else
        echo "❌ 已取消部署"
        exit 1
    fi
else
    echo "✅ 工作区干净"
fi

# 3. 推送到 GitHub
echo ""
echo "📤 推送到 GitHub..."
git push origin main
if [ $? -eq 0 ]; then
    echo "✅ 推送成功"
else
    echo "❌ 推送失败"
    exit 1
fi

# 4. 等待 Netlify 构建
echo ""
echo "⏳ Netlify 正在自动构建和部署..."
echo ""
echo "📊 您可以在以下地址查看构建状态："
echo "   https://app.netlify.com"
echo ""
echo "🌐 部署完成后访问："
echo "   https://matrichina-studio.netlify.app"
echo ""
echo "⏰ 预计等待时间：2-3 分钟"
echo ""
echo "======================================"
echo "✅ 部署流程已启动"
echo "======================================"


