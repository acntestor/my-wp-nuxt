<template>
    <footer class="footer">
        <div class="container">
            <ul class="footer-menu">
                <li v-for="item in menu.items" :key="item.id" class="footer-item">
                    <NuxtLink :to="getFullUrl(item.url)" class="footer-link">
                        {{ item.title }}
                    </NuxtLink>
                </li>
            </ul>

            <div class="copyright">
                © {{ new Date().getFullYear() }} MTR. All rights reserved.
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const props = defineProps<{
    menu: any
    currentLang: 'en' | 'zh'
}>()

const getFullUrl = (url: string) => {
    const clean = url.replace(/^\/|\/$/g, '')
    return clean === 'home' || !clean
        ? `/${props.currentLang}/`
        : `/${props.currentLang}/${clean}/`
}
</script>

<style scoped>
.footer {
    background-color: #1a1a1a;
    color: #ddd;
    padding: 40px 0 20px;
    margin-top: 60px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.footer-menu {
    display: flex;
    list-style: none;
    gap: 24px;
    margin: 0 0 20px 0;
    padding: 0;
    justify-content: center;
}

.footer-link {
    color: #ddd;
    text-decoration: none;
    font-size: 15px;
    transition: color 0.3s;
}

.footer-link:hover {
    color: #fff;
}

.copyright {
    text-align: center;
    font-size: 14px;
    opacity: 0.7;
    border-top: 1px solid #333;
    padding-top: 20px;
}

/* 響應式 */
@media (max-width: 768px) {
    .footer-menu {
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
}
</style>