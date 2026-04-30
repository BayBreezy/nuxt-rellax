<script setup lang="ts">
  const speeds = [
    { value: -5, label: "-5", color: "from-violet-600 to-purple-500", desc: "Much slower" },
    { value: -3, label: "-3", color: "from-blue-600 to-cyan-500", desc: "Slower" },
    { value: 0, label: "0", color: "from-slate-600 to-slate-500", desc: "No parallax" },
    { value: 3, label: "+3", color: "from-amber-500 to-orange-500", desc: "Faster" },
    { value: 5, label: "+5", color: "from-rose-600 to-pink-500", desc: "Much faster" },
  ];

  const speedsScroll = useTemplateRef<HTMLElement>("speedsScroll");
  const speedsReady = ref(false);

  onMounted(async () => {
    await nextTick();
    speedsReady.value = true;
    await nextTick();
    if (speedsScroll.value) speedsScroll.value.scrollTop = 150;
  });
</script>

<template>
  <div class="w-full overflow-hidden rounded-xl border">
    <div
      class="bg-muted/60 text-muted-foreground flex items-center gap-2 border-b px-4 py-2 text-xs"
    >
      <Icon name="lucide:mouse" class="size-3" />
      Scroll this panel to compare how different speed values behave
    </div>

    <div ref="speedsScroll" class="bg-muted/20 relative h-[480px] overflow-y-auto">
      <div class="relative flex h-[900px] items-center justify-center">
        <div v-if="speedsReady" class="flex items-end gap-4 px-6">
          <div
            v-for="item in speeds"
            :key="item.value"
            v-rellax="{
              speed: item.value,
              wrapper: speedsScroll,
              center: true,
            }"
            :class="`bg-linear-to-b ${item.color} flex w-16 flex-col items-center justify-center gap-2 rounded-2xl px-3 py-5 text-white shadow-lg`"
          >
            <span class="text-2xl font-bold tracking-tight">{{ item.label }}</span>
            <span class="text-center text-[10px] leading-tight opacity-80">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
