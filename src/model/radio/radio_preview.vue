<template>
  <div>
    <div class="preview-text">
      <div>{{ item.data.label }}</div>
      <el-radio-group v-model="item.data.value">
        <template v-for="option in item.data.options">
          <el-radio :label="option.value" :key="option.value">{{
            option.label
          }}</el-radio>
        </template>
      </el-radio-group>
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
