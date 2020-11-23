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

    <div class="property-item">
      <span class="label">内容</span>
      <el-input
        v-model="chooseData.data.value"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">条码种类</span>
      <el-select
        v-model="chooseData.config.type"
        class="content"
        size="mini"
        @change="typeChange"
      >
        <template v-for="item in chooseData.config.types">
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </el-select>
    </div>

    <div class="property-item">
      <span class="label">编码方式</span>
      <el-select v-model="chooseData.config.format" class="content" size="mini">
        <template v-for="item in chooseData.config.formats">
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-if="item.type === chooseData.config.type"
          ></el-option>
        </template>
      </el-select>
    </div>

    <div class="property-item">
      <span class="label">条码高度</span>
      <el-input
        v-model="chooseData.config.height"
        type="number"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">条码宽度</span>
      <el-input
        v-model="chooseData.config.width"
        type="number"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">条码比例</span>
      <el-input
        v-model="chooseData.config.scale"
        type="number"
        class="content"
        size="mini"
      ></el-input>
    </div>

    <div class="property-item">
      <span class="label">显示文字</span>
      <el-switch
        v-model="chooseData.config.displayValue"
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
  methods: {
    typeChange (type) {
      if (type === 'tbcode') {
        this.chooseData.config.format = 'qrcode'
      } else {
        this.chooseData.config.format = 'code128'
      }
    },
    remove (key) {
      let list = []
      for (let item of this.chooseData.keys) {
        if (item.key !== key) list.push(item)
      }
      this.chooseData.keys = list
    }
  },
  watch: {
    'chooseData.keys' (newVal, oldVal) {
      if (newVal.length > 0) {
        this.chooseData.data.label = newVal[0].key
        this.chooseData.data.value = newVal[0].value
      } else {
        this.chooseData.data.label = ''
        this.chooseData.data.value = '12345'
      }
      this.$emit('refreshBindKeys')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
