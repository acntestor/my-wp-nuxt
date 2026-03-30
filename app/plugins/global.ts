// app/plugins/global.ts

export default defineNuxtPlugin(() => {
    console.log('Global plugin loaded')

    // 在這裡寫你的全局 JavaScript 邏輯
    if (process.client) {
        // 例如：全局事件監聽、第三方腳本初始化等
        window.addEventListener('resize', () => {
            console.log('Window resized')
        })

        // 如果需要載入外部 JS，可以在這裡動態載入
        // const script = document.createElement('script')
        // script.src = 'https://example.com/script.js'
        // document.head.appendChild(script)
    }
})