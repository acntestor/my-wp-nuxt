// https://nuxt.com/docs/api/configuration/nuxt-config
const legacyScripts = [
  { src: '/mtrmobile/lib/js/TweenMax.min.js' },
  { src: '/mtrmobile/lib/js/lightslider.js' },
  { src: '/mtrmobile/lib/js/page-custom.js' },
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 啟用 Tailwind（如果你安裝了）
  // modules: ['@nuxtjs/tailwindcss'],

  // SSG 全靜態模式
  ssr: true,

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8083',
      legacyScripts
    },
  },
  // 關鍵：擴展 TypeScript 配置，讓 process 有類型
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['node']   // 這一行最重要
      }
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,        // 自動爬取連結
      routes: [
        '/',                   // 首頁
        // '/en/sample-page',     // 你的範例頁面
        // '/zh/sample-page',
      ],
    },
  },

  // 未來如果有「列出所有頁面」的 API，可以在這裡自動加入所有路由
  hooks: {
    'nitro:config': async (nitroConfig) => {
      // 目前先手動加入，之後可改成自動 fetch
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '/mtrmobile/lib/css/bootstrap-5.3.2.min.css'
        },
        {
          rel: 'stylesheet',
          href: '/mtrmobile/lib/css/reset.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: '/mtrmobile/lib/css/lightslider.css'
        },
        {
          rel: 'stylesheet',
          href: '/mtrmobile/lib/css/sharestyles.css'
        },
        {
          rel: 'stylesheet',
          href: '/mtrmobile/lib/css/frontstyles.css'
        },
        {
          rel: 'stylesheet',
          href: '/mtrmobile/lib/css/bootstrap-icons-1.3.0.css'
        },
      ],
      script: [
        { src: '/mtrmobile/lib/js/jquery-3.3.1.min.js' },
        {
          src: '/mtrmobile/lib/js/bootstrap-5.3.2.min.js',
          tagPosition: 'bodyClose'
        },

      ]
    }
  },

  css: [
    '~/assets/css/global.css',
  ],
})
