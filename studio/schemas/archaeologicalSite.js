// 考古遗址 Schema
export default {
  name: 'archaeologicalSite',
  title: '考古遗址',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '遗址名称',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'period',
      title: '文化时期',
      type: 'string',
      options: {
        list: [
          {title: '仰韶文化', value: 'yangshao'},
          {title: '河姆渡文化', value: 'hemudu'},
          {title: '红山文化', value: 'hongshan'},
          {title: '大汶口文化', value: 'dawenkou'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'periodName',
      title: '文化时期名称',
      type: 'string'
    },
    {
      name: 'location',
      title: '地理位置',
      type: 'geopoint',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: '年代',
      type: 'string',
      description: '例如：约公元前4800-3600年'
    },
    {
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 4
    },
    {
      name: 'findings',
      title: '主要发现',
      type: 'string',
      description: '用逗号分隔，例如：彩陶、石器、房屋遗址'
    },
    {
      name: 'image',
      title: '图片',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'region',
      title: '所在区域',
      type: 'string'
    },
    {
      name: 'sourceLink',
      title: '参考资料链接',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'periodName',
      media: 'image'
    }
  }
}

