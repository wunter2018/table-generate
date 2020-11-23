<template>
  <div>
    <div class="preview-text">
      <el-image
        style="width: 100px; height: 100px"
        :src="item.data.src"
        :fit="item.config.fit"
      ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
</style>
