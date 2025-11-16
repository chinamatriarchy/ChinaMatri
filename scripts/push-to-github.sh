#!/bin/bash

# 🔐 GitHub 推送助手 - 交互式版本

echo "======================================"
echo "🔐 GitHub 身份验证"
echo "======================================"
echo ""
echo "您有两种方式推送代码："
echo ""
echo "方式 1: 使用 Personal Access Token（推荐）"
echo "方式 2: 配置 SSH 密钥"
echo ""

read -p "选择方式 (1/2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "======================================"
    echo "📋 创建 Personal Access Token"
    echo "======================================"
    echo ""
    echo "1️⃣ 打开浏览器访问："
    echo "   https://github.com/settings/tokens"
    echo ""
    echo "2️⃣ 点击: 'Generate new token' → 'Generate new token (classic)'"
    echo ""
    echo "3️⃣ 填写:"
    echo "   - Note: MatriChina Deploy"
    echo "   - Expiration: No expiration"
    echo "   - 勾选: ✅ repo (所有权限)"
    echo ""
    echo "4️⃣ 点击底部绿色按钮: 'Generate token'"
    echo ""
    echo "5️⃣ 复制 token (ghp_xxxx...)"
    echo ""
    
    # 打开浏览器
    /usr/bin/open "https://github.com/settings/tokens/new" 2>/dev/null
    
    echo "======================================"
    read -p "已复制 token？按回车继续..." 
    echo ""
    
    echo "======================================"
    echo "🚀 推送代码"
    echo "======================================"
    echo ""
    echo "现在运行:"
    echo ""
    echo "git push -u origin main"
    echo ""
    echo "当提示时:"
    echo "  Username: chinamatriarchy"
    echo "  Password: [粘贴您的 token]"
    echo ""
    
    git push -u origin main
    
elif [ "$choice" = "2" ]; then
    echo ""
    echo "======================================"
    echo "🔑 配置 SSH"
    echo "======================================"
    echo ""
    echo "1️⃣ 生成 SSH 密钥:"
    echo "   ssh-keygen -t ed25519 -C \"your_email@example.com\""
    echo ""
    echo "2️⃣ 添加到 GitHub:"
    echo "   https://github.com/settings/keys"
    echo ""
    echo "3️⃣ 更改仓库 URL:"
    echo "   git remote set-url origin git@github.com:chinamatriarchy/ChinaMatri.git"
    echo ""
    echo "4️⃣ 推送:"
    echo "   git push -u origin main"
    echo ""
else
    echo "无效选择"
fi

