<template>
  <div class="content">
    <div class="label">{{ item.data.label }}</div>
    <el-rate v-model="item.data.value" :colors="[themeColor]"> </el-rate>
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
