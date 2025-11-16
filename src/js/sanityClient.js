// Sanity 客户端配置
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from './config.js'

// 使用统一配置创建客户端
export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: sanityConfig.useCdn,
  apiVersion: sanityConfig.apiVersion,
})

// 图片 URL 生成器
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

// GROQ 查询函数
export const queries = {
  // 获取所有考古遗址
  getAllSites: `*[_type == "archaeologicalSite"] | order(name asc) {
    _id,
    name,
    period,
    periodName,
    "lat": location.lat,
    "lng": location.lng,
    date,
    description,
    findings,
    image,
    region,
    sourceLink
  }`,

  // 根据时期筛选遗址
  getSitesByPeriod: (period) => `*[_type == "archaeologicalSite" && period == "${period}"] {
    _id,
    name,
    period,
    periodName,
    "lat": location.lat,
    "lng": location.lng,
    date,
    description,
    findings,
    image
  }`,

  // 获取所有女神
  getAllGoddesses: `*[_type == "goddess"] | order(name asc) {
    _id,
    name,
    category,
    categoryName,
    title,
    summary,
    description,
    mythology,
    historicalSignificance,
    image,
    relatedCultures,
    sourceLink
  }`,

  // 根据类别筛选女神
  getGoddesesByCategory: (category) => `*[_type == "goddess" && category == "${category}"] {
    _id,
    name,
    category,
    categoryName,
    title,
    summary,
    image
  }`,

  // 获取所有学者
  getAllScholars: `*[_type == "scholar"] | order(name asc) {
    _id,
    name,
    region,
    field,
    institution,
    description,
    works,
    photo,
    birthYear,
    deathYear,
    website
  }`,

  // 根据地区筛选学者
  getScholarsByRegion: (region) => `*[_type == "scholar" && region == "${region}"] {
    _id,
    name,
    region,
    field,
    institution,
    description,
    works,
    photo
  }`,

  // 获取所有论著
  getAllPublications: `*[_type == "publication"] | order(year desc) {
    _id,
    title,
    author,
    year,
    category,
    description,
    tags,
    coverImage,
    isbn,
    publisher,
    purchaseLink
  }`,

  // 根据分类筛选论著
  getPublicationsByCategory: (category) => `*[_type == "publication" && category == "${category}"] {
    _id,
    title,
    author,
    year,
    description,
    tags
  }`,

  // 获取所有现存氏族
  getAllCommunities: `*[_type == "community"] | order(name asc) {
    _id,
    name,
    region,
    "lat": location.lat,
    "lng": location.lng,
    population,
    summary,
    description,
    familyStructure,
    marriageSystem,
    inheritance,
    modernChanges,
    images,
    featured
  }`,

  // 获取重点展示的氏族
  getFeaturedCommunities: `*[_type == "community" && featured == true] {
    _id,
    name,
    region,
    summary,
    images
  }`
}

// 数据获取函数
export async function fetchData(query) {
  try {
    const data = await sanityClient.fetch(query)
    return data
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
    return []
  }
}

// 导出便捷方法
export const api = {
  getSites: () => fetchData(queries.getAllSites),
  getSitesByPeriod: (period) => fetchData(queries.getSitesByPeriod(period)),
  
  getGoddesses: () => fetchData(queries.getAllGoddesses),
  getGoddesesByCategory: (cat) => fetchData(queries.getGoddesesByCategory(cat)),
  
  getScholars: () => fetchData(queries.getAllScholars),
  getScholarsByRegion: (region) => fetchData(queries.getScholarsByRegion(region)),
  
  getPublications: () => fetchData(queries.getAllPublications),
  getPublicationsByCategory: (cat) => fetchData(queries.getPublicationsByCategory(cat)),
  
  getCommunities: () => fetchData(queries.getAllCommunities),
  getFeaturedCommunities: () => fetchData(queries.getFeaturedCommunities)
}

