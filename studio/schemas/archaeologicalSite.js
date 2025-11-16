// 考古遗址/时间线 Schema - 基于 Google Sheets 数据结构
export default {
  name: 'archaeologicalSite',
  title: '母系考古/时间线',
  type: 'document',
  fields: [
    // === 核心字段（对应 Google Sheets 的四列）===
    {
      name: 'location',
      title: '地点',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：陕西临潼姜寨、宝鸡北首岭'
    },
    {
      name: 'cultureSite',
      title: '文化/遗址',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：仰韶文化、龙山文化、良渚文化'
    },
    {
      name: 'era',
      title: '年代',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '例如：公元前5000–4000年、公元前2500–1900年'
    },
    {
      name: 'socialCharacteristics',
      title: '社会与权力特征',
      type: 'text',
      validation: Rule => Rule.required(),
      rows: 3,
      description: '例如：母系，村落自治，无人祭'
    },

    // === 扩展字段（用于排序和展示）===
    {
      name: 'startYear',
      title: '开始年份（BCE）',
      type: 'number',
      description: '用于时间线排序，例如：5000 表示公元前5000年',
      validation: Rule => Rule.min(-10000).max(2000)
    },
    {
      name: 'endYear',
      title: '结束年份（BCE）',
      type: 'number',
      description: '用于时间线排序，例如：4000 表示公元前4000年',
      validation: Rule => Rule.min(-10000).max(2000)
    },

    // === 详细信息（可选）===
    {
      name: 'description',
      title: '详细描述',
      type: 'array',
      of: [{type: 'block'}],
      description: '遗址的详细介绍（可选）'
    },
    {
      name: 'coordinates',
      title: '地图坐标',
      type: 'geopoint',
      description: '用于在地图上标注位置'
    },
    {
      name: 'region',
      title: '区域分类',
      type: 'string',
      options: {
        list: [
          {title: '黄河流域', value: 'yellow-river'},
          {title: '长江流域', value: 'yangtze-river'},
          {title: '东北地区', value: 'northeast'},
          {title: '西北地区', value: 'northwest'},
          {title: '华南地区', value: 'south'},
          {title: '西南地区', value: 'southwest'}
        ]
      },
      description: '地理区域分类'
    },
    {
      name: 'cultureType',
      title: '文化类型',
      type: 'string',
      options: {
        list: [
          {title: '仰韶文化', value: 'yangshao'},
          {title: '河姆渡文化', value: 'hemudu'},
          {title: '红山文化', value: 'hongshan'},
          {title: '大汶口文化', value: 'dawenkou'},
          {title: '良渚文化', value: 'liangzhu'},
          {title: '龙山文化', value: 'longshan'},
          {title: '石峁文化', value: 'shimao'},
          {title: '屈家岭文化', value: 'qujialing'},
          {title: '石家河文化', value: 'shijiahe'},
          {title: '二里头文化', value: 'erlitou'},
          {title: '二里岗文化', value: 'erligang'},
          {title: '其他', value: 'other'}
        ]
      },
      description: '考古学文化分类'
    },
    {
      name: 'societyType',
      title: '社会类型标签',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '母系社会', value: '母系'},
          {title: '父系社会', value: '父系'},
          {title: '平等社会', value: '平等'},
          {title: '等级社会', value: '等级'},
          {title: '无人祭', value: '无人祭'},
          {title: '人祭', value: '人祭'},
          {title: '人殉', value: '人殉'},
          {title: '冲突', value: '冲突'},
          {title: '城墙', value: '城墙'},
          {title: '宫殿', value: '宫殿'}
        ]
      },
      description: '用于筛选和分类'
    },
    {
      name: 'mainFindings',
      title: '主要发现',
      type: 'array',
      of: [{type: 'string'}],
      description: '重要考古发现，例如：彩陶、石器、房屋遗址'
    },
    {
      name: 'excavationInfo',
      title: '发掘信息',
      type: 'text',
      rows: 2,
      description: '发掘时间、发掘单位等信息'
    },

    // === 媒体资源 ===
    {
      name: 'mainImage',
      title: '主图片',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: '图片描述',
          type: 'string'
        },
        {
          name: 'caption',
          title: '图片说明',
          type: 'string'
        }
      ]
    },
    {
      name: 'gallery',
      title: '图片集',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {name: 'caption', title: '图片说明', type: 'string'},
          {name: 'alt', title: '图片描述', type: 'string'}
        ]
      }]
    },

    // === 参考资料 ===
    {
      name: 'sourceLink',
      title: '参考资料链接',
      type: 'url'
    },
    {
      name: 'references',
      title: '参考文献',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', title: '文献标题', type: 'string'},
          {name: 'url', title: 'URL', type: 'url'},
          {name: 'notes', title: '备注', type: 'text', rows: 2}
        ]
      }]
    },

    // === 关联内容 ===
    {
      name: 'relatedGoddesses',
      title: '相关女神',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'goddess'}]
      }],
      description: '与此遗址相关的女神信仰'
    },
    {
      name: 'relatedScholars',
      title: '相关学者',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'scholar'}]
      }],
      description: '研究此遗址的主要学者'
    },

    // === 元数据 ===
    {
      name: 'featured',
      title: '⭐ 重点展示',
      type: 'boolean',
      description: '在时间线上重点标注',
      initialValue: false
    },
    {
      name: 'importance',
      title: '重要程度',
      type: 'string',
      options: {
        list: [
          {title: '🔴 特别重要', value: 'critical'},
          {title: '🟠 重要', value: 'high'},
          {title: '🟡 一般', value: 'medium'},
          {title: '⚪ 参考', value: 'low'}
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'notes',
      title: '内部备注',
      type: 'text',
      description: '内部备注，不在前端显示'
    }
  ],

  // 预览配置
  preview: {
    select: {
      location: 'location',
      cultureSite: 'cultureSite',
      era: 'era',
      media: 'mainImage'
    },
    prepare({location, cultureSite, era, media}) {
      return {
        title: `${location} - ${cultureSite}`,
        subtitle: era,
        media
      }
    }
  },

  // 排序：按时间从古到今
  orderings: [
    {
      title: '按时间（从古到今）',
      name: 'chronologicalAsc',
      by: [
        {field: 'startYear', direction: 'desc'}, // BCE 年份越大越早
        {field: 'location', direction: 'asc'}
      ]
    },
    {
      title: '按时间（从今到古）',
      name: 'chronologicalDesc',
      by: [
        {field: 'startYear', direction: 'asc'},
        {field: 'location', direction: 'asc'}
      ]
    },
    {
      title: '按地点',
      name: 'locationAlphabetical',
      by: [
        {field: 'location', direction: 'asc'}
      ]
    }
  ]
}

