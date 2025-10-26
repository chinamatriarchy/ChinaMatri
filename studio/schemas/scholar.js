// 学者 Schema
export default {
  name: 'scholar',
  title: '学者',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'region',
      title: '地区',
      type: 'string',
      options: {
        list: [
          {title: '中国学者', value: 'chinese'},
          {title: '西方学者', value: 'western'},
        ]
      }
    },
    {
      name: 'field',
      title: '研究领域',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'institution',
      title: '所属机构',
      type: 'string'
    },
    {
      name: 'description',
      title: '简介',
      type: 'text',
      rows: 4
    },
    {
      name: 'works',
      title: '代表作品',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'photo',
      title: '照片',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'birthYear',
      title: '出生年份',
      type: 'number'
    },
    {
      name: 'deathYear',
      title: '逝世年份',
      type: 'number'
    },
    {
      name: 'website',
      title: '个人网站',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'field',
      media: 'photo'
    }
  }
}

