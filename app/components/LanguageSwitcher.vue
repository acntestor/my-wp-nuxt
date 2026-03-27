<template>
    <div class="switcher">
        <button v-for="lang in ['en', 'zh']" :key="lang" :class="{ active: currentLang === lang }"
            @click="switchTo(lang)">
            {{ lang === 'en' ? 'English' : '中文' }}
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentLang: 'en' | 'zh' }>()
const route = useRoute()

const switchTo = (target: 'en' | 'zh') => {
    const segments = route.path.split('/').filter(Boolean)
    // 第一段一定是語言（因為 root 已 redirect 到 /en/）
    if (segments[0]) segments[0] = target
    else segments.unshift(target)
    navigateTo('/' + segments.join('/'))
}
</script>