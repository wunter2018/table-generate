<template>
  <div>
    <div class="property-key">
      <div>绑定key值</div>
      <draggable
        v-bind="{
          group: 'json-tree',
          animation: 200,
          sort: false,
        }"
        v-model="chooseData.keys"
        class="bind-area"
      >
        <div v-if="!isFilled" class="bind-notice">
          <i class="el-icon-connection bind-icon"></i>
          <div class="bind-placeholder"></div>
          <div class="bind-text">将节点拖拽到此处</div>
        </div>
        <template v-for="element in chooseData.keys" v-else>
          <div :key="element.key" class="bind-key">
            <template v-for="key in element.key.split('.')">
              <p :key="key">{{ key }}</p>
            </template>
            <div class="bind-tools">
              <i class="el-icon-delete icon" @click="remove(element.key)"></i>
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <div class="divider-row"></div>

    <div class="property-item">
      <span class="label">标题</span>
      <el-input
        v-model="chooseData.data.label"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">内容</span>
      <el-input
        v-model="chooseData.data.value"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">分割符</span>
      <el-input
        v-model="chooseData.data.separator"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">字体大小</span>
      <el-input
        v-model="chooseData.config.fontSize"
        class="content"
        type="number"
        size="mini"
      ></el-input>
      <span class="unit">px</span>
    </div>

    <div class="property-item">
      <span class="label">字体</span>
      <el-select
        v-model="chooseData.config.fontFamily"
        class="content"
        size="mini"
      >
        <template v-for="item in chooseData.config.fontFamilys">
          <el-option
            :key="`${item.value}_font`"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </el-select>
    </div>

    <div class="property-item">
      <span class="label">字体粗细</span>
      <el-select
        v-model="chooseData.config.fontWeight"
        class="content"
        size="mini"
      >
        <template v-for="item in chooseData.config.fontWeights">
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </el-select>
    </div>

    <div class="property-item">
      <span class="label">对齐方式</span>
      <el-select
        v-model="chooseData.config.alignText"
        class="content"
        size="mini"
      >
        <template v-for="item in chooseData.config.alignTexts">
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </el-select>
    </div>

    <div class="property-item">
      <span class="label">显示标题</span>
      <el-switch
        v-model="chooseData.config.showLabel"
        class="content"
        :active-color="themeColor"
      ></el-switch>
    </div>
    <div class="property-item">
      <span class="label">显示内容</span>
      <el-switch
        v-model="chooseData.config.showValue"
        class="content"
        :active-color="themeColor"
      ></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chooseData: {
      required: true,
      type: Object
    },
    themeColor: {
      required: true,
      type: String
    },
    isFilled: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    'chooseData.keys' (newVal, oldVal) {
      if (newVal.length > 0) {
        this.chooseData.data.label = newVal[0].key
        this.chooseData.data.value = newVal[0].value
      } else {
        this.chooseData.data.label = '单行文本'
        this.chooseData.data.value = ''
      }
      this.$emit('refreshBindKeys')
    }
  },
  methods: {
    remove (key) {
      let list = []
      for (let item of this.chooseData.keys) {
        if (item.key !== key) list.push(item)
      }
      this.chooseData.keys = list
    }
  }
}
</script>

<style scoped lang="scss">
</style>
