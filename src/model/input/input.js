export default class Input {
  constructor (suffix = '') {
    this.thumbnail = {
      name: '单行文本',
      type: 'input',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'input'
      }
    }

    this.name = this.thumbnail.name
    this.type = this.thumbnail.type
    this.category = this.thumbnail.category
    this.icon = this.thumbnail.icon

    this.children = null
    this.keys = []
    this.id = `${this.thumbnail.type}_${new Date().getTime()}${suffix}`

    this.data = {
      label: '单行文本',
      value: '',
      separator: ''
    }

    this.config = {
      fontWeight: 'normal',
      fontFamily: '',
      alignText: 'center',
      showLabel: true,
      showValue: true,
      fontSize: 14,
      customClass: '',

      fontWeights: [
        { label: 'lighter', value: 'lighter' },
        { label: 'normal', value: 'normal' },
        { label: 'bold', value: 'bold' },
        { label: 'bolder', value: 'bolder' }
      ],
      fontFamilys: [
        { label: '默认', value: '' },
        { label: '黑体', value: 'Simhei' },
        { label: '宋体', value: 'SimSun' },
        { label: '楷体', value: 'KaiTi' },
        { label: '微软雅黑', value: 'Microsoft YaHei' },
        { label: '隶书', value: 'LiSu' }
      ],
      alignTexts: [
        { label: '左对齐', value: 'left' },
        { label: '中对齐', value: 'center' },
        { label: '右对齐', value: 'right' }
      ]
    }
  }
}
