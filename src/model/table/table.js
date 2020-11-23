import TD from '../td/td'

export default class Table {
  constructor () {
    this.thumbnail = {
      name: '表格布局',
      type: 'table',
      category: 'layout',
      icon: {
        type: 'formIcon',
        name: 'table'
      }
    }

    this.name = this.thumbnail.name
    this.type = this.thumbnail.type
    this.category = this.thumbnail.category
    this.icon = this.thumbnail.icon

    this.children = [[new TD(1, 1)]]
    this.keys = []
    this.id = `${this.thumbnail.type}_${new Date().getTime()}`

    this.data = {
      showBorder: true,
      isometry: false,
      showIndex: false
    }
  }
}
