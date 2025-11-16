#!/bin/bash

# 停止所有服务

echo "🛑 正在停止中国母权网站服务..."
echo ""

# 读取保存的 PID
if [ -f ".server_pids" ]; then
    PIDS=$(cat .server_pids)
    echo "📝 从文件读取 PID: $PIDS"
    kill $PIDS 2>/dev/null
    rm -f .server_pids
fi

# 强制杀死相关进程
echo "🧹 清理所有相关进程..."
pkill -f "sanity dev" 2>/dev/null
pkill -f "http.server 8000" 2>/dev/null

sleep 1

echo ""
echo "✅ 所有服务已停止"
echo ""


