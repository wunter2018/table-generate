<template>
  <component
    :is="currentComponent"
    :item="item"
    :themeColor="themeColor"
  ></component>
</template>

<script>
export default {
  name: 'preview',
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
  computed: {
    themeColor () {
      return this.$store.getters.themeColor
    }
  },
  mounted () {
    import(`../../model/${this.item.type}/${this.item.type}_preview.vue`).then(component => {
      this.currentComponent = component.default
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
</style>
