<template>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <!-- Logo -->
                <NuxtLink v-if="logoItem" :to="`/${currentLang}/`" class="logo-link">
                    <img :src="logoItem.url" alt="MTR Logo" class="logo" />
                </NuxtLink>

                <!-- 選單 -->
                <ul class="menu">
                    <li v-for="item in menuItems" :key="item.id" class="menu-item">
                        <NuxtLink :to="getFullUrl(item.url)" class="menu-link">
                            {{ item.title }}
                        </NuxtLink>
                    </li>
                </ul>

                <!-- 語言切換 -->
                <LanguageSwitcher :current-lang="currentLang" />
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{
    menu: any
    currentLang: 'en' | 'zh'
}>()

// 把 logo 單獨取出，其餘才是正常選單
const logoItem = props.menu?.items?.find((item: any) =>
    item.title.toLowerCase().includes('logo')
)
const menuItems = props.menu?.items?.filter((item: any) =>
    !item.title.toLowerCase().includes('logo')
) || []

const getFullUrl = (url: string) => {
    const clean = url.replace(/^\/|\/$/g, '')
    return clean === 'home' || !clean ? `/${props.currentLang}/` : `/${props.currentLang}/${clean}/`
}
</script>

<style scoped>
.header {
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.logo-link {
    display: flex;
    align-items: center;
}

.logo {
    height: 48px;
    width: auto;
}

.menu {
    display: flex;
    list-style: none;
    gap: 32px;
    margin: 0;
    padding: 0;
}

.menu-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.3s;
}

.menu-link:hover {
    color: #007bff;
}

.menu-link.router-link-active {
    color: #007bff;
    font-weight: 600;
}

/* 響應式：小於 768px 時隱藏選單（你可以之後再加 hamburger） */
@media (max-width: 768px) {
    .menu {
        display: none;
    }
}
</style>