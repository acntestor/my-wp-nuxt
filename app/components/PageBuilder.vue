<script setup lang="ts">
defineProps<{
  blocks: any[];
}>();
</script>

<template>

  <BlockRenderer v-for="(block, i) in blocks" :key="i" :block="block" />

</template>
