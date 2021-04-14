<template>
  <div class="main-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'main-page'
}
</script>

<style lang="scss" scoped>
.main-page {
  width: calc(100vw - 270px);
  max-height: 100vh;
  overflow: scroll;
}
</style>
