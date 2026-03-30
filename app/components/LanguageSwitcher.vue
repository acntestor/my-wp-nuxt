<template>
    <li class="lang">
        <a v-for="lang in languages" :key="lang" href="javascript:;" :class="{ active: currentLang === lang }"
            @click.prevent="switchTo(lang)">
            {{ lang === 'en' ? 'EN' : '中文' }}
        </a>
    </li>
</template>

<script setup lang="ts">
const languages = ['en', 'zh'] as const
type Language = typeof languages[number]   // 'en' | 'zh'

const props = defineProps<{ currentLang: Language }>()

const route = useRoute()

const switchTo = (target: Language) => {
    const segments = route.path.split('/').filter(Boolean)

    if (segments[0] === 'en' || segments[0] === 'zh') {
        segments[0] = target
    } else {
        segments.unshift(target)
    }

    navigateTo('/' + segments.join('/'))
}
</script>