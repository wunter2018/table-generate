<template>
  <div class="base" :class="chooseFlag ? 'choose' : ''" @click.stop="choose">
    <div class="drag" v-if="chooseFlag">
      <i class="el-icon-rank icon handle"></i>
    </div>
    <keep-alive>
      <component
        :is="currentComponent"
        :item="item"
        :themeColor="themeColor"
      ></component>
    </keep-alive>
    <div class="nav" v-if="chooseFlag">
      <i class="el-icon-delete icon" @click="remove"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-element',
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
    choose () {
      this.$store.commit('SET_CHOOSEID', this.item.id)
    },
    remove () {
      this.$emit('remove', this.item.id)
    }
  },
  computed: {
    chooseFlag () {
      if (this.$store.getters.chooseId === this.item.id) {
        this.$store.commit('SET_CHOOSEDATA', this.item)
        return true
      }
      return false
    },
    themeColor () {
      return this.$store.getters.themeColor
    }
  },
  mounted () {
    import(`../../model/${this.item.type}/${this.item.type}_layout.vue`).then(component => {
      this.currentComponent = component.default
    })
  }
}
</script>

<style scoped lang="scss">
.base-icon {
  padding: 3px;
  font-size: 14px;
}

.base {
  display: flex;
  flex-direction: row;
  min-height: $element-height;
  margin: 4px 4px;
  border: 1px dashed $border-color;
  border-radius: 2px;
  position: relative;

  .drag {
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: 1000;
    @include background_color("border-color");
    color: $color-white;
    .icon {
      @extend .base-icon;
    }
  }
  .drag:hover {
    cursor: move;
  }

  .nav {
    position: absolute;
    right: -2px;
    bottom: -2px;
    z-index: 1000;
    @include background_color("border-color");

    color: $color-white;
    .icon {
      @extend .base-icon;
    }
  }
  .nav:hover {
    cursor: pointer;
  }
}
.choose {
  border: 2px solid;
  @include border_color("border-color");
}
</style>
