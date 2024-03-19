<template>
  <ConfigProvider :use-id="useIdFunction">
    <div>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from "radix-vue";

  const useIdFunction = () => useId();

  useHead({
    htmlAttrs: {
      lang: "en",
      class: "scroll-smooth",
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/logo-white.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  });
</script>
