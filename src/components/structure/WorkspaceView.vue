<template>
  <div class="main-content" ref="workspace">
    <div class="tools-bar">
      <div class="tool" @click="generateTemplate = !generateTemplate">
        <el-button type="text" class="button"
          ><i class="el-icon-document tool-icon"></i>生成模板</el-button
        >
      </div>
      <div class="tool" @click="importTemplate = !importTemplate">
        <el-button type="text" class="button"
          ><i class="el-icon-tickets tool-icon"></i>导入模板</el-button
        >
      </div>
      <div class="tool" @click="importJSONData = !importJSONData">
        <el-button type="text" class="button"
          ><i class="el-icon-tickets tool-icon"></i>导入JSON文件</el-button
        >
      </div>
      <div class="tool" @click="preview = !preview">
        <el-button type="text" class="button"
          ><i class="el-icon-view tool-icon"></i>预览</el-button
        >
      </div>
      <div class="tool" @click="nextFormAction">
        <el-button type="text" :disabled="!isNextable" class="button"
          ><i class="el-icon-right tool-icon"></i>重做</el-button
        >
      </div>
      <div class="tool" @click="prevFormAction">
        <el-button type="text" :disabled="!isPrevable" class="button"
          ><i class="el-icon-back tool-icon"></i>撤销</el-button
        >
      </div>
    </div>
    <div class="divider-row"></div>

    <draggable
      v-bind="{
        group: 'field',
        animation: 200,
      }"
      class="draggable-area"
      v-model="modelData"
      handle=".handle"
    >
      <transition-group name="fade" tag="div" class="transition">
        <div
          v-if="modelData.length === 0"
          class="notice"
          key="transition-notice"
        >
          <i class="el-icon-connection notice-icon"></i>
          <div class="notice-placeholder"></div>
          <div class="notice-text">将节点拖拽到此处</div>
        </div>
        <selector
          v-else
          v-for="item in modelData"
          :key="item.id"
          :item="item"
          @remove="remove"
          @children="children"
        ></selector>
      </transition-group>
    </draggable>

    <el-dialog :visible.sync="preview" width="98%">
      <preview-view :data="displayData"></preview-view>
    </el-dialog>
    <el-dialog :visible.sync="generateTemplate" width="98%">
      <div class="el-dialog-div">
        <el-input type="textarea" v-model="generateTemplateText" :rows="22">
        </el-input>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="importTemplate" width="98%">
      <div class="el-dialog-div">
        <el-input type="textarea" v-model="importTemplateText" :rows="22">
        </el-input>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="importJSONData" width="98%">
      <div class="el-dialog-div">
        <el-input type="textarea" v-model="importJSONDataText" :rows="22">
        </el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import source from '../../assets/jsonData'
import template from '../../assets/template'
import TD from '../../model/td/td'
import { resetConfig } from '../../util/type'

