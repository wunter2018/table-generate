<template>
  <div
    class="table-layout"
    :class="chooseFlag ? 'choose' : ''"
    @click.stop="choose"
    :id="item.id"
  >
    <div class="drag" v-if="chooseFlag">
      <i class="el-icon-rank icon handle"></i>
    </div>
    <table class="table" :id="`${item.id}-table`">
      <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
        <template v-for="(column, columnIndex) in layoutModel[rowIndex].length">
          <td-layout
            :key="columnIndex"
            :item="layoutModel[rowIndex][columnIndex]"
            :rowIndex="rowIndex"
            :columnIndex="columnIndex"
            :tableRows="tableRows"
            :tableColumns="tableColumns"
            :mergeRowFlag="mergeRowFlag"
            :mergeColumnFlag="mergeColumnFlag"
            @mergeRow="mergeRow"
            @mergeColumn="mergeColumn"
            @insertRow="upInsertRow"
            @insertColumn="leftInsertColumn"
            @removeRow="removeRow"
            @removeColumn="removeColumn"
            @clickTd="clickTd"
          ></td-layout>
        </template>
      </tr>
    </table>
    <div class="nav" v-if="chooseFlag">
      <el-tooltip content="插入行" effect="light" :open-delay="tipDelay">
        <span class="formIcon form-icon--charuhang icon" @click="addRow"></span>
      </el-tooltip>
      <el-tooltip content="插入列" effect="light" :open-delay="tipDelay">
        <span
          class="formIcon form-icon--charulie icon"
          @click="addColumn"
        ></span>
      </el-tooltip>
      <el-tooltip content="删除表格" effect="light" :open-delay="tipDelay">
        <i class="el-icon-delete icon" @click="remove"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import TD from '../td/td'
import tdLayout from '../td/td_layout'

