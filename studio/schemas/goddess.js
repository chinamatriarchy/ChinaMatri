// 女神谱系 Schema - 基于 Google Sheets "女神谱系（Holly）" 标签页
export default {
  name: 'goddess',
  title: '女神谱系',
  type: 'document',
  icon: () => '👸',
  fields: [
    // === 核心字段（对应 Google Sheets 列）===
    {
      name: 'time',
      title: '时间',
      type: 'string',
      description: '例如：新石器时代、商周时期'
    },
    {
      name: 'name',
      title: '名字',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '女神名称，例如：女娲、西王母'
    },
    {
      name: 'role',
      title: '角色',
      type: 'string',
      description: '例如：创世女神、自然女神、保护神'
    },
    {
      name: 'relationships',
      title: '与其他神的关系',
      type: 'text',
      rows: 3,
      description: '描述与其他神祇的关系'
    },
    {
      name: 'story',
      title: '故事',
      type: 'array',
      of: [{type: 'block'}],
      description: '女神的神话故事详细内容'
    },
    {
      name: 'mythologySource',
      title: '神话出处',
      type: 'string',
      description: '例如：《山海经》、《淮南子》'
    },
    {
      name: 'note',
      title: '标注',
      type: 'text',
      rows: 2,
      description: '额外的说明或备注'
    },
    {
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: '相关参考资料链接'
    },
    {
      name: 'attachments',
      title: '附件/图片',
      type: 'array',
      of: [
        {
          type: 'image',
          title: '图片',
          options: {
            hotspot: true
          }
        },
        {
          type: 'file',
          title: '文件'
        }
      ]
    },
    
    // === 额外有用的字段 ===
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
          {title: '其他', value: 'other'}
        ]
      }
    },
    {
      name: 'region',
      title: '相关地区',
      type: 'string',
      description: '女神崇拜的主要地区'
    }
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      time: 'time',
      media: 'attachments.0'
    },
    prepare({name, role, time, media}) {
      return {
        title: name,
        subtitle: `${role || ''} ${time ? `(${time})` : ''}`,
        media
      }
    }
  },
  orderings: [
    {
      title: '按名字',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: '按时间',
      name: 'timeAsc',
      by: [
        {field: 'time', direction: 'asc'}
      ]
    }
  ]
}

