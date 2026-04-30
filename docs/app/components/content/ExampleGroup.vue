<script setup lang="ts">
  const r1 = useTemplateRef<HTMLElement>("g1");
  const r2 = useTemplateRef<HTMLElement>("g2");
  const r3 = useTemplateRef<HTMLElement>("g3");
  const r4 = useTemplateRef<HTMLElement>("g4");
  const r5 = useTemplateRef<HTMLElement>("g5");
  const r6 = useTemplateRef<HTMLElement>("g6");

  const groupStatus = ref<"active" | "destroyed">("active");

  const sharedOpts = { wrapper: "#ex-group-scroll", center: true };

  const { refresh, destroy, reinitialize } = useRellaxGroup([
    { el: r1, options: { speed: -1, ...sharedOpts } },
    { el: r2, options: { speed: -2, ...sharedOpts } },
    { el: r3, options: { speed: -3, ...sharedOpts } },
    { el: r4, options: { speed: -4, ...sharedOpts } },
    { el: r5, options: { speed: -5, ...sharedOpts } },
    { el: r6, options: { speed: -6, ...sharedOpts } },
  ]);

  function handleDestroy() {
    destroy();
    groupStatus.value = "destroyed";
  }

  function handleReinit() {
    reinitialize();
    groupStatus.value = "active";
  }

  onMounted(async () => {
    await nextTick();
    const el = document.querySelector<HTMLElement>("#ex-group-scroll");
    if (el) el.scrollTop = 200;
  });
</script>

<template>
  <div class="w-full space-y-3">
    <!-- Group controls -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <div class="mr-2 flex items-center gap-1.5">
        <div
          :class="`h-2 w-2 rounded-full ${groupStatus === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`"
        />
        <span class="text-muted-foreground text-xs">
          Group {{ groupStatus === "active" ? "active" : "destroyed" }}
        </span>
      </div>
      <UiButton size="xs" variant="outline" @click="refresh()">group.refresh()</UiButton>
      <UiButton
        size="xs"
        variant="destructive"
        :disabled="groupStatus === 'destroyed'"
        @click="handleDestroy()"
      >
        group.destroy()
      </UiButton>
      <UiButton size="xs" @click="handleReinit()">group.reinitialize()</UiButton>
    </div>

    <!-- Preview -->
    <div class="overflow-hidden rounded-xl border">
      <div
        class="bg-muted/60 text-muted-foreground flex items-center gap-2 border-b px-4 py-2 text-xs"
      >
        <Icon name="lucide:mouse" class="size-3" />
        6 elements managed by one
        <code class="bg-muted rounded px-1 py-0.5">useRellaxGroup</code> call
      </div>
      <div id="ex-group-scroll" class="bg-muted/10 relative h-[480px] overflow-y-auto">
        <div class="relative flex h-[900px] items-center justify-center">
          <div class="grid grid-cols-3 gap-4 px-6">
            <div
              ref="g1"
              class="flex flex-col items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/15 p-4 text-violet-600 dark:text-violet-400"
            >
              <span class="text-2xl font-bold">−1</span>
              <span class="mt-1 text-[10px] opacity-70">speed</span>
            </div>
            <div
              ref="g2"
              class="flex flex-col items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/15 p-4 text-blue-600 dark:text-blue-400"
            >
              <span class="text-2xl font-bold">−2</span>
              <span class="mt-1 text-[10px] opacity-70">speed</span>
            </div>
            <div
              ref="g3"
              class="flex flex-col items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 p-4 text-cyan-600 dark:text-cyan-400"
            >
              <span class="text-2xl font-bold">−3</span>
              <span class="mt-1 text-[10px] opacity-70">speed</span>
            </div>
            <div
              ref="g4"
              class="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-4 text-emerald-600 dark:text-emerald-400"
            >
              <span class="text-2xl font-bold">−4</span>
              <span class="mt-1 text-[10px] opacity-70">speed</span>
            </div>
            <div
              ref="g5"
              class="flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 p-4 text-amber-600 dark:text-amber-400"
            >
              <span class="text-2xl font-bold">−5</span>
              <span class="mt-1 text-[10px] opacity-70">speed</span>
            </div>
            <div
              ref="g6"
              class="flex flex-col items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 p-4 text-rose-600 dark:text-rose-400"
            >
              <span class="text-2xl font-bold">−6</span>
              <span class="mt-1 text-[10px] opacity-70">speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
