// Sanity 配置
const SANITY_CONFIG = {
  projectId: '8i1xhvuq',
  dataset: 'production',
  apiVersion: '2024-01-01'
};

const SANITY_CDN_URL = `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}`;

// 生成图片 URL
function getImageUrl(image, width = 800) {
  if (!image || !image.asset) return 'http://static.photos/abstract/640x360/1';
  const ref = image.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  return `${SANITY_CDN_URL}/${id}-${dimensions}.${format}?w=${width}&auto=format`;
}

// 从 Sanity 获取数据的通用函数
async function fetchFromSanity(query) {
  const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return [];
  }
}

// 导出给浏览器使用
window.SanityAPI = {
  config: SANITY_CONFIG,
  getImageUrl,
  fetchFromSanity,
  
  // 便捷查询方法
  async getSites() {
    const query = `*[_type == "archaeologicalSite"] | order(name asc)`;
    return await fetchFromSanity(query);
  },
  
  async getGoddesses() {
    const query = `*[_type == "goddess"] | order(name asc)`;
    return await fetchFromSanity(query);
  },
  
  async getScholars() {
    const query = `*[_type == "scholar"] | order(name asc)`;
    return await fetchFromSanity(query);
  },
  
  async getPublications() {
    const query = `*[_type == "publication"] | order(year desc)`;
    return await fetchFromSanity(query);
  },
  
  async getCommunities() {
    const query = `*[_type == "community"] | order(name asc)`;
    return await fetchFromSanity(query);
  }
};

console.log('✅ Sanity Client loaded successfully');

