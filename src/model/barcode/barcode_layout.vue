<template>
  <div class="barcode">
    <barcode-writer
      :format="item.config.format"
      :id="`${item.id}-layout`"
      :value="item.data.value"
      :includetext="item.config.displayValue"
      :scale="Number(item.config.scale)"
      :height="Number(item.config.height)"
      :width="Number(item.config.width)"
    ></barcode-writer>
  </div>
</template>

<script>
import barcodeWriter from './barcode_writer.vue'
export default {
  components: {
    barcodeWriter
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.barcode {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
