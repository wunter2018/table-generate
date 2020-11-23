export default class Checkbox {
  constructor () {
    this.thumbnail = {
      name: '多选框',
      type: 'checkbox',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'checkbox'
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
      label: '复选框',
      value: [],
      options: [
        {
          value: '备选项1',
          disabled: false
        },
        {
          value: '备选项2',
          disabled: false
        },
        {
          value: '备选项3',
          disabled: false
        }
      ]
    }
  }
}
