#!/bin/bash

# 用新账号创建新的 Sanity 项目

echo "🆕 用新账号创建新 Sanity 项目"
echo ""
echo "⚠️  警告：这会创建全新的项目，原有数据不会自动迁移"
echo ""
read -p "确定要继续吗？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消"
    exit 1
fi

echo ""
echo "步骤 1: 登出当前账号"
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
npx sanity logout

echo ""
echo "步骤 2: 用新账号登录"
npx sanity login

echo ""
echo "步骤 3: 初始化新项目"
echo "请选择："
echo "  - Create new project（创建新项目）"
echo "  - 输入项目名称（例如：MatriChina）"
echo "  - 选择 dataset: production"
echo ""
npx sanity init --reconfigure

echo ""
echo "✅ 完成！"
echo ""
echo "⚠️  重要：新的 Project ID 已生成"
echo "请更新以下文件中的 projectId："
echo "  1. studio/sanity.config.js"
echo "  2. src/js/sanityClient.js"
echo "  3. src/js/sanity-browser.js"
echo ""
echo "运行以下命令查看新的 Project ID:"
echo "  cd studio && npx sanity projects list"
echo ""


