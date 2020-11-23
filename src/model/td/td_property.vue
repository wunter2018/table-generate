<template>
  <div>
    <div class="property-item">
      <span class="label">是否为表头</span>
      <el-switch
        v-model="chooseData.options.isheader"
        class="content"
        :active-color="themeColor"
      ></el-switch>
    </div>
    <div class="property-item">
      <span class="label">是否为表尾</span>
      <el-switch
        v-model="chooseData.options.isfooter"
        class="content"
        :active-color="themeColor"
      ></el-switch>
    </div>
    <div class="property-item">
      <span class="label">单元格高度</span>
      <el-input
        v-model="chooseData.options.height"
        type="number"
        class="content"
        size="mini"
      ></el-input>
      <span class="unit">px</span>
    </div>
    <div class="property-item">
      <span class="label">单元格宽度</span>
      <el-input
        v-model="chooseData.options.width"
        type="number"
        class="content"
        size="mini"
      ></el-input>
      <span class="unit">px</span>
    </div>
    <div class="divider-row"></div>
    <div class="property-item">
      <span class="label">特殊格式</span>
      <el-select v-model="chooseData.options.type" class="content" size="mini">
        <template v-for="item in chooseData.types">
          <el-option
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </el-select>
    </div>
    <template v-if="chooseData.options.type === 'text'">
      <div class="property-item">
        <span class="label">单元格文字</span>
        <el-input
          v-model="chooseData.options.label"
          class="content"
          size="mini"
        ></el-input>
      </div>
    </template>
    <template v-if="chooseData.options.type === 'summary'">
      <div class="property-item">
        <span class="label">汇总方法</span>
        <el-select
          v-model="chooseData.options.summaryCategory"
          class="content"
          size="mini"
        >
          <template v-for="item in chooseData.summaryCategorys">
            <el-option
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </template>
        </el-select>
      </div>
      <div class="property-key">
        <div>绑定key值</div>
        <draggable
          v-bind="{
            group: 'json-tree',
            animation: 200,
            sort: false,
          }"
          v-model="chooseData.options.keys"
          class="bind-area"
        >
          <div v-if="chooseData.options.keys.length === 0" class="bind-notice">
            <i class="el-icon-connection bind-icon"></i>
            <div class="bind-placeholder"></div>
            <div class="bind-text">将节点拖拽到此处</div>
          </div>
          <div
            v-for="element in chooseData.options.keys"
            :key="element.key"
            v-else
          >
            <div class="bind-key">{{ element.key }}</div>
          </div>
        </draggable>
      </div>
    </template>
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
