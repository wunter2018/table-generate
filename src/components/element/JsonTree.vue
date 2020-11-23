<template>
  <div class="scroller">
    <json-tree-node
      :nodeData="rootNode"
      :jsonData="jsonData"
      :parentName="''"
    ></json-tree-node>
  </div>
</template>

<script>
import JsonTreeNode from './JsonTreeNode'

export default {
  name: 'json-tree',
  components: {
    JsonTreeNode
  },
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      jsonData: [],
      rootNode: {}
    }
  },
  methods: {
    parseJson (data, times, prefix) {
      for (let key of Object.keys(data)) {
        let value = data[key]
        if (value && typeof value === 'object') {
          if (Array.isArray(value)) {
            if (typeof value[0] === 'object') {
              this.parseJson(value[0], times, `${key}.`)
            } else {
              this.jsonData.push({
                label: key,
                key: `${prefix}${key}`,
                value: value,
                count: times[`${prefix}${key}`] || 0
              })
            }
          } else {
            this.parseJson(value, times, `${key}.`)
          }
        } else {
          this.jsonData.push({
            label: key,
            key: `${prefix}${key}`,
            value: value || '',
            count: times[`${prefix}${key}`] || 0
          })
        }
      }
    },
    generateNodes () {
      let rootNode = JSON.parse(JSON.stringify(this.rootNode))
      for (let nodeInfo of this.jsonData) {
        let root = rootNode
        for (let key of nodeInfo.key.split('.')) {
          if (!root.hasOwnProperty(key)) {
            root[key] = {}
          }
          root = root[key]
        }
      }
      this.rootNode = rootNode
    }
  },
  computed: {
    bindedKeys () {
      return this.$store.getters.bindedKeys
    }
  },
  watch: {
    bindedKeys: {
      handler (newVal) {
        this.jsonData = []
        let times = this.bindedKeys.reduce((prev, next) => {
          prev[next] = (prev[next] + 1) || 1
          return prev
        }, {})
        this.parseJson(this.data, times, '')
        this.generateNodes()
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.scroller {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}
.scroller::-webkit-scrollbar {
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: red;
}
.scroller::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
.scroller::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}
</style>
