<template>
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

                    <!-- Copyright &copy;
                    <script>document.write(new Date().getFullYear());</script> MTR Mobile. All Right Reserved. -->
                </div>
            </div>
        </div>
    </div>
    <!-- <button id="backToTop" class="rounded-circle p-3">
        <i class="bi bi-arrow-up"></i>
    </button> -->
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