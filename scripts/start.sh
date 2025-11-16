#!/bin/bash

# 中国母权网站 - 快速启动脚本

echo "🌸 启动中国母权网站管理系统..."
echo ""

# 检查端口是否已被占用
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ 端口 $1 已在使用"
        return 0
    else
        echo "⚠️  端口 $1 未启动"
        return 1
    fi
}

# 打开浏览器
open_browser() {
    sleep 3
    if command -v open &> /dev/null; then
        open "$1"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$1"
    elif command -v start &> /dev/null; then
        start "$1"
    fi
}

echo "📊 检查服务状态..."
echo ""

# 检查 Studio
if check_port 3333; then
    echo "   Sanity Studio: http://localhost:3333"
else
    echo "   需要启动 Studio: cd studio && npx sanity dev"
fi

# 检查前端
if check_port 8000; then
    echo "   前端网站: http://localhost:8000"
else
    echo "   需要启动前端: python3 -m http.server 8000"
fi

echo ""
echo "🚀 正在打开浏览器..."
echo ""

# 打开管理中心页面
open_browser "http://localhost:8000/START-HERE.html" &

echo "✨ 完成！"
echo ""
echo "📝 如果页面没有打开，请手动访问："
echo "   🎨 管理中心: http://localhost:8000/START-HERE.html"
echo "   🔧 Sanity Studio: http://localhost:3333"
echo "   🌐 网站首页: http://localhost:8000"
echo ""
echo "💡 需要帮助？查看 HOW-TO-USE.md"


