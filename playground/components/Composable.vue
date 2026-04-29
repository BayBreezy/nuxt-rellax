<template>
  <UiContainer class="py-5 lg:py-10">
    <h2 class="text-2xl font-bold tracking-tight">Composable</h2>
    <p class="mt-2 leading-loose lg:text-[17px] lg:leading-relaxed">
      You can use the
      <code
        class="bg-primary text-primary-foreground inline-flex items-center rounded p-1 text-sm leading-none"
        >useRellax</code
      >
      composable to create a rellax instance. The first argument is the selector of the element that
      you want to add the rellax effect to. The second argument is the options object.
    </p>

    <UiTabs class="mt-7" default-value="preview">
      <UiTabsList class="mb-5">
        <UiTabsTrigger value="preview"> Preview </UiTabsTrigger>
        <UiTabsTrigger value="html"> HTML </UiTabsTrigger>
        <UiTabsTrigger value="script"> Script </UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="preview">
        <section
          id="custom-wrapper-3"
          class="bg-muted h-[500px] scroll-mt-[300px] overflow-y-auto rounded-lg p-5 lg:scroll-mt-[200px] lg:p-10"
        >
          <div class="flex h-dvh items-center justify-center gap-5">
            <DemoBox class="c-rellax" data-rellax-speed="-3">
              <p>Speed = -3</p>
            </DemoBox>
            <DemoBox class="c-rellax" data-rellax-speed="-1">
              <p>Speed = -1</p>
            </DemoBox>
          </div>
        </section>
      </UiTabsContent>
      <UiTabsContent value="html">
        <div v-if="wrapperHtml" v-html="wrapperHtml" />
      </UiTabsContent>
      <UiTabsContent value="script">
        <div v-if="wrapperScript" v-html="wrapperScript" />
      </UiTabsContent>
    </UiTabs>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { transformerNotationHighlight } from "@shikijs/transformers";
  import { createHighlighter } from "shiki";

  useRellax(".c-rellax", {
    // will apply to all elements
    wrapper: "#custom-wrapper-3",
  });

  const wrapperHtml = ref();
  const wrapperScript = ref();

  const highlighter = await createHighlighter({
    themes: ["material-theme-ocean", "aurora-x", "vitesse-dark"],
    langs: ["vue-html", "typescript", "javascript"],
  });

  wrapperHtml.value = highlighter.codeToHtml(constants().composableHtml, {
    transformers: [transformerNotationHighlight()],
    lang: "vue-html",
    themes: {
      light: "material-theme-ocean",
      dark: "aurora-x",
    },
  });
  wrapperScript.value = highlighter.codeToHtml(constants().composableScript, {
    transformers: [transformerNotationHighlight()],
    lang: "typescript",
    themes: {
      light: "material-theme-ocean",
      dark: "aurora-x",
    },
  });
</script>
