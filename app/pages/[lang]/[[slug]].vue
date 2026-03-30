<template>
  <div id="wrapper">
    <!-- Header -->
    <Header :menu="headerData" :current-lang="lang" />

    <!-- 主要內容 -->
    <PageBuilder :blocks="pageData?.blocks || []" />

    <!-- Footer -->
    <Footer :menu="footerData" :current-lang="lang" />
  </div>
</template>

<script setup lang="ts">
import type { PageData, MenuData } from '#shared/types/wp'

// ==================== 路由與語言處理 ====================
const route = useRoute()

const lang = computed(() => {
  const paramLang = route.params.lang as string
  return (paramLang === 'zh' || paramLang === 'en') ? paramLang : 'en'
})

const defaultSlug = import.meta.env.VITE_DEFAULT_SLUG || 'home'
const slug = computed(() => (route.params.slug as string) || defaultSlug)

// ==================== 資料獲取 ====================

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

// ==================== 特定頁面自定義 Head（CSS + JS） ====================
const isHomePage = computed(() => slug.value === 'home')
const isMtrmallsPage = computed(() => slug.value === 'mtrmalls')
const isMtrshopsPage = computed(() => slug.value === 'mtrshops')
const isEstorePage = computed(() => slug.value === 'estore')

const isSitemapPage = computed(() => slug.value === 'sitemap')

// ==================== 更新頁面 Title（最重要新增部分） ====================
useHead({
  // 動態設定 title，如果 pageData 還沒載入完，就顯示預設文字
  title: computed(() => {
    if (pageData.value?.title) {
      return lang.value === 'zh'
        ? `${pageData.value.title}`
        : `${pageData.value.title}`
    }
    return lang.value === 'zh' ? '載入中...' : 'Loading...'
  }),
  bodyAttrs: {
    // 使用 computed 確保反應性
    class: computed(() => {
      let className = ""
      switch (slug.value) {
        case 'home':
          className = 'css-transitions-only-after-page-load frontPage tcPage';
          break;
        case 'mtrmalls':
          className = 'css-transitions-only-after-page-load tcPage mtrmallsPage';
          break;
        case 'mtrshops':
          className = 'css-transitions-only-after-page-load tcPage mtrshopsPage';
          break;
        case 'estore':
          className = 'css-transitions-only-after-page-load tcPage eStorePage';
          break;
        case 'sitemap':
          className = 'css-transitions-only-after-page-load generalPage tcPage';
          break;

        default:
          break;
      }
      // return isHomePage.value ? 'css-transitions-only-after-page-load frontPage tcPage' : ''
      return className;
    })
  },

  // 動態加入 link（CSS）
  link: computed(() => {
    const links = []

    // 特定頁面加入額外 CSS
    if (isMtrmallsPage.value) {
      links.push({
        rel: 'stylesheet',
        href: '/mtrmobile/lib/css/mtrmalls_styles.css'
      })
    }

    if (isMtrshopsPage.value) {
      links.push({
        rel: 'stylesheet',
        href: '/mtrmobile/lib/css/mtrshops_styles.css'   // 或 '~/assets/css/about.css' 但在 head 中建議用絕對路徑
      })
    }

    if (isEstorePage.value) {
      links.push({
        rel: 'stylesheet',
        href: '/mtrmobile/lib/css/e_store_styles.css'
      })
    }

    if (isSitemapPage.value) {
      links.push({
        rel: 'stylesheet',
        href: '/mtrmobile/lib/css/general_pages_styles.css'
      })
    }

    return links
  }),

  // 動態加入 script（JS）
  script: computed(() => {
    const scripts = []

    if (isMtrshopsPage.value) {
      scripts.push({
        src: '/mtrmobile/lib/js/page-mtr-points-custom.js',     // 放在 public/assets/js/about.js
        defer: true,                    // 或 async: true
        type: 'text/javascript'
      })
    }

    return scripts
  })
})
</script>

<style scoped>
/* .page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px 0;
} */
</style>