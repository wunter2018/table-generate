export default class Radio {
  constructor () {
    this.thumbnail = {
      name: '滑块',
      type: 'slider',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'slider'
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
      label: '滑块',
      value: 0,
      showTooltip: true
    }
  }
}
