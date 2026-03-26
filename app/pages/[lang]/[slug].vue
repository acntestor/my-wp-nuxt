<!-- pages/[lang]/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const { lang, slug } = route.params as { lang: string; slug: string }

const { public: { apiBase } } = useRuntimeConfig()

console.log(`Fetching page: ${apiBase}/wp-json/custom/v1/page-blocks?slug=${slug}&lang=${lang}`)

const { data: page, error } = await useAsyncData(
  `page-${lang}-${slug}`,
  () => $fetch(`${apiBase}/wp-json/custom/v1/page-blocks`, {
    params: { slug, lang }
  }),
  { server: true }
)

// 詳細錯誤診斷
if (error.value) {
  console.error('API Error:', error.value)
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: `API 請求失敗: ${error.value.message || 'Unknown error'}`
  })
}

if (!page.value) {
  console.warn('API returned null or empty data')
  throw createError({
    statusCode: 404,
    statusMessage: `找不到頁面: ${slug} (${lang}) - API 返回空資料`
  })
}

// 成功時打印資料，方便除錯
console.log('Page data received:', {
  id: page.value.id,
  title: page.value.title,
  blocksCount: page.value.blocks?.length || 0
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-5xl font-bold mb-10 text-center">{{ page.title }}</h1>
    
    <!-- 動態渲染 blocks -->
    <PageBuilder :blocks="page.blocks || []" />
  </div>
</template>