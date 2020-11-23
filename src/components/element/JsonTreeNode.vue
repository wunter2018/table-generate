<template>
  <div>
    <template v-if="this.leafList.length > 0 && showChilren">
      <draggable
        v-bind="{
          group: { name: 'json-tree', pull: 'clone', put: false },
          animation: 200,
          sort: false,
        }"
        v-model="leafList"
      >
        <transition-group name="fade" tag="div" class="transition">
          <template v-for="element in leafList">
            <div class="draggable" :key="element.key">
              <div class="key">
                <span
                  class="formIcon form-icon-input"
                  style="margin-right: 2px"
                ></span
                >{{ element.label }}
              </div>
              <div>{{ element.count }}</div>
            </div>
          </template>
        </transition-group>
      </draggable>
    </template>
    <template v-for="item in parentList">
      <div :key="`${item.parentName}${item.name}`">
        <div @click="handleClick(item)" class="head">
          <i
            v-if="!item.showChilren"
            class="el-icon-arrow-right"
            style="margin-right: 5px"
          ></i>
          <i v-else class="el-icon-arrow-down" style="margin-right: 5px"></i>
          <span>{{ item.name }}</span>
        </div>
        <div class="content">
          <json-tree-node
            :nodeData="item.nodeData"
            :jsonData="
              jsonData.filter(
                (element) =>
                  element.key.indexOf(`${parentName}${item.name}`) === 0
              )
            "
            :parentName="item.parentName"
            :showChilren="item.showChilren"
          ></json-tree-node>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'json-tree-node',
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    jsonData: {
      type: Array,
      required: true
    },
    parentName: {
      type: String,
      required: true
    },
    showChilren: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      leafList: [],
      parentList: []
    }
  },
  methods: {
    isEmptyObject (obj) {
      return Object.keys(obj).length === 0
    },
    handleClick (item) {
      item.showChilren = !item.showChilren
    }
  },
  watch: {
    jsonData: {
      handler (newVal) {
        if (newVal.length > 0) {
          let leafList = []
          for (let key of Object.keys(this.nodeData)) {
            if (this.isEmptyObject(this.nodeData[key])) {
              leafList = leafList.concat(newVal.filter(item => item.label === key))
            }
          }
          this.leafList = leafList
        }
      }
    }
  },
  mounted () {
    let leafList = []
    let parentList = []
    for (let key of Object.keys(this.nodeData)) {
      if (this.isEmptyObject(this.nodeData[key])) {
        leafList = leafList.concat(this.jsonData.filter(item => item.label === key))
      } else {
        parentList.push({
          name: key,
          parentName: `${this.parentName}${key}.`,
          showChilren: false,
          nodeData: this.nodeData[key]
        })
      }
    }
    this.leafList = leafList
    this.parentList = parentList
  }
}
</script>

<style scoped lang="scss">
.draggable {
  padding: 5px 10px;
  margin: 10px 0px;
  font-size: $text-mini;
  border: 1px dashed;
  border-radius: 2px;
  border-color: $item-color;
  color: $color-black;
  display: flex;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
  .key {
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.draggable:hover {
  cursor: move;
  @include border_color("hover-color");
  @include background_color("hover-color");
  color: $color-white;
  border: 1px dashed;
}

.head {
  font-size: $text-small;
  display: flex;
  align-items: center;
  padding: 6px;
  margin: 2px;
}
.head:hover {
  cursor: pointer;
  color: $color-white;
  @include background_color("hover-color");
}
.content {
  margin-left: 30px;
  margin-right: 20px;
}
</style>
