<!-- pages/index.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">WordPress + Nuxt SSG 網站</h1>
      <p class="text-lg mb-8">請訪問以下連結測試：</p>
      <div class="space-x-4">
        <NuxtLink to="/en/sample-page" class="text-blue-600 hover:underline text-xl">
          /en/sample-page
        </NuxtLink>
        <NuxtLink to="/zh/sample-page" class="text-blue-600 hover:underline text-xl">
          /zh/sample-page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
