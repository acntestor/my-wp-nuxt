export const useMenu = (type: 'header' | 'footer', lang: 'en' | 'zh') => {
    const menuName = `${type}-${lang}`
    return useAsyncData(
        `menu-${menuName}`,
        () => $fetch(`${import.meta.env.VITE_WP_API}/menu?name=${menuName}`),
        { default: () => ({ items: [] }) }
    )
}