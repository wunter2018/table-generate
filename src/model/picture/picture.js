export default class Picture {
  constructor () {
    this.thumbnail = {
      name: '图片',
      type: 'picture',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'picture'
      }
    }
    this.name = this.thumbnail.name
    this.type = this.thumbnail.type
    this.category = this.thumbnail.category
    this.icon = this.thumbnail.icon

    this.children = null
    this.keys = []
    this.id = `${this.thumbnail.type}_${new Date().getTime()}`

    this.data = {
      src: '',
      placeholder: '未找到图片',
      list: []
    }
    this.config = {
      fit: 'fill',
      fits: [
        {
          label: 'fill',
          value: 'fill'
        },
        {
          label: 'contain',
          value: 'contain'
        },
        {
          label: 'cover',
          value: 'cover'
        },
        {
          label: 'none',
          value: 'none'
        },
        {
          label: 'scale-down',
          value: 'scale-down'
        }
      ]
    }
  }
}
