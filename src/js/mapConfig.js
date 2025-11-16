// 🎨 地图可视化配置
// 统一管理地图相关的颜色、样式等配置

export const mapConfig = {
  // 地图初始位置
  center: {
    lat: 35.0,
    lng: 110.0,
    zoom: 5
  },
  
  // 文化时期颜色配置
  periodColors: {
    yangshao: '#E91E63',    // 仰韶文化 - 粉红色
    hemudu: '#9C27B0',      // 河姆渡文化 - 紫色
    hongshan: '#673AB7',    // 红山文化 - 深紫色
    longshan: '#3F51B5',    // 龙山文化 - 靛蓝色
    liangzhu: '#2196F3',    // 良渚文化 - 蓝色
    dawenkou: '#00BCD4',    // 大汶口文化 - 青色
    majiayao: '#009688',    // 马家窑文化 - 青绿色
    qijia: '#4CAF50',       // 齐家文化 - 绿色
    other: '#9E9E9E'        // 其他 - 灰色
  },
  
  // 地图瓦片图层配置
  tileLayers: {
    openstreetmap: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      name: 'OpenStreetMap'
    },
    gaode: {
      url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      subdomains: ['1', '2', '3', '4'],
      attribution: '© 高德地图',
      maxZoom: 18,
      name: '高德地图'
    }
  },
  
  // 默认使用的图层
  defaultTileLayer: 'openstreetmap',
  
  // 标记点样式
  markerStyle: {
    radius: 8,
    fillOpacity: 0.8,
    weight: 2,
    color: '#fff'
  }
};

// 时间线配置
export const timelineConfig = {
  // 时间范围（BCE 公元前）
  minYear: 1500,
  maxYear: 6000,
  
  // 默认显示范围
  defaultStart: 6000,
  defaultEnd: 1500,
  
  // 颜色配置
  colors: {
    track: 'linear-gradient(to right, #e0e7ff, #9333ea)',
    highlight: '#9333ea',
    thumb: '#9333ea',
    thumbBorder: '#ffffff'
  }
};

// 文化类型配置（用于筛选）
export const cultureTypes = [
  { id: 'all', name: '全部', color: null },
  { id: 'yangshao', name: '仰韶文化', color: '#E91E63' },
  { id: 'hemudu', name: '河姆渡文化', color: '#9C27B0' },
  { id: 'hongshan', name: '红山文化', color: '#673AB7' },
  { id: 'longshan', name: '龙山文化', color: '#3F51B5' },
  { id: 'liangzhu', name: '良渚文化', color: '#2196F3' },
  { id: 'dawenkou', name: '大汶口文化', color: '#00BCD4' },
  { id: 'majiayao', name: '马家窑文化', color: '#009688' },
  { id: 'qijia', name: '齐家文化', color: '#4CAF50' }
];

export default mapConfig;

