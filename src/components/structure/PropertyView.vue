<template>
  <div class="property-content">
    <div class="property-header">
      <div>属性</div>
      <div>{{ chooseId }}</div>
    </div>
    <div class="divider-row"></div>
    <div v-if="chooseData.id === chooseId" class="property-body">
      <component
        v-if="displayFlag"
        :is="currentComponent"
        :chooseData="chooseData"
        :themeColor="themeColor"
        :isFilled="isFilled"
        @refreshBindKeys="refreshBindKeys"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'property-view',
  data () {
    return {
      currentComponent: null,
      displayFlag: true
    }
  },
  methods: {
    refreshBindKeys () {
      this.$emit('refreshBindKeys')
    }
  },
  computed: {
    chooseId () {
      return this.$store.getters.chooseId
    },
    chooseData () {
      return this.$store.getters.chooseData
    },
    isFilled () {
      return this.chooseData.keys && this.chooseData.keys.length > 0
    },
    themeColor () {
      return this.$store.getters.themeColor
    }
  },
  watch: {
    chooseData: {
      handler (newVal, oldVal) {
        if (newVal.type !== oldVal.type) {
          this.displayFlag = false
          import(`../../model/${this.chooseData.type}/${this.chooseData.type}_property.vue`).then(component => {
            this.currentComponent = component.default
            this.displayFlag = true
          }).catch(err => {
            console.log(err)
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.property-content {
  padding: 10px 10px 10px 5px;
  .property-header {
    font-size: $text-small;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .property-body {
    margin: 10px 0px;
    font-size: $text-small;
  }
}
</style>
