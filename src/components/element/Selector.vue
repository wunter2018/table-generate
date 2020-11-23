<template>
  <!-- 此处的div必须加上，如果不加，拖拽会出现问题 -->
  <div>
    <component
      :is="currentComponent"
      :item="item"
      @remove="remove"
      @children="children"
      :themeColor="themeColor"
    ></component>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    remove (id) {
      this.$emit('remove', id)
    },
    children (child) {
      this.$emit('children', child)
    }
  },
  computed: {
    themeColor () {
      return this.$store.getters.themeColor
    }
  },
  mounted () {
    if (this.item.category === 'item') {
      import(`../../model/item/item_layout.vue`).then(component => {
        this.currentComponent = component.default
      })
    }
    if (this.item.category === 'layout') {
      import(`../../model/${this.item.type}/${this.item.type}_layout.vue`).then(component => {
        this.currentComponent = component.default
      })
    }
  }
}
</script>

<style>
</style>
