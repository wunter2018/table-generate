<template>
  <div class="content">
    <div class="label">{{ item.data.label }}</div>
    <el-radio-group v-model="item.data.value">
      <template v-for="option in item.data.options">
        <el-radio :label="option.value" :key="option.value">{{
          option.label
        }}</el-radio>
      </template>
    </el-radio-group>
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
