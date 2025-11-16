// 统一内容模型的客户端查询函数（扁平化字段结构）
// 所有数据都从同一个 'entry' 类型查询，通过 category 区分

const SANITY_CONFIG = {
  projectId: '8i1xhvuq',
  dataset: 'production',
  apiVersion: '2024-01-01'
};

const SANITY_CDN_URL = `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}`;

// 生成图片 URL
function getImageUrl(image, width = 800) {
  if (!image || !image.asset) return '';
  const ref = image.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  return `${SANITY_CDN_URL}/${id}-${dimensions}.${format}?w=${width}&auto=format`;
}

// 通用查询函数
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

// 统一查询接口
window.SanityAPI = {
  config: SANITY_CONFIG,
  getImageUrl,
  fetchFromSanity,
  
  // 按分类查询（通用）
  async getByCategory(category, subcategory = null) {
    let query = `*[_type == "entry" && category == "${category}"`
    if (subcategory) {
      query += ` && subcategory == "${subcategory}"`
    }
    query += `] | order(title asc)`
    return await fetchFromSanity(query);
  },
  
  // 考古遗址（sites）
  async getSites(period = null) {
    let query = `*[_type == "entry" && category == "site"`
    if (period) {
      query += ` && subcategory == "${period}"`
    }
    query += `] { 
      _id, 
      title, 
      subtitle,
      "period": subcategory,
      "periodName": subtitle,
      "lat": coordinates.lat,
      "lng": coordinates.lng,
      "date": dateRange,
      summary,
      description,
      findings,
      excavationPeriod,
      region,
      address,
      "image": mainImage,
      gallery,
      sourceLink,
      tags,
      featured
    } | order(dateRange asc)`
    return await fetchFromSanity(query);
  },
  
  // 女神（goddesses）
  async getGoddesses(subcategory = null) {
    let query = `*[_type == "entry" && category == "goddess"`
    if (subcategory) {
      query += ` && subcategory == "${subcategory}"`
    }
    query += `] {
      _id,
      title,
      "category": subcategory,
      "categoryName": subtitle,
      subtitle,
      summary,
      description,
      "image": mainImage,
      gallery,
      tags,
      field,
      institution,
      nationality,
      biography,
      works,
      dateRange,
      relatedItems,
      sourceLink,
      featured
    } | order(title asc)`
    return await fetchFromSanity(query);
  },
  
  // 学者（scholars）
  async getScholars(region = null) {
    let query = `*[_type == "entry" && category == "scholar"`
    if (region) {
      query += ` && subcategory == "${region}"`
    }
    query += `] {
      _id,
      title,
      "region": subcategory,
      field,
      institution,
      summary,
      description,
      biography,
      works,
      "photo": mainImage,
      birthYear,
      deathYear,
      nationality,
      year,
      tags,
      sourceLink,
      featured
    } | order(title asc)`
    return await fetchFromSanity(query);
  },
  
  // 论著（works/publications）
  async getPublications(subcategory = null) {
    let query = `*[_type == "entry" && category == "work"`
    if (subcategory) {
      query += ` && subcategory == "${subcategory}"`
    }
    query += `] {
      _id,
      title,
      author,
      year,
      "category": subcategory,
      summary,
      description,
      tags,
      "coverImage": mainImage,
      isbn,
      publisher,
      pages,
      sourceLink,
      "purchaseLink": externalLinks[0].url,
      featured
    } | order(year desc)`
    return await fetchFromSanity(query);
  },
  
  // 现存氏族（communities）
  async getCommunities() {
    const query = `*[_type == "entry" && category == "community"] {
      _id,
      title,
      region,
      "lat": coordinates.lat,
      "lng": coordinates.lng,
      population,
      language,
      summary,
      description,
      "images": gallery,
      "mainImage": mainImage,
      address,
      tags,
      sourceLink,
      featured
    } | order(title asc)`
    return await fetchFromSanity(query);
  },
  
  // 获取重点内容
  async getFeatured(category = null) {
    let query = `*[_type == "entry" && featured == true`
    if (category) {
      query += ` && category == "${category}"`
    }
    query += `] | order(_createdAt desc)`
    return await fetchFromSanity(query);
  },
  
  // 搜索
  async search(searchTerm) {
    const query = `*[_type == "entry" && (
      title match "${searchTerm}*" ||
      summary match "${searchTerm}*" ||
      "${searchTerm}" in tags[]
    )] | order(_score desc)`
    return await fetchFromSanity(query);
  },
  
  // 获取单个条目的详细信息
  async getById(id) {
    const query = `*[_type == "entry" && _id == "${id}"][0]`
    return await fetchFromSanity(query);
  },
  
  // 获取相关内容
  async getRelated(id, limit = 5) {
    const query = `*[_type == "entry" && _id == "${id}"][0] {
      "related": relatedItems[]-> {
        _id,
        title,
        category,
        subcategory,
        subtitle,
        summary,
        "image": mainImage
      }
    }`
    const result = await fetchFromSanity(query);
    return result?.related || [];
  }
};

console.log('✅ 统一内容模型 Sanity Client 加载成功（扁平化字段结构）');
