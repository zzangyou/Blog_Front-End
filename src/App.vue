<!-- script setup用法参考 https://vuejs.org/api/sfc-script-setup.html#script-setup -->
<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>
<style lang="scss">

#app {
  height: 100%;
  width: 100%;
  padding: 0;
  max-width: 100%;
}
</style>
