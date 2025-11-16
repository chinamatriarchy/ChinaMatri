// 相关论著 Schema - 基于 Google Sheets "相关论著(Pei Pei/艺帆)" 标签页
export default {
  name: 'publication',
  title: '相关论著',
  type: 'document',
  icon: () => '📚',
  fields: [
    // === 核心字段（对应 Google Sheets 列）===
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '书名或论文标题'
    },
    {
      name: 'year',
      title: '著作年份',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：2005'
    },
    {
      name: 'researchDynasty',
      title: '著作研究朝代',
      type: 'string',
      description: '例如：商朝、周朝、现代'
    },
    {
      name: 'category',
      title: '类别',
      type: 'string',
      options: {
        list: [
          {title: '人类学', value: '人类学'},
          {title: '经济史', value: '经济史'},
          {title: '民族学', value: '民族学'},
          {title: '考古学', value: '考古学'},
          {title: '社会学', value: '社会学'},
          {title: '历史学', value: '历史学'},
          {title: '其他', value: '其他'}
        ]
      }
    },
    {
      name: 'author',
      title: '作者',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：张三'
    },
    {
      name: 'source',
      title: '来源',
      type: 'string',
      description: '出版社或期刊名称，例如：中华人类学刊'
    },
    {
      name: 'abstract',
      title: '摘要',
      type: 'text',
      rows: 4,
      description: '论著内容摘要'
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: '论著在线链接'
    },
    {
      name: 'attachments',
      title: '附件/图片',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'PDF或其他文件',
          options: {
            accept: '.pdf,.doc,.docx'
          }
        },
        {
          type: 'image',
          title: '图片',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: '多个标签用回车分隔，例如：部落社会、礼物经济'
    },
    
    // === 额外有用的字段 ===
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      description: '书籍的 ISBN 号（如果是书籍）'
    },
    {
      name: 'publisher',
      title: '出版社',
      type: 'string',
      description: '正式出版社名称（如果是书籍）'
    },
    {
      name: 'purchaseLink',
      title: '购买链接',
      type: 'url',
      description: '在线购买地址'
    },
    {
      name: 'coverImage',
      title: '封面图片',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      year: 'year',
      category: 'category',
      media: 'coverImage'
    },
    prepare({title, author, year, category, media}) {
      return {
        title: title,
        subtitle: `${author} (${year}) - ${category || ''}`,
        media
      }
    }
  },
  orderings: [
    {
      title: '按年份（从新到旧）',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'}
      ]
    },
    {
      title: '按年份（从旧到新）',
      name: 'yearAsc',
      by: [
        {field: 'year', direction: 'asc'}
      ]
    },
    {
      title: '按标题',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: '按作者',
      name: 'authorAsc',
      by: [
        {field: 'author', direction: 'asc'}
      ]
    }
  ]
}

