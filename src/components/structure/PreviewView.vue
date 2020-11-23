<template>
  <div>
    <el-button v-print="'#print'">打印</el-button>
    <div id="print">
      <div v-for="item in data" :key="item.id">
        <preview :item="item"></preview>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview-view',
  props: {
    data: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
</style>
