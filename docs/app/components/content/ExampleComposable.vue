<script setup lang="ts">
  const elRef = useTemplateRef<HTMLElement>("box");
  const compScroll = useTemplateRef<HTMLElement>("compScroll");
  const speed = ref(-3);
  const status = ref<"active" | "destroyed">("active");

  const { instance, refresh, destroy, reinitialize } = useRellax(elRef, () => ({
    speed: speed.value,
    wrapper: compScroll.value ?? undefined,
    center: true,
  }));

  function handleDestroy() {
    destroy();
    status.value = "destroyed";
  }

  function handleReinit() {
    reinitialize();
    status.value = "active";
  }

  onMounted(async () => {
    await nextTick();
    if (compScroll.value) compScroll.value.scrollTop = 200;
  });
</script>

<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="w-full space-y-3">
    <!-- Controls -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiButton size="xs" variant="outline" @click="refresh()">refresh()</UiButton>
      <UiButton
        size="xs"
        variant="destructive"
        :disabled="status === 'destroyed'"
        @click="handleDestroy()"
      >
        destroy()
      </UiButton>
      <UiButton size="xs" @click="handleReinit()">reinitialize()</UiButton>
    </div>

    <!-- Speed slider -->
    <div class="flex items-center justify-center gap-3">
      <span class="text-muted-foreground text-xs">speed</span>
      <input
        v-model.number="speed"
        type="range"
        min="-8"
        max="8"
        step="1"
        class="accent-primary w-32"
      />
      <code class="w-6 text-center font-mono text-xs">{{ speed }}</code>
      <UiButton size="xs" variant="outline" @click="handleReinit()">Apply</UiButton>
    </div>

    <!-- Preview -->
    <div class="overflow-hidden rounded-xl border">
      <div
        class="bg-muted/60 text-muted-foreground flex items-center gap-2 border-b px-4 py-2 text-xs"
      >
        <Icon name="lucide:mouse" class="size-3" />
        Scroll this panel to see the parallax, then try the controls above
      </div>
      <div ref="compScroll" class="bg-muted/10 relative h-80 overflow-y-auto">
        <div class="relative flex h-[700px] items-center justify-center gap-6">
          <!-- Reference element — no parallax, stays fixed while scrolling -->
          <div
            class="bg-muted/40 flex flex-col items-center gap-2 rounded-2xl border border-dashed px-6 py-6 opacity-60"
          >
            <div class="h-2.5 w-2.5 rounded-full bg-slate-400" />
            <p class="text-sm font-semibold">Reference</p>
            <p class="text-muted-foreground text-xs">no parallax</p>
          </div>

          <!-- Controlled element — parallax managed via useRellax -->
          <div
            ref="box"
            class="bg-card flex flex-col items-center gap-2 rounded-2xl border px-6 py-6 shadow-lg"
          >
            <div
              :class="`h-2.5 w-2.5 rounded-full ${status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`"
            />
            <p class="text-sm font-semibold">
              {{ status === "active" ? "Parallax Active" : "Destroyed" }}
            </p>
            <p class="text-muted-foreground text-xs">speed: {{ speed }}</p>
            <p class="text-muted-foreground text-xs">
              {{ instance ? "RellaxInstance" : "null" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
