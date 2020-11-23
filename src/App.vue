<template>
  <div id="app">
    <router-view id="router-view" />
  </div>
</template>

<script>
import store from './store'
export default {
  store,
  name: 'App',
  mounted () {
    window.document.documentElement.setAttribute('data-theme', this.$store.getters.theme)
  }
}
</script>

<style lang="scss">
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
* {
  margin: 0px;
  padding: 0px;
}
html,
body,
#app {
  height: 100%;
}
</style>
