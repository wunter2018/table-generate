<template>
  <div class="preview-text">
    <div>{{ item.data.label }}</div>
    <el-checkbox-group v-model="item.data.value">
      <template v-for="option in item.data.options">
        <el-checkbox
          :key="option.value"
          :label="option.value"
          :disabled="option.disabled"
        ></el-checkbox>
      </template>
    </el-checkbox-group>
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
