<template>
  <div>
    <div class="preview-text">
      <div>{{ item.data.label }}</div>
      <el-slider
        v-model="item.data.value"
        :show-tooltip="item.data.showTooltip"
      ></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
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
