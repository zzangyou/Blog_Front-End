<!-- script setup用法参考 https://vuejs.org/api/sfc-script-setup.html#script-setup -->
<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
<n-message-provider>

    <RouterView />
</n-message-provider>

</template>
