<template>
  <div class="preview-text">
    <div>{{ item.data.label }}</div>
    <el-switch v-model="item.data.value" :active-color="themeColor"></el-switch>
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
