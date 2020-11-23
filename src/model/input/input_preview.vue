<template>
  <div
    class="preview-input"
    :style="[
      { fontSize: `${item.config.fontSize}px` },
      { fontWeight: item.config.fontWeight },
      { fontFamily: item.config.fontFamily },
    ]"
  >
    <div
      v-if="item.config.showLabel"
      :style="[{ textAlign: item.config.alignText }]"
      class="label"
    >
      {{ item.data.label }} {{ item.data.separator }}
    </div>
    <template v-if="$store.getters.mode === 'report'">
      <div
        v-if="item.config.showValue"
        :style="[{ textAlign: item.config.alignText }]"
        class="label"
      >
        {{ item.data.value }}
      </div>
    </template>
    <template v-else>
      <el-input size="mini" v-model="item.data.value" class="value"></el-input>
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
.preview-input {
  width: 100%;
  display: flex;
  align-items: center;
  .label {
    flex: 1;
  }
  .value {
    flex: 5;
  }
}
</style>
