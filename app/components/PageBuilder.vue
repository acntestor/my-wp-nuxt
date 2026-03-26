<script setup lang="ts">
defineProps<{
  blocks: any[];
}>();
</script>

<template>
  <article class="prose prose-lg dark:prose-invert max-w-none">
    <BlockRenderer v-for="(block, i) in blocks" :key="i" :block="block" />
  </article>
</template>
