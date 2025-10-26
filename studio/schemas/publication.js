// 论著 Schema
export default {
  name: 'publication',
  title: '论著',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '书名/论文标题',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: '作者',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: '出版年份',
      type: 'string'
    },
    {
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          {title: '经典著作', value: 'classic'},
          {title: '中国研究', value: 'chinese'},
          {title: '人类学', value: 'anthropology'},
          {title: '考古学', value: 'archaeology'},
        ]
      }
    },
    {
      name: 'description',
      title: '简介',
      type: 'text',
      rows: 4
    },
    {
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'coverImage',
      title: '封面图片',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string'
    },
    {
      name: 'publisher',
      title: '出版社',
      type: 'string'
    },
    {
      name: 'purchaseLink',
      title: '购买链接',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'coverImage'
    }
  }
}

