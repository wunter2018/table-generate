export default class Switch {
  constructor () {
    this.thumbnail = {
      name: '开关',
      type: 'switch',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'switch'
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
      label: '开关',
      value: true
    }
  }
}
