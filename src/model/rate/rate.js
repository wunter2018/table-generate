export default class Radio {
  constructor () {
    this.thumbnail = {
      name: '评分',
      type: 'rate',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'rate'
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
      label: '评分',
      value: 0
    }
  }
}
