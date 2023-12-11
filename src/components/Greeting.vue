<template>
  <h1 class="greeting" v-if="name">Hi there, {{ name }}!</h1>
</template>
  
<script setup>
const { name, gameStarted } = defineProps(['name', 'gameStarted']);
</script>
  
<style scoped>
.greeting {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
  