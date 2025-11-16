#!/bin/bash

# 🌸 中国母权网站 - 完整启动脚本
# 这个脚本会启动所有必需的服务

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌸 中国母权网站 - 管理系统启动"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 进入项目目录
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri

# 杀死可能残留的进程
echo "🧹 清理旧进程..."
pkill -f "sanity dev" 2>/dev/null
pkill -f "http.server 8000" 2>/dev/null
sleep 1

# 启动前端服务器
echo ""
echo "🌐 启动前端服务器..."
python3 -m http.server 8000 > /dev/null 2>&1 &
FRONTEND_PID=$!
echo "   ✅ 前端服务器已启动 (PID: $FRONTEND_PID)"
echo "   📍 访问地址: http://localhost:8000"

# 启动 Sanity Studio
echo ""
echo "🎨 启动 Sanity Studio..."
cd studio
npx sanity dev > /dev/null 2>&1 &
STUDIO_PID=$!
echo "   ✅ Studio 已启动 (PID: $STUDIO_PID)"
echo "   📍 访问地址: http://localhost:3333"

# 等待服务启动
echo ""
echo "⏳ 等待服务完全启动（10秒）..."
for i in {10..1}; do
    echo -ne "   倒计时: $i 秒\r"
    sleep 1
done
echo "   ✅ 服务已就绪!              "

# 打开浏览器
echo ""
echo "🚀 正在打开浏览器..."
sleep 1

# 尝试不同的浏览器打开方式
if [ -d "/Applications/Google Chrome.app" ]; then
    open -a "Google Chrome" "http://localhost:8000/START-HERE.html"
    echo "   ✅ 已在 Chrome 中打开"
elif [ -d "/Applications/Safari.app" ]; then
    open -a "Safari" "http://localhost:8000/START-HERE.html"
    echo "   ✅ 已在 Safari 中打开"
else
    open "http://localhost:8000/START-HERE.html" 2>/dev/null
    echo "   ✅ 已在默认浏览器中打开"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ 启动完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📌 访问地址："
echo "   🎨 管理中心: http://localhost:8000/START-HERE.html"
echo "   🔧 Sanity Studio: http://localhost:3333"
echo "   🌐 网站首页: http://localhost:8000"
echo ""
echo "📝 进程 ID："
echo "   前端: $FRONTEND_PID"
echo "   Studio: $STUDIO_PID"
echo ""
echo "🛑 停止服务："
echo "   kill $FRONTEND_PID $STUDIO_PID"
echo "   或按 Ctrl+C 然后运行: pkill -f 'sanity dev' && pkill -f 'http.server 8000'"
echo ""
echo "💡 需要帮助？查看 HOW-TO-USE.md"
echo ""

# 保存 PID 到文件，方便后续停止
echo "$FRONTEND_PID $STUDIO_PID" > .server_pids

# 保持脚本运行
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠️  请保持此窗口打开"
echo "   按 Ctrl+C 停止所有服务"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 等待用户中断
trap "echo ''; echo '🛑 正在停止服务...'; kill $FRONTEND_PID $STUDIO_PID 2>/dev/null; rm -f .server_pids; echo '✅ 所有服务已停止'; exit 0" INT

wait


