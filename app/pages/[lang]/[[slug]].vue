<template>
  <div class="page-wrapper">
    <Header :menu="headerData" :current-lang="lang" />

    <main class="main-content">
      <PageBuilder :blocks="pageData?.blocks || []" />
    </main>

    <Footer :menu="footerData" :current-lang="lang" />
  </div>
</template>

<script setup lang="ts">
import type { PageData, MenuData } from '#shared/types/wp'   // ← 修正後

const route = useRoute()

const lang = computed(() => {
  const paramLang = route.params.lang as string
  return (paramLang === 'zh' || paramLang === 'en') ? paramLang : 'en'
})

const defaultSlug = import.meta.env.VITE_DEFAULT_SLUG || 'home'
const slug = computed(() => (route.params.slug as string) || defaultSlug)

// 頁面資料
const { data: pageData } = await useAsyncData<PageData>(
  `page-${slug.value}-${lang.value}`,
  () => $fetch(`${import.meta.env.VITE_WP_API}/page-blocks?slug=${slug.value}&lang=${lang.value}`),
  { watch: [slug, lang] }
)

// Header Menu
const { data: headerData } = await useAsyncData<MenuData>(
  `menu-header-${lang.value}`,
  () => $fetch(`${import.meta.env.VITE_WP_API}/menu?name=header-${lang.value}`)
)

// Footer Menu
const { data: footerData } = await useAsyncData<MenuData>(
  `menu-footer-${lang.value}`,
  () => $fetch(`${import.meta.env.VITE_WP_API}/menu?name=footer-${lang.value}`)
)
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}
</style>