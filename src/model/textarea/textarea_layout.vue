<template>
  <div class="content">
    <div class="label">{{ item.data.label }}</div>
    <el-input type="textarea" :rows="4" v-model="item.data.value"></el-input>
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
