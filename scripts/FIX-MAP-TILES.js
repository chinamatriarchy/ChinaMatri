<!-- 在 <script> 标签的 initMap() 函数中替换地图图层配置 -->

// 修复后的初始化地图函数
function initMap() {
    // 创建地图，中心设置在中国
    map = L.map('map').setView([35.0, 110.0], 5);

    // 方案 1: 使用国内可访问的地图源（高德地图）
    const gdNormalLayer = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: ['1', '2', '3', '4'],
        attribution: '© 高德地图',
        maxZoom: 18
    });

    // 方案 2: OpenStreetMap（备用）
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    });

    // 方案 3: 天地图（中国官方地图）
    const tiandituLayer = L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=YOUR_KEY_HERE', {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        maxZoom: 18
    });

    // 默认使用高德地图（在中国大陆访问较快）
    gdNormalLayer.addTo(map);

    // 如果高德地图加载失败，自动切换到 OpenStreetMap
    gdNormalLayer.on('tileerror', function() {
        console.warn('高德地图加载失败，切换到 OpenStreetMap');
        map.removeLayer(gdNormalLayer);
        osmLayer.addTo(map);
    });

    // 添加图层控制器，让用户可以切换地图
    const baseMaps = {
        "高德地图": gdNormalLayer,
        "OpenStreetMap": osmLayer
    };
    
    L.control.layers(baseMaps).addTo(map);

    // 添加图例
    addLegend();
}


