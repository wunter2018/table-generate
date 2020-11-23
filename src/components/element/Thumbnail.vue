<template>
  <div class="item">
    <i :class="'el-icon-' + icon" v-if="type === 'elementui'"></i>
    <span
      :class="'formIcon form-icon-' + icon"
      class="icon"
      v-if="type === 'formIcon'"
    ></span>
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    icon: {
      type: String,
      default: 'danhangwenben'
    },
    name: {
      type: String,
      default: '未定义'
    },
    type: {
      type: String,
      default: 'formIcon'
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  padding: 5px 5px;
  margin: 5px 1%;
  font-size: $text-mini;
  width: 42%;
  border: 1px dashed black;

  border-radius: 2px;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 4px;
    font-size: $text-mini;
  }
}
.item:hover {
  cursor: move;
  border: 1px dashed;
  @include border_color("hover-color");
  @include hover_color("hover-color");
}
</style>
