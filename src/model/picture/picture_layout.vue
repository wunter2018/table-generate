<template>
  <div class="picture">
    <el-image
      style="width: 100px; height: 100px"
      :src="item.data.src"
      :fit="item.config.fit"
    ></el-image>
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
.picture {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
