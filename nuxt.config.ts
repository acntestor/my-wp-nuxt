// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 啟用 Tailwind（如果你安裝了）
  modules: ['@nuxtjs/tailwindcss'],

  // SSG 全靜態模式
  ssr: true,

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8083',
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
        '/en/sample-page',     // 你的範例頁面
        '/zh/sample-page',
      ],
    },
  },

  // 未來如果有「列出所有頁面」的 API，可以在這裡自動加入所有路由
  hooks: {
    'nitro:config': async (nitroConfig) => {
      // 目前先手動加入，之後可改成自動 fetch
    },
  },
})
