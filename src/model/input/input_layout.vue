<template>
  <div class="content" :style="[{ fontFamily: item.config.fontFamily }]">
    <div class="label" v-if="item.config.showLabel">
      {{ item.data.label }}
    </div>
    <el-input
      v-if="item.config.showValue"
      v-model="item.data.value"
      style="flex: 1"
      size="mini"
    ></el-input>
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
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
