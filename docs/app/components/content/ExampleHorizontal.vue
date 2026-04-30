<script setup lang="ts">
  const items = [
    { label: "← slower", speed: -4, color: "bg-violet-500 text-white" },
    { label: "← slow", speed: -2, color: "bg-blue-500 text-white" },
    { label: "normal", speed: 0, color: "bg-slate-500 text-white" },
    { label: "fast →", speed: 2, color: "bg-emerald-500 text-white" },
    { label: "faster →", speed: 4, color: "bg-amber-500 text-white" },
  ];

  const horizontalScroll = useTemplateRef<HTMLElement>("horizontalScroll");
  const horizontalReady = ref(false);

  onMounted(async () => {
    await nextTick();
    horizontalReady.value = true;
    await nextTick();
    if (horizontalScroll.value) horizontalScroll.value.scrollLeft = 300;
  });
</script>

<template>
  <div class="w-full overflow-hidden rounded-xl border">
    <div
      class="bg-muted/60 text-muted-foreground flex items-center gap-2 border-b px-4 py-2 text-xs"
    >
      <Icon name="lucide:mouse" class="size-3" />
      Scroll this panel horizontally — elements drift at different speeds along the X axis
    </div>

    <div ref="horizontalScroll" class="bg-muted/10 relative h-48 overflow-x-auto overflow-y-hidden">
      <div class="relative flex h-full w-[1200px] items-center justify-center gap-10 px-48">
        <template v-if="horizontalReady">
          <div
            v-for="item in items"
            :key="item.label"
            v-rellax.horizontal="{
              speed: item.speed,
              vertical: false,
              wrapper: horizontalScroll,
              center: true,
            }"
            :class="`rounded-full px-7 py-3 text-sm font-semibold shadow-md ${item.color}`"
          >
            {{ item.label }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
