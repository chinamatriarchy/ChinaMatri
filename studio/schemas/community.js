// 现存氏族 Schema
export default {
  name: 'community',
  title: '现存氏族',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '民族/族群名称',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'region',
      title: '地理位置',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: '精确位置',
      type: 'geopoint'
    },
    {
      name: 'population',
      title: '人口',
      type: 'string',
      description: '例如：约5-6万人'
    },
    {
      name: 'summary',
      title: '概述',
      type: 'text',
      rows: 3
    },
    {
      name: 'description',
      title: '详细介绍',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'familyStructure',
      title: '家庭结构',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'marriageSystem',
      title: '婚姻制度',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'inheritance',
      title: '财产继承',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'modernChanges',
      title: '当代变迁',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'images',
      title: '图片集',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}]
    },
    {
      name: 'featured',
      title: '重点展示',
      type: 'boolean',
      description: '是否在首页重点展示'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'region',
      media: 'images.0'
    }
  }
}

