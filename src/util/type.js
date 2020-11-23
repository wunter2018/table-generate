let modules = []
let typesContruct = []

const regexp = new RegExp(/^\.\/[a-z]+\/[a-z]+\.js$/)
const modulesFiles = require.context('../model', true, /\.js$/)
modulesFiles.keys().forEach(modulePath => {
  if (regexp.test(modulePath)) {
    const moduleName = modulePath.replace(/^\.\/[a-z]+\/(.*)\.\w+$/, '$1')
    const Construct = modulesFiles(modulePath).default
    typesContruct[moduleName] = Construct
    let temp = new Construct({
      name: '',
      type: '',
      category: '',
      icon: {}
    })
    if (temp.hasOwnProperty('thumbnail')) {
      modules.push(temp.thumbnail)
    }
  }
})

export default modules

export function cloneItem (item) {
  return new typesContruct[item.type]()
}

export function resetConfig (type, sourceConfig) {
  let config = new typesContruct[type]().config
  switch (type) {
    case 'input':
      config.showLabel = false
      config.showValue = false
      config.alignText = sourceConfig.alignText
      break
    case 'barcode':
      config.visiable = false
      break
  }
  return config
}

export function summary (result, category) {
  switch (category) {
    case 'sum':
      // eslint-disable-next-line no-eval
      return eval(result.join('+'))
    case 'average':
      // eslint-disable-next-line no-eval
      return eval(`(${result.join('+')})/${result.length}`)
    case 'min':
      return min(result)
    case 'max':
      return max(result)
  }
}

function min (result) {
  let temp = result[0]
  for (let num of result) {
    if (num < temp) temp = num
  }
  return temp
}
function max (result) {
  let temp = result[0]
  for (let num of result) {
    if (num > temp) temp = num
  }
  return temp
}
