<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-20 border-b bg-background/90 backdrop-blur"
    :style="styles"
  >
    <UiContainer class="flex h-14 w-full items-center justify-between">
      <NuxtLink to="/" class="font-bold">Rellax for Nuxt 3</NuxtLink>
      <div class="flex items-center gap-2">
        <UiButton
          title="Toggle light & dark mode"
          @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'"
          size="icon-sm"
          variant="ghost"
        >
          <span class="sr-only">Toggle between light & dark mode</span>
          <Icon class="h-4 w-4" name="lucide:sun-medium" />
        </UiButton>
        <UiButton
          title="View github repo"
          external
          to="#"
          target="_blank"
          size="icon-sm"
          variant="ghost"
        >
          <span class="sr-only">View github repo</span>
          <Icon class="h-4 w-4" name="lucide:github" />
        </UiButton>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  import { useFixedHeader } from "vue-use-fixed-header";

  const headerRef = ref(null);
  const { styles } = useFixedHeader(headerRef);
</script>
