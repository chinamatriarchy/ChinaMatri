// 女神 Schema
export default {
  name: 'goddess',
  title: '女神',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '女神名称',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: '类别',
      type: 'string',
      options: {
        list: [
          {title: '创世女神', value: 'creation'},
          {title: '自然女神', value: 'nature'},
          {title: '文化女神', value: 'culture'},
          {title: '保护神', value: 'guardian'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'categoryName',
      title: '类别名称',
      type: 'string'
    },
    {
      name: 'title',
      title: '称号',
      type: 'string',
      description: '例如：创世女神、海上女神'
    },
    {
      name: 'summary',
      title: '简介',
      type: 'text',
      rows: 2
    },
    {
      name: 'description',
      title: '详细描述',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'mythology',
      title: '神话故事',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'historicalSignificance',
      title: '历史意义',
      type: 'array',
      of: [{type: 'block'}]
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
      name: 'relatedCultures',
      title: '相关文化',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'sourceLink',
      title: '参考资料',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image'
    }
  }
}

