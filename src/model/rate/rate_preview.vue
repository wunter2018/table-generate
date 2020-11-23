<template>
  <div>
    <div class="preview-text">
      <div>{{ item.data.label }}</div>
      <el-rate
        v-model="item.data.value"
        :colors="[themeColor, themeColor, themeColor]"
      >
      </el-rate>
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
