<template>
  <td
    v-if="item.options.visible"
    :rowspan="item.options.rowspan"
    :colspan="item.options.colspan"
    :class="chooseFlag ? 'choose' : ''"
    @click.stop="clickTd"
  >
    <!-- 单元格菜单栏 -->
    <div class="td-nav" v-if="chooseFlag">
      <el-tooltip
        content="向下合并"
        effect="light"
        v-if="mergeRowFlag"
        :open-delay="tipDelay"
      >
        <span class="formIcon form-icon-mergeRow icon" @click="mergeRow"></span>
      </el-tooltip>

      <el-tooltip
        content="向右合并"
        effect="light"
        v-if="mergeColumnFlag"
        :open-delay="tipDelay"
      >
        <span
          class="formIcon form-icon-mergeColumn icon"
          @click="mergeColumn"
        ></span>
      </el-tooltip>

      <el-tooltip content="上插入行" effect="light" :open-delay="tipDelay">
        <span
          class="formIcon form-icon-charuhang icon"
          @click="insertRow"
        ></span>
      </el-tooltip>

      <el-tooltip content="左插入列" effect="light" :open-delay="tipDelay">
        <span
          class="formIcon form-icon-charulie icon"
          @click="insertColumn"
        ></span>
      </el-tooltip>

      <el-tooltip
        content="删除当前行"
        effect="light"
        v-if="tableRows > 1"
        :open-delay="tipDelay"
      >
        <span
          class="formIcon form-icon-shanchuhang icon"
          @click="removeRow"
        ></span>
      </el-tooltip>

      <el-tooltip
        content="删除当前列"
        effect="light"
        v-if="tableColumns > 1"
        :open-delay="tipDelay"
      >
        <span
          class="formIcon form-icon-shanchulie icon"
          @click="removeColumn"
        ></span>
      </el-tooltip>
    </div>

    <template v-if="item.options.type === 'normal'">
      <!-- 可拖拽区域 -->
      <draggable
        v-bind="{
          group: 'field',
          animation: 200,
        }"
        class="formGroup"
        handle=".handle"
        v-model="item.list"
      >
        <transition-group class="transition">
          <template v-if="item.list.length > 0">
            <selector
              v-for="item in item.list"
              :key="item.id"
              :item="item"
              @remove="remove"
            ></selector>
          </template>
        </transition-group>
      </draggable>
    </template>
    <template v-if="item.options.type === 'index'">
      <div class="specilTd">序号</div>
    </template>
    <template v-if="item.options.type === 'text'">
      <div class="specilTd">
        {{ item.options.label }}
      </div>
    </template>
    <template v-if="item.options.type === 'summary'">
      <div class="specilTd">汇总</div>
    </template>
  </td>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    },
    rowIndex: {
      required: true,
      type: Number
    },
    columnIndex: {
      required: true,
      type: Number
    },
    tableRows: {
      required: true,
      type: Number
    },
    tableColumns: {
      required: true,
      type: Number
    },
    mergeRowFlag: {
      required: true,
      type: Boolean
    },
    mergeColumnFlag: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      tipDelay: 800
    }
  },
  watch: {
    'item.list' (newVal, oldVal) {
      if (newVal && oldVal && newVal.length > oldVal.length) {
        let id = newVal[newVal.length - 1].id
        if (id) this.$store.commit('SET_CHOOSEID', id)
      }
    }
  },
  computed: {
    chooseFlag () {
      if (this.$store.getters.chooseId === this.item.id) {
        this.$store.commit('SET_CHOOSEDATA', this.item)
        return true
      }
      return false
    }
  },
  methods: {
    mergeRow () {
      this.$emit('mergeRow', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    },
    mergeColumn () {
      this.$emit('mergeColumn', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    },
    insertRow () {
      this.$emit('insertRow', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    },
    insertColumn () {
      this.$emit('insertColumn', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    },
    removeRow () {
      this.$emit('removeRow', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    },
    removeColumn () {
      this.$emit('removeColumn', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    },
    remove (id) {
      let list = []
      for (let temp of this.item.list) {
        if (temp.id !== id) list.push(temp)
      }
      this.item.list = list
    },
    clickTd () {
      this.$emit('clickTd', { rowIndex: this.rowIndex, columnIndex: this.columnIndex })
      this.$store.commit('SET_CHOOSEID', this.item.id)
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

td {
  border: 1px solid $table-border-color;
  min-width: 60px;
  flex: 1;
  position: relative;
  padding: 5px;
  .formGroup {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px dashed $border-color;
    .transition {
      position: relative;
      background: $cell-color;
      min-height: $element-height;
    }
  }
  .td-nav {
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 1000;
    @include background_color("td-border-color");
    color: $color-white;
    .icon {
      @extend .base-big-icon;
    }
  }
  .td-nav:hover {
    cursor: pointer;
  }
}
.choose {
  border: 2px solid !important;
  @include border_color("td-border-color");
}
td:hover {
  border: 1px solid;
  @include border_color("td-border-color");
}
</style>
