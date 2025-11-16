// 古代母权社会 Schema - 基于 Google Sheets "古代母权社会（李雯）" 标签页
export default {
  name: 'ancientMatriarchalSociety',
  title: '古代母权社会',
  type: 'document',
  icon: () => '🏛️',
  fields: [
    // === 核心字段（对应 Google Sheets 列）===
    {
      name: 'clanName',
      title: '氏族名',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：良渚文化部落、红山文化部落'
    },
    {
      name: 'region',
      title: '分布地区',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：长江下游、内蒙古东部'
    },
    {
      name: 'population',
      title: '人口',
      type: 'string',
      description: '考古推测的大致人口规模'
    },
    {
      name: 'matriarchalFeatures',
      title: '母权或母系特征',
      type: 'text',
      rows: 4,
      description: '该古代社会的母权或母系特征证据'
    },
    {
      name: 'historicalOrigin',
      title: '历史渊源',
      type: 'array',
      of: [{type: 'block'}],
      description: '该古代氏族的历史背景和发展'
    },
    {
      name: 'religion',
      title: '宗教信仰',
      type: 'text',
      rows: 3,
      description: '该古代社会的宗教信仰和祭祀活动'
    },
    {
      name: 'notableFigures',
      title: '著名人物',
      type: 'array',
      of: [{type: 'string'}],
      description: '传说中的著名人物或历史记载'
    },
    {
      name: 'tribalGoddess',
      title: '民族女神',
      type: 'string',
      description: '该古代社会崇拜的女神名称'
    },
    {
      name: 'relatedResearch',
      title: '相关研究',
      type: 'text',
      rows: 3,
      description: '相关考古研究和学术文献'
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
      name: 'timePeriod',
      title: '时代',
      type: 'string',
      description: '例如：新石器时代晚期、青铜时代'
    },
    {
      name: 'startYear',
      title: '开始年份（BCE）',
      type: 'number',
      description: '公元前年份，数字越大表示越早'
    },
    {
      name: 'endYear',
      title: '结束年份（BCE）',
      type: 'number',
      description: '公元前年份，数字越小表示越晚'
    },
    {
      name: 'location',
      title: '地图坐标',
      type: 'geopoint',
      description: '用于在地图上标注位置'
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
      clanName: 'clanName',
      region: 'region',
      timePeriod: 'timePeriod',
      media: 'attachments.0'
    },
    prepare({clanName, region, timePeriod, media}) {
      return {
        title: clanName,
        subtitle: `${region} ${timePeriod ? `(${timePeriod})` : ''}`,
        media
      }
    }
  },
  orderings: [
    {
      title: '按氏族名',
      name: 'nameAsc',
      by: [
        {field: 'clanName', direction: 'asc'}
      ]
    },
    {
      title: '按时间（从古到今）',
      name: 'chronologicalAsc',
      by: [
        {field: 'startYear', direction: 'desc'}, // BCE 年份越大越早
        {field: 'clanName', direction: 'asc'}
      ]
    },
    {
      title: '按地区',
      name: 'regionAsc',
      by: [
        {field: 'region', direction: 'asc'}
      ]
    }
  ]
}

