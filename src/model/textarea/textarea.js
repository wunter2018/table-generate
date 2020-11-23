export default class Textarea {
  constructor (item) {
    this.thumbnail = {
      name: '多行文本',
      type: 'textarea',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'textarea'
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
      label: '多行文本',
      value: ''
    }
  }
}
