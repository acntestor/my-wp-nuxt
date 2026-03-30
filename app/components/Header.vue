<template>
    <header class="desktop">
        <div class="headerInner">
            <div class="tWrap">
                <div class="tRow">
                    <div class="logoCol tCell">
                        <!-- Logo -->
                        <NuxtLink v-if="logoItem" :to="`/${currentLang}/`" title="MTR logo">
                            <img :src="logoItem.url" alt="MTR Logo" />
                        </NuxtLink>
                    </div>
                    <div class="navGroupCol tCell">
                        <div class="tWrap">
                            <div class="tRow">
                                <div class="navCol tCell">
                                    <!-- 選單 -->
                                    <ul class="menu">
                                        <li v-for="(item, index) in menuItems" :key="item.id" class="[`m${index + 1}`]">
                                            <NuxtLink :to="getFullUrl(item.url)">
                                                {{ decodeTitle(item.title) }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                                <div class="sepCol tCell"></div>
                                <div class="miscCol tCell">
                                    <ul>
                                        <li class="fontSize">
                                            <dl>
                                                <dd class="active"><a href="javascript:changeSize(0);" class="min">A</a>
                                                </dd>
                                                <dd><a href="javascript:changeSize(1);" class="mid">A</a></dd>
                                                <dd><a href="javascript:changeSize(2);" class="max">A</a></dd>
                                            </dl>
                                        </li>
                                        <!-- 語言切換 -->
                                        <LanguageSwitcher :current-lang="currentLang" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import he from 'he'

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

const decodeTitle = (title: string) => he.decode(title || '')
</script>