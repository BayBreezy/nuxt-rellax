<template>
  <UiContainer class="py-10">
    <h2 class="text-2xl font-bold tracking-tight">Custom wrapper</h2>
    <p class="mt-2 leading-loose lg:text-[17px] lg:leading-relaxed">
      You can create a custom element and pass the wrapper property to the directive. <br />
      Visit this link for the full documentation:
      <NuxtLink
        external
        target="_blank"
        href="https://dixonandmoe.com/rellax/#CustomWrapper"
        class="text-sky-500 underline underline-offset-2"
        >Custom Wrapper</NuxtLink
      >
    </p>
    <UiTabs class="mt-7" defaultValue="preview">
      <UiTabsList class="mb-5">
        <UiTabsTrigger value="preview">Preview</UiTabsTrigger>
        <UiTabsTrigger value="code">Code</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="preview">
        <section
          id="custom-wrapper"
          class="h-[500px] scroll-mt-[300px] overflow-y-auto rounded-lg bg-muted p-5 lg:scroll-mt-[200px] lg:p-10"
        >
          <div class="flex h-dvh items-center justify-center gap-5">
            <DemoBox v-rellax="{ wrapper: '#custom-wrapper' }">
              <p>I have rellax</p>
            </DemoBox>
            <DemoBox>
              <p>I have no rellax</p>
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

  wrapperHtml.value = highlighter.codeToHtml(constants().customWrapper, {
    transformers: [transformerNotationHighlight()],
    lang: "vue-html",
    themes: {
      light: "material-theme-ocean",
      dark: "aurora-x",
    },
  });
</script>
