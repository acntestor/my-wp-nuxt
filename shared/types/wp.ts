// shared/types/wp.ts

export interface PageBlock {
    blockName: string | null
    attrs: Record<string, any>
    innerBlocks: any[]
    innerHTML: string
    innerContent: any[]
}

export interface PageData {
    id: number
    slug: string
    title: string
    language: string
    requested_lang: string
    blocks: PageBlock[]
    code: string | null
    message: string | null
    data: {
        status: string | number
    } | null
}

export interface MenuItem {
    id: number
    title: string
    url: string
    target: string
    classes: string[]
    description: string
    menu_order: number
    children: any[]
}

export interface MenuData {
    menu_name: string
    menu_slug: string
    items: MenuItem[]
}