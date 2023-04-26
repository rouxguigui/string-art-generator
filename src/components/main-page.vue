<template>
  <div class="main-page" v-dragscroll :class="{ 'record-mode': recordLayerPattern }"
       @wheel="$emit('wheel', $event)">
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
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;

    &.record-mode {
        background-color: #3c1a1a;
    }
}

@media(max-width: 576px), (max-height: 576px) {
    .main-page {
        width: 100vw;
        height: 100vh;
    }
}
</style>
