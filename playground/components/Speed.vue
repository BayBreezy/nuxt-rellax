<template>
  <UiContainer class="py-5 lg:py-10">
    <h2 class="text-2xl font-bold tracking-tight">Speed</h2>
    <p class="mt-2 leading-loose lg:text-[17px] lg:leading-relaxed">
      You can use the
      <code
        class="inline-flex items-center rounded bg-primary p-1 text-sm leading-none text-primary-foreground"
        >data-rellax-speed</code
      >
      attribute to set the speed of the element to something other than the default value (which is
      -2). A negative value will make it move slower than regular scrolling, and a positive value
      will make it move faster. We recommend keeping the speed between -10 and +10. <br />
      Visit this link for the full documentation:
      <NuxtLink
        external
        target="_blank"
        href="https://dixonandmoe.com/rellax/#Speed"
        class="text-sky-500 underline underline-offset-2"
        >Speed</NuxtLink
      >
    </p>
    <UiTabs class="mt-7" defaultValue="preview">
      <UiTabsList class="mb-5">
        <UiTabsTrigger value="preview">Preview</UiTabsTrigger>
        <UiTabsTrigger value="code">Code</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="preview">
        <section
          id="custom-wrapper-2"
          class="h-[500px] scroll-mt-[300px] overflow-y-auto rounded-lg bg-muted p-5 lg:scroll-mt-[200px] lg:p-10"
        >
          <div class="flex h-dvh items-center justify-center gap-5">
            <DemoBox v-rellax="{ wrapper: '#custom-wrapper-2' }" data-rellax-speed="3">
              <p>Speed = 3</p>
            </DemoBox>
            <DemoBox v-rellax="{ wrapper: '#custom-wrapper-2' }" data-rellax-speed="-1">
              <p>Speed = -1</p>
            </DemoBox>
            <DemoBox v-rellax="{ wrapper: '#custom-wrapper-2' }" data-rellax-speed="-5">
              <p>Speed = -5</p>
            </DemoBox>
          </div>
        </section>
      </UiTabsContent>
      <UiTabsContent value="code">
        <div v-if="wrapperHtml" v-html="wrapperHtml"></div>
      </UiTabsContent>
    </UiTabs>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { getHighlighter } from "shikiji";
  import { transformerNotationHighlight } from "shikiji-transformers";

  const wrapperHtml = ref();

  const highlighter = await getHighlighter({
    themes: ["material-theme-ocean", "aurora-x", "vitesse-dark"],
    langs: ["vue-html", "typescript", "javascript"],
  });

  wrapperHtml.value = highlighter.codeToHtml(constants().speedWrapper, {
    transformers: [transformerNotationHighlight()],
    lang: "vue-html",
    themes: {
      light: "material-theme-ocean",
      dark: "aurora-x",
    },
  });
</script>
