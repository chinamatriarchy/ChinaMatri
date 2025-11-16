# 🐛 Bug 修复说明

## ✅ 已修复的问题

### 1. **时间轴滑块无法拖动**

**问题原因**：CSS 中设置了 `pointer-events: none`，阻止了鼠标事件。

**修复内容**：
- 移除了 `pointer-events: none`
- 添加了正确的 z-index 层级
- 保留滑块的 cursor: pointer

**测试方法**：
1. 刷新页面（Cmd + Shift + R）
2. 尝试拖动时间轴上的两个滑块
3. 应该可以流畅拖动了

---

### 2. **地图不显示问题**

**可能原因**：
1. 高德地图加载失败
2. JavaScript 错误
3. 浏览器缓存

**排查步骤**：

#### 步骤 1：检查浏览器控制台

1. 按 **F12** 打开开发者工具
2. 点击 **Console** 标签
3. 刷新页面
4. 查看是否有红色错误信息

**常见错误**：
- `Uncaught ReferenceError` - JavaScript 错误
- `Failed to load resource` - 地图瓦片加载失败
- `CORS error` - 跨域错误

#### 步骤 2：强制刷新

按 **Cmd + Shift + R**（Mac）或 **Ctrl + Shift + F5**（Windows）

#### 步骤 3：清除缓存

**Chrome**:
1. 右键点击刷新按钮
2. 选择 "清空缓存并硬性重新加载"

**Safari**:
1. Safari → 偏好设置 → 高级
2. 勾选 "在菜单栏显示开发菜单"
3. 开发 → 清空缓存

#### 步骤 4：检查地图代码

确认地图初始化代码存在：

```javascript
function initMap() {
    map = L.map('map').setView([35.0, 110.0], 5);
    
    // 高德地图
    const gdNormalLayer = L.tileLayer(...);
    gdNormalLayer.addTo(map);
    
    addLegend();
}
```

---

## 🧪 测试清单

完成修复后，请测试：

- [ ] 刷新页面（Cmd + Shift + R）
- [ ] 时间轴左滑块可以拖动
- [ ] 时间轴右滑块可以拖动
- [ ] 拖动滑块时，地图标记实时更新
- [ ] 地图底图正常显示（彩色地图，不是灰色）
- [ ] 可以拖动地图
- [ ] 可以缩放地图
- [ ] 点击标记显示弹出窗口

---

## 📊 如果地图还是不显示

### 方案 1：检查 Leaflet CSS

确认 HTML 的 `<head>` 中有：

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

### 方案 2：尝试不同的地图源

如果高德地图加载失败，在右上角的图层控制中切换到 "OpenStreetMap"。

### 方案 3：检查网络

- 确认可以访问外网
- 尝试用手机热点测试

---

## 🆘 需要进一步帮助

如果问题仍然存在，请提供：

1. **浏览器控制台的错误信息**（截图）
2. **使用的浏览器和版本**
3. **地图是完全不显示，还是只是灰色？**
4. **时间轴现在可以拖动了吗？**

---

## 📝 快速修复命令

如果需要重置：

```bash
cd /Users/xiaowanyu/03_孵化项目/ChinaMatri
git checkout map-cms.html  # 恢复到之前的版本
```

然后重新应用修复。

---

*修复时间：2025-11-09*


