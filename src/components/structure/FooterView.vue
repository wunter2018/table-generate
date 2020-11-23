<template>
  <div class="footer" id="footerview">
    <div class="label">Powered By Marking</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.footer {
  height: 30px;
  font-size: $text-mini;
  font-weight: bold;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  @include background_color("footer-background-color");
  @include font_color("footer-color");
  .label {
    margin: 0px 10px;
  }
}
</style>
