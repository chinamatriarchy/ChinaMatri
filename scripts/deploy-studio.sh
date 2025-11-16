#!/bin/bash

# Sanity Studio 部署脚本

echo "🚀 开始部署 Sanity Studio 到线上"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio

echo "📝 步骤 1: 检查登录状态..."
npx sanity whoami

if [ $? -eq 0 ]; then
    echo "✅ 已登录"
else
    echo "⚠️  未登录，正在启动登录..."
    npx sanity login
fi

echo ""
echo "📝 步骤 2: 开始部署..."
echo ""
echo "💡 系统会询问 Studio 域名（hostname）"
echo "   建议输入：matrichina"
echo "   将创建：https://matrichina.sanity.studio"
echo ""
read -p "按 Enter 继续部署..."

npx sanity deploy

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 下一步："
echo ""
echo "1️⃣  访问您的线上 Studio"
echo "   https://[您的域名].sanity.studio"
echo ""
echo "2️⃣  邀请团队成员"
echo "   访问 https://sanity.io/manage"
echo "   选择项目 → Team → Invite member"
echo ""
echo "3️⃣  配置 CORS"
echo "   访问 https://sanity.io/manage"
echo "   选择项目 → API → CORS Origins"
echo "   添加：https://[您的域名].sanity.studio"
echo ""
echo "📖 详细文档：DEPLOY-STUDIO-GUIDE.md"
echo ""


