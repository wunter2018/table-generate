<template>
  <div class="nav-content">
    <div class="menu-content">
      <div class="menu-header" @click="clickBase">
        <span>基本字段</span>
        <i class="menu-icon" :class="layoutClass"></i>
      </div>
      <div class="divider-row"></div>
      <div v-if="layoutFlag">
        <draggable
          v-bind="{
            sort: false,
            group: { name: 'field', pull: 'clone', put: false },
          }"
          class="menu-body"
          v-model="baseList"
          :clone="clone"
        >
          <thumbnail
            v-for="element in baseList"
            :key="element.type"
            :name="element.name"
            :icon="element.icon.name"
            :type="element.icon.type"
          ></thumbnail>
        </draggable>
        <draggable
          v-bind="{
            sort: false,
            group: { name: 'field', pull: 'clone', put: false },
          }"
          :clone="clone"
          class="menu-body"
          v-model="layoutList"
        >
          <thumbnail
            v-for="element in layoutList"
            :key="element.type"
            :name="element.name"
            :icon="element.icon.name"
            :type="element.icon.type"
          ></thumbnail>
        </draggable>
      </div>
    </div>

    <div class="menu-content">
      <div class="menu-header" @click="clickJsonTree">
        <span>JSON树</span>
        <i class="menu-icon" :class="jsonTreeClass"></i>
      </div>
      <div class="divider-row"></div>
      <div id="json-tree-scroller">
        <json-tree v-if="jsonTreeFlag" :data="data"></json-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneItem } from '../../util/type'

export default {
  name: 'selecotr-view',
  data () {
    return {
      sortKey: 1,
      layoutFlag: true,
      jsonTreeFlag: true,
      jsonTreeHeight: 0
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    clone (item) {
      return cloneItem(item)
    },
    computeHeight () {
      this.$nextTick(() => {
        let totalHeight = document.body.offsetHeight
        let jsonTree = document.getElementById('json-tree-scroller')
        let footerHeight = document.getElementById('footerview').offsetHeight
        let height = totalHeight - footerHeight - jsonTree.offsetTop
        if (this.layoutFlag) height -= 20
        jsonTree.style.height = height + 'px'
      })
    },
    clickBase () {
      this.layoutFlag = !this.layoutFlag
      this.computeHeight()
    },
    clickJsonTree () {
      this.jsonTreeFlag = !this.jsonTreeFlag
      this.computeHeight()
    }
  },
  watch: {
    jsonTreeFlag: {
      handler (newVal) {
        if (newVal) {
          this.computeHeight()
        }
      },
      immediate: true
    }
  },
  computed: {
    baseList () {
      return this.list.filter(e => e.category === 'item')
    },
    layoutList () {
      return this.list.filter(e => e.category === 'layout')
    },
    layoutClass () {
      if (this.layoutFlag) return 'el-icon-arrow-down'
      else return 'el-icon-arrow-right'
    },
    jsonTreeClass () {
      if (this.jsonTreeFlag) return 'el-icon-arrow-down'
      else return 'el-icon-arrow-right'
    }
  }
}
</script>

<style scoped lang="scss">
.nav-content {
  padding: 0px 5px 0px 10px;
  overflow: hidden;
  .menu-content {
    padding-top: 10px;
    .menu-header {
      font-size: $text-small;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .menu-header:hover {
      cursor: pointer;
      @include hover_color("hover-color");
    }
    .menu-body {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0px;
      flex: 1;
    }
  }
}
</style>
