<template>
  <div>
    <div class="property-item">
      <span class="label">显示边框</span>
      <el-switch
        v-model="chooseData.data.showBorder"
        class="content"
        :active-color="themeColor"
      ></el-switch>
    </div>
    <div class="property-item">
      <span class="label">同行等距</span>
      <el-switch
        v-model="chooseData.data.isometry"
        class="content"
        :active-color="themeColor"
      ></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chooseData: {
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
</style>
