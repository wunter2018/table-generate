<template>
  <div class="preview-text">
    <div>{{ item.data.label }}</div>
    <template v-if="$store.getters.mode === 'report'">
      <div v-if="item.data.showValue">{{ item.data.value }}</div>
    </template>
    <template v-else>
      <el-input
        autosize=""
        type="textarea"
        v-model="item.data.value"
      ></el-input>
    </template>
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
