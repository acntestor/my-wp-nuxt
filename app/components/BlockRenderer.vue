<script setup lang="ts">
import { h } from "vue";

const props = defineProps<{
  block: any;
}>();

const renderBlock = (b: any) => {
  if (!b) return null;
  if (b.blockName == null) return null;

  // 空白區塊
  if (!b.blockName && (!b.innerHTML || b.innerHTML.trim() === "")) {
    return h("div", { class: "h-8" });
  }

  switch (b.blockName) {
    case "core/paragraph":
      return h("div", { innerHTML: b.innerHTML, class: "mb-6" });

    case "core/quote":
      return h(
        "blockquote",
        {
          class: "border-l-4 border-gray-400 pl-6 italic my-10 text-lg",
        },
        [h(BlockRenderer, { block: b.innerBlocks?.[0] })]
      );

    case "core/html":
      // 支援你自訂的 HTML block（包含 Grok Hello 那段）
      return h("div", { innerHTML: b.innerHTML });

    default:
      // 未知 block 直接渲染
      return h("div", { innerHTML: b.innerHTML || "" });
  }
};
</script>

<template>
  <component :is="renderBlock(block)" />
</template>
