export default class Radio {
  constructor () {
    this.thumbnail = {
      name: '单选框',
      type: 'radio',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'radio'
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
      label: '单选框',
      value: '1',
      options: [
        {
          value: '1',
          label: '备选项1'
        },
        {
          value: '2',
          label: '备选项2'
        },
        {
          value: '3',
          label: '备选项3'
        }
      ]
    }
  }
}
