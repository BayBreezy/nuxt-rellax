<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
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