export default {
  data () {
    return {
      modelData: [], // 模板
      displayData: [], // 预览模板
      preview: false,

      generateTemplate: false,
      generateTemplateText: '',
      importTemplate: false,
      importTemplateText: template,
      importJSONData: false,
      importJSONDataText: source
    }
  },
  computed: {
    isPrevable () {
      return this.$store.getters.formActionPrevable
    },
    isNextable () {
      return this.$store.getters.formActionNextable
    }
  },
  methods: {
    // 撤销 只能撤销结构变动，撤销不了属性变动
    prevFormAction () {
      // 推荐改动 使用vue action
      this.$store.commit('SET_FORMACTIONSFLAG', false)
      this.$store.commit('PREV_FORMACTION')
      this.modelData = this.$store.getters.formAction
      this.$store.commit('SET_CHOOSEID', this.$store.getters.formActionId)
    },
    // 重做
    nextFormAction () {
      this.$store.commit('SET_FORMACTIONSFLAG', false)
      this.$store.commit('NEXT_FORMACTION')
      this.modelData = this.$store.getters.formAction
      this.$store.commit('SET_CHOOSEID', this.$store.getters.formActionId)
    },
    // 根据id删除控件
    remove (id) {
      let list = []
      for (let item of this.modelData) {
        if (item.id !== id) list.push(item)
      }
      this.modelData = list
    },
    children (child) {
      let list = []
      for (let item of this.modelData) {
        if (item.id === child.id) list.push(child)
        else list.push(item)
      }
      this.modelData = list
    },
    // 点击预览时，通过 JSON文件 与 modelData 生成 displayData, 用于展示
    parseJsonData (sourceData, jsonData) {
      for (let child of sourceData) {
        if (child.type === 'table') {
          this.parseTable(child, jsonData)
        } else {
          // 如果节点绑定了key
          if (child.keys[0]) {
            let value = this.getValue(child.keys[0].key, jsonData)
            child.keys[0].value = value
            child.data.value = value
          }
        }
      }
    },
    getValue (keys, jsonData) {
      let value = jsonData
      for (let key of keys.split('.')) {
        if (value.hasOwnProperty(key)) value = value[key]
      }
      return value
    },
    copyRow (row, time) {
      let tempList = []
      for (let index = 0; index < time; index++) {
        let tempRow = []
        for (let column of JSON.parse(JSON.stringify(row))) {
          if (column) {
            let td = new TD(-1, -1)
            let child = column.list[0]
            if (child) {
              child.config = resetConfig(child.type, child.config)
              td.list.push(child)
            }
            td.options.type = column.options.type
            tempRow.push(td)
          }
        }
        tempList.push(tempRow)
      }
      return tempList
    },
    parseSummaryTd (column, jsonData) {
      if (column.options.keys[0]) {
        let keys = column.options.keys[0].key.split('.')
        let value = jsonData
        let nextKey = ''
        let resultList = []
        let result = 0
        for (let index = 0; index < keys.length; index++) {
          let key = keys[index]
          if (value.hasOwnProperty(key)) {
            if (keys.length > index) nextKey = keys[index + 1]
            if (Array.isArray(value[key])) {
              for (let temp of value[key]) {
                if (!isNaN(temp[nextKey])) {
                  resultList.push(temp[nextKey])
                } else {
                  return '该列无法汇总'
                }
              }
            } else {
              value = value[key]
            }
          }
        }
        switch (column.options.summaryCategory) {
          case 'sum':
            // eslint-disable-next-line no-eval
            result = eval(resultList.join('+'))
            break
          case 'average':
            // eslint-disable-next-line no-eval
            result = eval(resultList.join('+')) / resultList.length
            break
          case 'max':
            for (let temp of resultList) {
              if (temp > result) result = temp
            }
            break
          case 'min':
            for (let temp of resultList) {
              if (temp < result) result = temp
            }
            break
        }
        return result
      }
    },
    parseTable (child, jsonData) {
      let childList = []
      for (let row of child.children) {
        let appendList = []
        // column对应一个TD对象
        for (let column of row) {
          switch (column.options.type) {
            case 'index':
              column.options.label = '序号'
              break
            case 'summary':
              column.options.label = this.parseSummaryTd(column, jsonData)
              break
            case 'normal':
              // cell对应TD.list首个对象
              let cell = column.list[0]
              // 判断对象的type
              // 对象是input
              if (cell && cell.type === 'input' && cell.keys[0]) {
                let keys = cell.keys[0].key.split('.')
                let value = jsonData
                let nextKey = ''
                for (let index = 0; index < keys.length; index++) {
                  let key = keys[index]
                  if (value.hasOwnProperty(key)) {
                    if (keys.length > index) nextKey = keys[index + 1]
                    else nextKey = key
                    // 断言：jsonData中所有的数组都为对象数组
                    if (Array.isArray(value[key])) {
                      // 如果对象数组的长度 大于 拼接数组的长度，则扩大拼接数组
                      if (value[key].length > appendList.length) {
                        appendList = appendList.concat(this.copyRow(row, value[key].length - appendList.length))
                      }
                      // 根据key赋值
                      appendList.forEach((appendRow, arindex) => {
                        appendRow.forEach((appendColumn, acindex) => {
                          let appendCell = appendColumn.list[0]
                          // 如果当前列为序号列
                          if (appendColumn.options.type === 'index') {
                            appendColumn.options.label = arindex + 1
                          } else {
                            // 判断key是否一致
                            if (appendCell && appendCell.keys[0] && appendCell.keys[0].key === cell.keys[0].key) {
                              if (value[key] && value[key][arindex] && value[key][arindex].hasOwnProperty(nextKey)) {
                                appendCell.data.value = value[key][arindex][nextKey]
                                appendCell.config.showValue = true
                                appendCell.config.showLabel = false
                              }
                            }
                          }
                        })
                      })
                      cell.config.showValue = false
                    } else {
                      value = value[key]
                    }
                  } else {
                    break
                  }
                }
              }
              if (cell && cell.type === 'barcode' && cell.keys[0]) {
                let value = this.getValue(cell.keys[0].key, jsonData)
                cell.keys[0].value = value
                cell.data.value = value
              }
              break
          }
        }
        childList.push(row)
        childList = childList.concat(appendList)
      }
      child.children = childList
    },
    // 判断字符串是否为空
    isNullorEmpty (text) {
      return text === undefined || text === null || text.trim() === ''
    },
    // 根据modelData计算已经绑定的key值
    recordKeys (newVal, bindedKeys) {
      for (let child of newVal) {
        if (child.type === 'table') {
          for (let row of child.children) {
            for (let column of row) {
              if (column.options.type === 'normal') {
                this.recordKeys(column.list, bindedKeys)
              } else if (column.options.type === 'summary') {
                for (let key of column.options.keys) {
                  bindedKeys.push(key.key)
                }
              }
            }
          }
        } else {
          for (let key of child.keys) {
            bindedKeys.push(key.key)
          }
        }
      }
    },
    refreshBindKeys () {
      let bindedKeys = []
      this.recordKeys(this.modelData, bindedKeys)
      this.$store.commit('SET_BINDEDKEYS', bindedKeys)
    }
  },
  watch: {
    // 点击生成模板时，把 modelData JSON化为 模板数据
    generateTemplate () {
      this.generateTemplateText = JSON.stringify(this.modelData, null, 4)
    },
    // 点击导入模板时，把 模板数据 解析为 modelData
    importTemplate (newVal) {
      if (!newVal && !this.isNullorEmpty(this.importTemplateText)) {
        this.modelData = JSON.parse(this.importTemplateText)
      }
    },
    // 点击导入JSON文件时，把 JSON文件 解析为 jsonData 保存在 store 中
    importJSONData (newVal) {
      if (!newVal && !this.isNullorEmpty(this.importJSONDataText)) {
        this.$store.commit('SET_JSONDATA', JSON.parse(this.importJSONDataText))
      }
    },
    // 点击预览时，通过 JSON文件 与 modelData 生成 displayData, 用于展示
    preview (newVal) {
      if (newVal && !this.isNullorEmpty(this.importJSONDataText)) {
        this.displayData = JSON.parse(JSON.stringify(this.modelData))
        this.parseJsonData(this.displayData, JSON.parse(this.importJSONDataText))
      }
    },
    // 监听modelData, 当modelData变化时：
    // 1.如果modelData增加时，就选择增加的控件
    // 2.根据modelData计算已经绑定的key值
    // 3.根据formActionsFlag, 判断modelData变化的原因：如果是由于撤销或重做，则不保存状态
    modelData: {
      handler (newVal, oldVal) {
        this.refreshBindKeys()
        if (this.$store.getters.formActionsFlag) {
          if (newVal && oldVal && newVal.length > oldVal.length) {
            let id = newVal[newVal.length - 1].id
            if (id) this.$store.commit('SET_CHOOSEID', id)
          }
          this.$store.dispatch('RECORD_ACTION', JSON.parse(JSON.stringify(newVal)))
        } else {
          this.$nextTick(() => {
            this.$store.commit('SET_FORMACTIONSFLAG', true)
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.main-content {
  display: flex;
  flex-direction: column;
  padding: 0px 5px;

  .tools-bar {
    display: flex;
    height: 20px;
    flex-direction: row-reverse;
    align-items: center;
    font-size: $text-small;
    padding: 10px 0px;
    .tool {
      .button {
        @include background_color("nav-background-color");
        @include font_color("nav-color");
      }
      margin: 0px 10px;
      .tool-icon {
        margin: 0px 5px;
      }
    }
    .tool:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }

  .draggable-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    @include background_color("workspace-background-color");
    @include font_color("workspace-color");
    min-height: 500px;

    .transition {
      height: 100%;
      max-width: 100%;
      border: 1px dashed $border-color;
      margin: 6px;
      overflow-x: scroll;
      @include background_color("layout-background-color");
      @include font_color("layout-color");

      .notice {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $border-color;

        .notice-icon {
          font-size: $text-larger;
        }
        .notice-placeholder {
          height: 6px;
        }
        .notice-text {
          font-size: $text-normal;
        }
      }
    }
    .transition::-webkit-scrollbar {
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 10px;
      scrollbar-arrow-color: red;
    }
    .transition::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
      scrollbar-arrow-color: red;
    }
    .transition::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0);
    }
  }
}
</style>