export default {
  name: 'table-layout',
  components: { tdLayout },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      layoutModel: this.item.children,
      chooseTableCell: '',
      tipDelay: 800,
      mergeRowFlag: false,
      mergeColumnFlag: false
    }
  },
  methods: {
    /* 表格操作 */
    // 选中表格
    choose () {
      this.$store.commit('SET_CHOOSEID', this.item.id)
    },
    // 新增列
    addColumn () {
      let index = 1
      for (let arr of this.layoutModel) {
        arr.push(new TD(index++, arr.length + 1))
      }
    },
    // 新增行
    addRow () {
      let list = []
      for (let index = 0; index < this.tableColumns; index++) {
        list.push(new TD(this.tableRows + 1, index + 1))
      }
      this.layoutModel.push(list)
    },
    // 删除表格
    remove () {
      this.$emit('remove', this.item.id)
    },

    /* 单元格操作 */
    clickTd (event) {
      let row = event.rowIndex
      let column = event.columnIndex
      let currentTd = this.layoutModel[row][column]
      this.mergeRowFlag = false
      if (row < this.tableRows - 1) {
        for (let index = 1; index <= currentTd.options.rowspan; index++) {
          if (this.layoutModel[row + index] && this.layoutModel[row + index][column] && this.layoutModel[row + index][column].options.visible && this.layoutModel[row + index][column].options.colspan === currentTd.options.colspan) {
            this.mergeRowFlag = true
          }
        }
      }
      this.mergeColumnFlag = false
      if (column < this.tableColumns - 1) {
        for (let index = 1; index <= currentTd.options.colspan; index++) {
          if (this.layoutModel[row][column + index] && this.layoutModel[row][column + index].options.visible && this.layoutModel[row][column + index].options.rowspan === currentTd.options.rowspan) {
            this.mergeColumnFlag = true
          }
        }
      }
    },
    // 向下融合单元格
    mergeRow (event) {
      let row = event.rowIndex
      let column = event.columnIndex
      let afterRow = row
      let afterColumn = column
      for (let index = 1; index <= this.layoutModel[row][column].options.rowspan; index++) {
        afterRow = row + index
        if (this.layoutModel[afterRow][afterColumn].options.visible) break
      }
      this.layoutModel[row][column].options.rowspan += this.layoutModel[afterRow][afterColumn].options.rowspan
      this.layoutModel[row][column].list = this.layoutModel[row][column].list.concat(this.layoutModel[afterRow][afterColumn].list)
      this.layoutModel[afterRow][afterColumn].list = []
      this.layoutModel[afterRow][afterColumn].options.visible = false
    },
    // 向右融合单元格
    mergeColumn (event) {
      let row = event.rowIndex
      let column = event.columnIndex
      let afterRow = row
      let afterColumn = column
      for (let index = 1; index <= this.layoutModel[row][column].options.colspan; index++) {
        afterColumn = column + index
        if (this.layoutModel[afterRow][afterColumn].options.visible) break
      }
      this.layoutModel[row][column].options.colspan += this.layoutModel[afterRow][afterColumn].options.colspan
      this.layoutModel[row][column].list = this.layoutModel[row][column].list.concat(this.layoutModel[afterRow][afterColumn].list)
      this.layoutModel[afterRow][afterColumn].list = []
      this.layoutModel[afterRow][afterColumn].options.visible = false
    },
    // 删除当前行
    removeRow (event) {
      this.layoutModel.splice(event.rowIndex, 1)
    },
    // 删除当前列
    removeColumn (event) {
      for (let arr of this.layoutModel) {
        arr.splice(event.columnIndex, 1)
      }
    },
    // 向上插入行
    upInsertRow (event) {
      let id = this.layoutModel[event.rowIndex][event.columnIndex].id
      let list = []
      for (let index = 0; index < this.tableColumns; index++) {
        list.push(new TD(this.tableRows + 1, index + 1))
      }
      let upModel = this.layoutModel.slice(0, event.rowIndex)
      let downModel = this.layoutModel.slice(event.rowIndex)
      let model = []
      if (Array.isArray(upModel)) {
        model = upModel.concat([list])
      } else {
        model = [list]
      }
      model = model.concat(downModel)
      this.layoutModel = model
      setTimeout(() => {
        this.$store.commit('SET_CHOOSEID', id)
      }, 0)
    },
    // 向上插入列
    leftInsertColumn (event) {
      let id = this.layoutModel[event.rowIndex][event.columnIndex].id
      let model = []
      for (let index = 0; index < this.layoutModel.length; index++) {
        let leftModel = this.layoutModel[index].slice(0, event.columnIndex)
        let rightModel = this.layoutModel[index].slice(event.columnIndex)
        let td = new TD(index + 1, this.layoutModel[index].length + 1)
        if (Array.isArray(leftModel)) {
          leftModel.push(td)
          model.push(leftModel.concat(rightModel))
        } else {
          model.push([td].concat(rightModel))
        }
      }
      this.layoutModel = model
      setTimeout(() => {
        this.$store.commit('SET_CHOOSEID', id)
      }, 0)
    }
  },
  watch: {
    item: {
      handler (newVal, oldVal) {
        this.layoutModel = newVal.children
      }
    },
    layoutModel: {
      handler (newVal) {
        if (this.$store.getters.formActionsFlag) {
          this.item.children = newVal
          this.$emit('children', this.item)
        }
        this.$nextTick(() => {
          let wrapper = document.getElementById(this.item.id)
          let table = document.getElementById(`${this.item.id}-table`)
          if (wrapper && table) {
            let style = getComputedStyle(table)
            wrapper.style.width = style.width
          }
        })
      },
      deep: true
    }
  },
  computed: {
    tableColumns () {
      return this.layoutModel[0].length
    },
    tableRows () {
      return this.layoutModel.length
    },
    chooseFlag () {
      if (this.$store.getters.chooseId === this.item.id) {
        this.$store.commit('SET_CHOOSEDATA', this.item)
        return true
      }
      return false
    }
  }
}
</script>

<style scoped lang="scss">
.base-icon {
  padding: 3px;
  font-size: 14px;
}
.base-big-icon {
  padding: 3px;
  font-size: 10px;
}

.table-layout {
  display: flex;
  margin: 4px 4px;
  padding: 5px;
  border: 1px dashed $border-color;
  border-radius: 2px;
  position: relative;
  background: $color-white;
  .drag {
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: 1000;
    @include background_color("table-border-color");
    color: $color-white;
    .icon {
      @extend .base-icon;
    }
  }
  .drag:hover {
    cursor: move;
  }

  .nav {
    position: absolute;
    right: -2px;
    bottom: -2px;
    z-index: 1000;
    @include background_color("table-border-color");
    color: $color-white;
    .icon {
      @extend .base-icon;
    }
  }
  .nav:hover {
    cursor: pointer;
  }

  .table {
    flex: 1;
    border: none;
    @include background_color("table-content-color");
    border-collapse: collapse;
  }
}

.layout:hover {
  border: 1px solid;
  @include background_color("table-content-color");
  @include border_color("table-border-color");
}
.choose {
  border: 2px solid !important;
  @include border_color("table-border-color");
}
.specilTd {
  text-align: center;
}
</style>
