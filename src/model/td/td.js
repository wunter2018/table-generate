class TD {
  constructor (row, column, suffix = '') {
    this.type = 'td'
    this.id = `td_${new Date().getTime()}${row}${column}${suffix}`
    this.category = 'layout'
    this.options = {
      colspan: 1,
      rowspan: 1,
      visible: true,
      isheader: false,
      isfooter: false,
      type: 'normal',
      label: '',
      summaryCategory: 'sum',
      width: 100,
      height: 20,
      keys: []
    }
    this.list = []
    this.summaryCategorys = [
      {
        label: 'sum',
        value: 'sum'
      },
      {
        label: 'average',
        value: 'average'
      },
      {
        label: 'max',
        value: 'max'
      },
      {
        label: 'min',
        value: 'min'
      }
    ]
    this.types = [
      {
        label: '一般格',
        value: 'normal'
      },
      {
        label: '文字格',
        value: 'text'
      },
      {
        label: '序号格',
        value: 'index'
      },
      {
        label: '汇总格',
        value: 'summary'
      }
    ]
  }
}

export default TD
