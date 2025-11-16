// 统一的内容模型 - 根据分类动态显示相关字段
export default {
  name: 'entry',
  title: '内容条目',
  type: 'document',
  
  // 字段分组
  fieldsets: [
    {
      name: 'basic',
      title: '基础信息',
      options: { collapsible: false }
    },
    {
      name: 'location',
      title: '📍 地理位置',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'person',
      title: '👤 人物信息',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'work',
      title: '📚 作品信息',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'media',
      title: '🖼️ 媒体资源',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'meta',
      title: '⚙️ 元数据',
      options: { collapsible: true, collapsed: true }
    }
  ],
  
  fields: [
    // === 核心字段（必填）===
    {
      name: 'title',
      title: '标题/名称',
      type: 'string',
      fieldset: 'basic',
      validation: Rule => Rule.required(),
      description: '女神名称、学者姓名、作品标题、遗址名称等'
    },
    {
      name: 'category',
      title: '分类',
      type: 'string',
      fieldset: 'basic',
      options: {
        list: [
          {title: '🗺️ 考古遗址', value: 'site'},
          {title: '⭐ 女神', value: 'goddess'},
          {title: '👤 学者', value: 'scholar'},
          {title: '📚 论著', value: 'work'},
          {title: '🏘️ 现存氏族', value: 'community'},
          {title: '📝 其他', value: 'other'}
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },

    // === 基础信息 ===
    {
      name: 'subtitle',
      title: '副标题/称号',
      type: 'string',
      fieldset: 'basic',
      description: '如：创世女神、蚕桑女神、红山文化等'
    },
    {
      name: 'subcategory',
      title: '子分类',
      type: 'string',
      fieldset: 'basic',
      options: {
        list: [
          // 考古遗址
          {title: '仰韶文化', value: 'yangshao'},
          {title: '河姆渡文化', value: 'hemudu'},
          {title: '红山文化', value: 'hongshan'},
          {title: '大汶口文化', value: 'dawenkou'},
          {title: '良渚文化', value: 'liangzhu'},
          // 女神类别
          {title: '创世女神', value: 'creation'},
          {title: '自然女神', value: 'nature'},
          {title: '文化女神', value: 'culture'},
          {title: '保护神', value: 'guardian'},
          // 学者地区
          {title: '中国学者', value: 'chinese'},
          {title: '西方学者', value: 'western'},
          // 论著分类
          {title: '经典著作', value: 'classic'},
          {title: '人类学', value: 'anthropology'},
          {title: '考古学', value: 'archaeology'},
          {title: '历史学', value: 'history'}
        ]
      },
      description: '更细的分类'
    },
    {
      name: 'summary',
      title: '简介',
      type: 'text',
      fieldset: 'basic',
      rows: 3,
      description: '一句话简介或概述（用于列表展示）'
    },
    {
      name: 'description',
      title: '详细描述',
      type: 'array',
      fieldset: 'basic',
      of: [{type: 'block'}],
      description: '支持富文本格式'
    },
    {
      name: 'tags',
      title: '标签',
      type: 'array',
      fieldset: 'basic',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: '用于分类和搜索的关键词'
    },

    // === 时间相关（遗址、女神、学者、论著都可能用到）===
    {
      name: 'dateRange',
      title: '年代/时期',
      type: 'string',
      fieldset: 'basic',
      description: '如：约公元前4800-3600年、上古时代、1818-1881',
      hidden: ({document}) => !['site', 'goddess', 'community'].includes(document?.category)
    },
    {
      name: 'year',
      title: '年份',
      type: 'number',
      fieldset: 'basic',
      description: '用于排序（如出版年份、出生年份）',
      hidden: ({document}) => !['work', 'scholar'].includes(document?.category)
    },

    // === 地理位置（仅遗址和现存氏族）===
    {
      name: 'coordinates',
      title: '地图坐标',
      type: 'geopoint',
      fieldset: 'location',
      description: '拖动地图标记或输入坐标',
      hidden: ({document}) => !['site', 'community'].includes(document?.category)
    },
    {
      name: 'region',
      title: '地区',
      type: 'string',
      fieldset: 'location',
      placeholder: '如：陕西西安、云南丽江',
      hidden: ({document}) => !['site', 'community'].includes(document?.category)
    },
    {
      name: 'address',
      title: '详细地址',
      type: 'string',
      fieldset: 'location',
      hidden: ({document}) => !['site', 'community'].includes(document?.category)
    },

    // === 人物相关字段（仅女神和学者）===
    {
      name: 'field',
      title: '领域/职能',
      type: 'string',
      fieldset: 'person',
      placeholder: '如：考古学、人类学、创世神话、农业神',
      description: '学者的研究领域或女神的主要职能',
      hidden: ({document}) => !['scholar', 'goddess'].includes(document?.category)
    },
    {
      name: 'institution',
      title: '所属机构/文化',
      type: 'string',
      fieldset: 'person',
      placeholder: '如：中央研究院、中国神话体系',
      description: '学者的工作单位或女神所属的文化体系',
      hidden: ({document}) => !['scholar', 'goddess'].includes(document?.category)
    },
    {
      name: 'birthYear',
      title: '出生年份',
      type: 'number',
      fieldset: 'person',
      hidden: ({document}) => document?.category !== 'scholar'
    },
    {
      name: 'deathYear',
      title: '逝世年份',
      type: 'number',
      fieldset: 'person',
      hidden: ({document}) => document?.category !== 'scholar'
    },
    {
      name: 'nationality',
      title: '国籍/民族',
      type: 'string',
      fieldset: 'person',
      hidden: ({document}) => !['scholar', 'goddess'].includes(document?.category)
    },
    {
      name: 'biography',
      title: '生平/神话',
      type: 'text',
      fieldset: 'person',
      rows: 5,
      description: '学者生平或女神神话故事',
      hidden: ({document}) => !['scholar', 'goddess'].includes(document?.category)
    },

    // === 作品相关字段（仅论著）===
    {
      name: 'author',
      title: '作者',
      type: 'string',
      fieldset: 'work',
      hidden: ({document}) => document?.category !== 'work'
    },
    {
      name: 'publisher',
      title: '出版社',
      type: 'string',
      fieldset: 'work',
      hidden: ({document}) => document?.category !== 'work'
    },
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      fieldset: 'work',
      hidden: ({document}) => document?.category !== 'work'
    },
    {
      name: 'pages',
      title: '页数',
      type: 'number',
      fieldset: 'work',
      hidden: ({document}) => document?.category !== 'work'
    },

    // === 考古遗址特有字段 ===
    {
      name: 'findings',
      title: '主要发现',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'basic',
      description: '重要文物或考古发现',
      hidden: ({document}) => document?.category !== 'site'
    },
    {
      name: 'excavationPeriod',
      title: '发掘时期',
      type: 'string',
      fieldset: 'basic',
      description: '如：1953-1957年',
      hidden: ({document}) => document?.category !== 'site'
    },

    // === 现存氏族特有字段 ===
    {
      name: 'population',
      title: '人口',
      type: 'string',
      fieldset: 'basic',
      placeholder: '如：约3万人',
      hidden: ({document}) => document?.category !== 'community'
    },
    {
      name: 'language',
      title: '语言',
      type: 'string',
      fieldset: 'basic',
      hidden: ({document}) => document?.category !== 'community'
    },

    // === 通用：代表作品/成就 ===
    {
      name: 'works',
      title: '代表作品/成就',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'basic',
      description: '学者的代表作品、女神的主要事迹等',
      hidden: ({document}) => ['site', 'work'].includes(document?.category)
    },

    // === 关联内容 ===
    {
      name: 'relatedItems',
      title: '相关内容',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'entry'}]
      }],
      fieldset: 'basic',
      description: '关联其他相关条目'
    },

    // === 媒体资源 ===
    {
      name: 'mainImage',
      title: '主图片',
      type: 'image',
      fieldset: 'media',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: '图片描述',
          type: 'string',
          description: '用于无障碍访问'
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
      fieldset: 'media',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {name: 'caption', title: '图片说明', type: 'string'},
          {name: 'alt', title: '图片描述', type: 'string'}
        ]
      }],
      hidden: ({document}) => !['site', 'community', 'goddess'].includes(document?.category)
    },

    // === 外部链接 ===
    {
      name: 'sourceLink',
      title: '来源链接',
      type: 'url',
      fieldset: 'meta',
      description: '主要参考来源或官方网站'
    },
    {
      name: 'externalLinks',
      title: '更多链接',
      type: 'array',
      fieldset: 'meta',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', title: '链接标题', type: 'string'},
          {name: 'url', title: 'URL', type: 'url'}
        ]
      }]
    },

    // === 元数据 ===
    {
      name: 'featured',
      title: '⭐ 重点展示',
      type: 'boolean',
      fieldset: 'meta',
      description: '在首页或列表顶部展示',
      initialValue: false
    },
    {
      name: 'status',
      title: '状态',
      type: 'string',
      fieldset: 'meta',
      options: {
        list: [
          {title: '✅ 已完成', value: 'complete'},
          {title: '📝 草稿', value: 'draft'},
          {title: '🔍 待完善', value: 'incomplete'}
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'notes',
      title: '内部备注',
      type: 'text',
      fieldset: 'meta',
      description: '内部备注，不在前端显示'
    }
  ],

  // 预览配置
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      category: 'category',
      subcategory: 'subcategory',
      media: 'mainImage'
    },
    prepare({title, subtitle, category, subcategory, media}) {
      const categoryEmoji = {
        site: '🗺️',
        goddess: '⭐',
        scholar: '👤',
        work: '📚',
        community: '🏘️',
        other: '📝'
      }
      
      const categoryName = {
        site: '考古遗址',
        goddess: '女神',
        scholar: '学者',
        work: '论著',
        community: '现存氏族',
        other: '其他'
      }
      
      return {
        title: `${categoryEmoji[category] || '📝'} ${title}`,
        subtitle: subtitle || subcategory || categoryName[category],
        media
      }
    }
  }
}
