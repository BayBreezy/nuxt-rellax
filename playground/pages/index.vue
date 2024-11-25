<template>
  <div>
    <Mainnav />
    <div class="relative">
      <div
        class="hero__pt absolute inset-0 z-[-1] h-full w-full bg-[linear-gradient(to_right,_theme(colors.muted.DEFAULT)_1px,_transparent_1px),linear-gradient(to_bottom,_theme(colors.muted.DEFAULT)_1px,_transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(circle,_#000_0%,_transparent_70%)]"
      />
      <UiContainer
        class="flex h-[calc(100dvh_-_200px)] flex-col items-center justify-center lg:h-[calc(100dvh_-_60px)]"
      >
        <UiBadge variant="outline" class="hero__item px-3 py-1.5 text-sm"> Rellax </UiBadge>
        <h1
          v-rellax
          class="hero__item mt-10 max-w-lg text-center text-4xl font-bold leading-[1.1] tracking-tight lg:text-5xl"
        >
          Add
          <NuxtLink
            target="_blank"
            external
            href="https://dixonandmoe.com/rellax"
            class="text-sky-500 underline-offset-2 hover:underline"
          >
            Rellax
          </NuxtLink>
          to your
          <NuxtLink
            target="_blank"
            external
            href="https://nuxt.com/"
            class="text-sky-500 underline-offset-2 hover:underline"
          >
            Nuxt
          </NuxtLink>
          app with ease
        </h1>
        <div v-rellax class="hero__item mt-10">
          <UiButton to="/#custom-wrapper" class="rounded-full">
            Scroll for more <Icon class="animate-bounce" name="lucide:arrow-down" />
          </UiButton>
        </div>
      </UiContainer>
    </div>

    <CustomWrapper />
    <Speed />
    <Composable />
  </div>
</template>

<script lang="ts" setup>
  onMounted(async () => {
    const tl = useGsap.timeline();
    tl.from(".hero__item", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    }).from(
      ".hero__pt",
      {
        opacity: 0,
        scale: 0.8,
        duration: 1,
      },
      "-=1"
    );
  });

  const title = "Nuxt 3 Rellax Module: Effortless Parallax Effects for Dynamic Web Experiences";
  const description =
    "Unlock the power of seamless parallax effects in your Nuxt 3 applications with our Rellax module. Explore the documentation to effortlessly integrate this module, offering composable utilities and directives for an enhanced and dynamic web experience. Elevate your website's visual appeal with SEO-friendly parallax scrolling - the perfect blend of performance and aesthetics.";
  const url = process.env.PUBLIC_URL || "http://localhost:3000";
  const logo = "/logo.png";
  const image = "/social.png";
  const locale = "en";
  const author = "Behon Baker";

  useSeoMeta({
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: "summary_large_image",
    themeColor: "#09090b",
    author,
    description,
  });
</script>

<style>
  html.dark .shiki,
  html.dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }

  pre {
    @apply max-h-[450px] w-full overflow-auto rounded-lg px-5 py-5;
  }
</style>
