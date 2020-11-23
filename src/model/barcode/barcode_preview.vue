<template>
  <div>
    <div class="preview-barcode" v-if="item.config.visiable">
      <barcode-writer
        :format="item.config.format"
        :id="`${item.id}-preview`"
        :value="item.data.value"
        :includetext="item.config.displayValue"
        :scale="Number(item.config.scale)"
        :height="Number(item.config.height)"
        :width="Number(item.config.width)"
      ></barcode-writer>
    </div>
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
.preview-barcode {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
