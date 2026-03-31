<template>
  <div id="wrapper">

    <!-- 正常頁面 -->
    <template v-if="!is404Page">
      <!-- Header -->
      <Header :menu="headerData" :current-lang="lang" />
      <!-- 主要內容 -->
      <PageBuilder :blocks="pageData?.blocks || []" />
      <!-- Footer -->
      <Footer :menu="footerData" :current-lang="lang" />
    </template>

    <!-- 404 頁面：只顯示 PageBuilder（內容來自 404-page API） -->
    <template v-else>
      <PageBuilder :blocks="pageData?.blocks || []" />
    </template>
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

// 關鍵修正：正確處理單層與多層 slug
const slugParts = computed<string[]>(() => {
  const param = route.params.slug
  if (!param) return []
  if (Array.isArray(param)) {
    return param.filter((p): p is string => Boolean(p))
  }
  return [param as string].filter(Boolean)
})

const slug = computed(() => {
  return slugParts.value.length > 0
    ? slugParts.value.join('/')
    : (import.meta.env.VITE_DEFAULT_SLUG || 'home') // default slug
})

console.log(`路徑: /${lang.value}/${slugParts.value.join('/') || ''}  →  fullSlug: "${slug.value}"`)

// ==================== 資料獲取 ====================

// 獲取頁面資料（支援 test/test-1 這種多層 slug）
// const { data: pageData1 } = await useAsyncData<PageData>(
//   `page-${slug.value}-${lang.value}`,
//   () => $fetch(`${import.meta.env.VITE_WP_API}/page-blocks?slug=${slug.value}&lang=${lang.value}`),
//   { watch: [slug, lang] }
// )
const { data: originalPageData } = await useAsyncData<PageData>(
  `page-${slug.value}-${lang.value}`,
  () => $fetch(`${import.meta.env.VITE_WP_API}/page-blocks?slug=${slug.value}&lang=${lang.value}`, {
    ignoreResponseError: true   // 重要：讓 404 時也能拿到 response body
  }),
  { watch: [slug, lang] }
)

// 判斷是否為 404
const is404Page = computed(() => {
  const data = originalPageData.value

  if (!data) return false
  return data.code === 'no_page' || (data.data && data.data.status === 404)
})
console.log("is404Page=" + is404Page.value)

// ==================== 最終 pageData（修正 TypeScript 錯誤） ====================
const { data: pageData } = await useAsyncData<PageData>(
  `page-final-${slug.value}-${lang.value}`,
  () => {
    if (is404Page.value) {
      return $fetch(`${import.meta.env.VITE_WP_API}/page-blocks?slug=${import.meta.env.VITE_NOT_FOUND_SLUG}&lang=en`)
    }
    // 這裡使用 ! 告訴 TS 不為 undefined（因為 is404Page 已排除）
    return Promise.resolve(originalPageData.value!)
  },
  { watch: [is404Page, lang] }
)

// ==================== Header & Footer（只有非 404 時載入） ====================
const { data: headerData } = await useAsyncData<MenuData>(
  `menu-header-${lang.value}`,
  () => $fetch(`${import.meta.env.VITE_WP_API}/menu?name=header-${lang.value}`),
  { watch: [lang], immediate: !is404Page.value }
)

const { data: footerData } = await useAsyncData<MenuData>(
  `menu-footer-${lang.value}`,
  () => $fetch(`${import.meta.env.VITE_WP_API}/menu?name=footer-${lang.value}`),
  { watch: [lang], immediate: !is404Page.value }
)

// ==================== 設定 404 狀態碼 ====================
// if (is404Page.value && process.server) {
//   setResponseStatus(404)
//   // 如果你想同時設定 statusText，也可以這樣寫：
//   // setResponseStatus(404, 'Page Not Found')
// }

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