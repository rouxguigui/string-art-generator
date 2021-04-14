<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import home from './views/home.vue'

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style lang="scss">
  @import "assets/style/global.scss";

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  body {
    color: white;
    font-family: $theme-font;
  }

  #app,
  #app-container {
    width: 100%;
    height: 100%;
  }

  @media print {
    body {
      background: #fff;
      width: 216mm;
      height: 279mm;
      padding: 0;
      min-width: initial !important;
      overflow: visible;
    }
  }
</style>
