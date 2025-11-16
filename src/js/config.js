// 🔧 Sanity CMS 配置
// 统一管理所有 Sanity 相关配置，避免硬编码

export const sanityConfig = {
  // 项目配置
  projectId: '8i1xhvuq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  
  // API 配置
  useCdn: true, // 生产环境使用 CDN 加速
  token: null,  // 如果需要写入权限，在这里配置 token
  
  // CORS 配置（如果需要）
  withCredentials: false
};

// 导出便捷函数
export function getSanityClient() {
  return {
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: sanityConfig.useCdn
  };
}

export default sanityConfig;

