<template>
    <div class="appFooterRow"><a name="download"></a>
        <div class="contentInner">
            <h4>{{ footerText.download }}</h4>
            <div class="appRow">
                <img src="/mtrmobile/lib/images/cmn/ico-mtr-app.png" :alt="footerText.mtrImg1Alt"
                    :title="footerText.mtrImg1Title" />
                <img src="/mtrmobile/lib/images/cmn/img-mtr-app-qr-code.png" :alt="footerText.mtrImg2Alt"
                    :title="footerText.mtrImg2Title" />
            </div>
            <div class="downloadAppRow">
                <a href="https://play.google.com/store/apps/details?id=com.mtr.mtrmobile" target="_blank"
                    :title="footerText.gooAtagTitle"><img src="/mtrmobile/lib/images/cmn/img-google-play.png"
                        :alt="footerText.gooImgAlt" /></a>
                <a href="https://apps.apple.com/us/app/mtr-mobile/id369295276" target="_blank"
                    :title="footerText.appAtagTitle"><img src="/mtrmobile/lib/images/cmn/img-app-store.png"
                        :alt="footerText.appImgAlt" /></a>
            </div>
            <p style="text-align: center; padding: 20px 0px;"><a target="_blank" href="/mtrmobile/ch/apk-download"
                    style="font-size:1.167rem; color:#000000; text-decoration:underline;">{{ footerText.more }}</a></p>
        </div>
    </div>
    <div class="footerContactRow">
        <div class="footerInner">
            <div class="tWrap">
                <div class="tRow">
                    <div class="lCol tCell">
                        <a href="https://www.instagram.com/mtrhk/" target="_blank">
                            <img src="/mtrmobile/lib/images/cmn/ico-instagram.png" />
                        </a>
                        <a href="https://www.facebook.com/mtrhk" target="_blank">
                            <img src="/mtrmobile/lib/images/cmn/ico-facebook.png" />
                        </a>
                        <a href="https://www.youtube.com/user/mtrhongkong" target="_blank">
                            <img src="/mtrmobile/lib/images/cmn/ico-youtube.png" />
                        </a>
                    </div>
                    <div class="mCol tCell">
                        <ul class="footer-menu">
                            <li v-for="item in menu.items" :key="item.id">
                                <NuxtLink :to="getFullUrl(item.url)">
                                    {{ item.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <!-- 版權（這裡用 Vue 綁定，不需要 jQuery） -->
                    <div class="rCol tCell" id="copyright">
                        Copyright © {{ currentYear }} MTR Mobile. All Rights Reserved.
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- 返回頂部按鈕 -->
    <button id="backToTop" class="rounded-circle p-3" :class="{ show: isVisible }" @click="scrollToTop"
        aria-label="返回頁面頂部">
        <i class="bi bi-arrow-up"></i>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
    menu: any
    currentLang: 'en' | 'zh'
}>()

const currentYear = new Date().getFullYear()
const isVisible = ref(false)

const footerText = computed(() => {
    if (props.currentLang === 'zh') {
        return {
            download: '立即下載',
            mtrImg1Alt: 'MTR APP 下載',
            mtrImg1Title: 'MTR APP 下載',
            mtrImg2Alt: 'MTR App 下載二維碼',
            mtrImg2Title: 'MTR App 下載二維碼',
            gooAtagTitle: 'Google play',
            gooImgAlt: 'Google play',
            appAtagTitle: 'App Store',
            appImgAlt: 'App Store',
            more: '了解如何透過APK檔下載MTR Mobile'
        }
    } else {
        return {
            download: 'Download now',
            mtrImg1Alt: 'MTR APP Download',
            mtrImg1Title: 'MTR APP Download',
            mtrImg2Alt: 'MTR App Download QR Code',
            mtrImg2Title: 'MTR App Download QR Code',
            gooAtagTitle: 'Google play',
            gooImgAlt: 'Google play',
            appAtagTitle: 'App Store',
            appImgAlt: 'App Store',
            more: 'Find out how to install MTR Mobile via APK file'
        }
    }
})

const getFullUrl = (url: string) => {
    const clean = url.replace(/^\/|\/$/g, '')
    return clean === 'home' || !clean
        ? `/${props.currentLang}/`
        : `/${props.currentLang}/${clean}/`
}

// 監聽滾動事件
const handleScroll = () => {
    isVisible.value = document.documentElement.scrollTop > 100
}

// 點擊返回頂部
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// 組件掛載時加入事件監聽
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

// 組件卸載時移除事件監聽（避免記憶體洩漏）
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
#backToTop {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    z-index: 1000;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    border-width: 0px;
    border-radius: 50% !important;
    padding: 1rem !important;
    cursor: pointer;
}

#backToTop.show {
    opacity: 1;
    visibility: visible;
    display: block;
}

#backToTop:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

a {
    text-decoration: none;
}
</style>