#!/bin/bash

# Sanity 登录问题修复脚本

echo "🔧 修复 Sanity 登录问题"
echo ""
echo "错误：Unable to verify authorization request state"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "快速解决方案："
echo ""
echo "方法 1: 清除浏览器并重启 Studio"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣ 停止当前的 Studio 服务"
pkill -f "sanity dev"
echo "   ✅ Studio 已停止"
echo ""
echo "2️⃣ 清除 Sanity CLI 缓存"
rm -rf ~/.sanity
echo "   ✅ 缓存已清除"
echo ""
echo "3️⃣ 清除浏览器数据"
echo "   请手动操作："
echo ""
echo "   Chrome:"
echo "   - 按 Cmd + Shift + Delete"
echo "   - 选择「Cookie 和其他网站数据」"
echo "   - 时间范围：过去 1 小时"
echo "   - 点击「清除数据」"
echo ""
echo "   Safari:"
echo "   - Safari → 偏好设置 → 隐私"
echo "   - 点击「管理网站数据」"
echo "   - 搜索 sanity"
echo "   - 点击「全部移除」"
echo ""
echo "4️⃣ 重新启动 Studio"
echo ""
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri/studio
echo "   正在启动 Studio..."
npx sanity dev > /dev/null 2>&1 &
STUDIO_PID=$!
echo "   ✅ Studio 已启动 (PID: $STUDIO_PID)"
echo ""
echo "5️⃣ 等待 10 秒后访问"
for i in {10..1}; do
    echo -ne "   倒计时: $i 秒\r"
    sleep 1
done
echo "   ✅ 可以访问了!              "
echo ""
echo "6️⃣ 在【隐身/无痕模式】中打开"
echo "   http://localhost:3333"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 提示："
echo "   - 使用隐身/无痕模式可以避免缓存问题"
echo "   - Chrome: Cmd + Shift + N"
echo "   - Safari: Cmd + Shift + N"
echo ""


