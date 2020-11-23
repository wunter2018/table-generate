<template>
  <div class="content">
    <div class="label">{{ item.data.label }}</div>
    <el-slider
      v-model="item.data.value"
      :show-tooltip="item.data.showTooltip"
    ></el-slider>
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
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  flex: 1;
  .label {
    width: 80px;
  }
}
</style>
