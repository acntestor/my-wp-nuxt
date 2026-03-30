// plugins/legacy-scripts.client.ts
import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#app'
import { nextTick } from 'vue'

let hasInitialized = false

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()
    const legacyScripts = runtimeConfig.public.legacyScripts as Array<Record<string, any>>
    const router = useRouter()

    const cleanupOldScripts = () => {
        document.querySelectorAll('script[data-legacy]').forEach(el => el.remove())
    }

    const cleanupCommonEvents = () => {
        const selectors = [
            '.tab', '.tabs a', '.tab-link', '.nav-link', '[role="tab"]',
            '.tab-button', '[class*="tab"]', 'a[href^="#"]', '.nav-tabs'
            // ← 在這裡多加入你 tabs 的實際 class，例如 '.my-tab', '.nav-item' 等
        ]

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                const clone = el.cloneNode(true) as Element
                el.parentNode?.replaceChild(clone, el)
            })
        })

        if (typeof (window as any).$ !== 'undefined') {
            try {
                $(document).off('click')
                $('[class*="tab"]').off('click')
            } catch (_) { }
        }
    }

    const loadLegacyScripts = async () => {
        if (hasInitialized) return

        hasInitialized = true
        console.log('[LegacyScripts] 首次載入 legacy scripts')

        cleanupOldScripts()
        await nextTick()

        legacyScripts.forEach((config) => {
            const script = document.createElement('script')
            if (config.src) script.src = config.src

            Object.entries(config).forEach(([key, value]) => {
                if (key === 'src') return
                if (typeof value === 'boolean') {
                    (script as any)[key] = value
                } else {
                    script.setAttribute(key, String(value))
                }
            })

            script.setAttribute('data-legacy', 'true')
            script.defer = true
            document.head.appendChild(script)
        })

        setTimeout(() => {
            cleanupCommonEvents()

            window.dispatchEvent(new Event('DOMContentLoaded'))
            window.dispatchEvent(new Event('load'))

            if (typeof (window as any).$ !== 'undefined') {
                (window as any).$(document).trigger('ready')
            }

            console.log('[LegacyScripts] 初始化完成')
        }, 100)
    }

    // Hooks
    nuxtApp.hook('app:mounted', loadLegacyScripts)

    nuxtApp.hook('page:finish', () => {
        hasInitialized = false   // 切換頁面時允許重新執行
        loadLegacyScripts()
    })

    router.afterEach(async () => {
        await nextTick()
        hasInitialized = false
        loadLegacyScripts()
    })
})