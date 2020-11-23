export default class Barcode {
  constructor () {
    this.thumbnail = {
      name: '条码',
      type: 'barcode',
      category: 'item',
      icon: {
        type: 'formIcon',
        name: 'barcode'
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
      label: '条码',
      value: '12345'
    }

    this.config = {
      format: 'code128',
      scale: 1,
      height: 20,
      width: 20,
      displayValue: false,
      type: 'barcode',
      visiable: true,

      formats: [
        { label: 'code128', value: 'code128', type: 'barcode' },
        { label: 'code39', value: 'code39', type: 'barcode' },
        { label: 'qrcode', value: 'qrcode', type: 'tbcode' },
        { label: 'pdf417', value: 'pdf417', type: 'tbcode' },
        { label: 'datamatrix', value: 'datamatrix', type: 'tbcode' }
      ],
      types: [
        { label: '一维码', value: 'barcode' },
        { label: '二维码', value: 'tbcode' }
      ]
    }
  }
}

// const format = ['code128', 'code39', 'qrcode', 'pdf417', 'datamatrix']
