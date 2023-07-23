<script setup lang="ts">
defineProps({
  color: String
})
</script>

<template>
  <svg width="50" height="50" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.9857" cy="12.4857" r="12.0143" :fill="color"  />
  </svg>
</template>
