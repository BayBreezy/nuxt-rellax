<script setup lang="ts">
  const stars = ref<{ id: number; x: string; y: string; size: string }[]>([]);
  const sceneScroll = useTemplateRef<HTMLElement>("sceneScroll");

  // One Rellax instance manages all .scene-layer elements via CSS selector
  useRellax("#ex-scene .scene-layer", () => ({
    wrapper: sceneScroll.value ?? undefined,
  }));

  onMounted(async () => {
    stars.value = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: `${((Math.sin(i * 1.618) + 1) / 2) * 96}%`,
      y: `${((Math.cos(i * 2.399) + 1) / 2) * 55}%`,
      size: i % 3 === 0 ? "2px" : "1px",
    }));

    await nextTick();
    if (sceneScroll.value) sceneScroll.value.scrollTop = 150;
  });
</script>

<template>
  <div ref="sceneScroll" class="relative h-72 w-full overflow-y-auto rounded-xl">
    <!-- overflow-hidden keeps the scene contained while layers move freely -->
    <div
      id="ex-scene"
      class="relative flex h-[650px] items-center justify-center overflow-hidden"
      style="background: #020817"
    >
      <!-- Sky gradient — moves slowest (-6) -->
      <div
        class="scene-layer absolute inset-x-0 -top-20 -bottom-20"
        data-rellax-speed="-6"
        style="background: linear-gradient(180deg, #020817 0%, #0f172a 40%, #1e3a5f 100%)"
      />

      <!-- Stars layer (-4) -->
      <div
        class="scene-layer pointer-events-none absolute inset-x-0 -top-20 -bottom-20"
        data-rellax-speed="-4"
      >
        <div
          v-for="star in stars"
          :key="star.id"
          class="absolute rounded-full bg-white/70"
          :style="{ left: star.x, top: star.y, width: star.size, height: star.size }"
        />
      </div>

      <!-- Moon (-5) -->
      <div
        class="scene-layer absolute rounded-full"
        data-rellax-speed="-8"
        style="
          right: 14%;
          top: 6%;
          width: 52px;
          height: 52px;
          background: radial-gradient(circle at 38% 38%, #fff9e6, #fde68a);
          box-shadow: 0 0 40px 8px rgba(253, 230, 138, 0.2);
        "
      />

      <!-- Far mountains (-3) -->
      <div
        class="scene-layer absolute inset-x-0 bottom-0 h-56"
        data-rellax-speed="-3"
        style="
          background: #172033;
          clip-path: polygon(
            0 100%,
            6% 48%,
            14% 68%,
            24% 22%,
            34% 58%,
            45% 30%,
            55% 62%,
            66% 18%,
            76% 52%,
            86% 34%,
            94% 54%,
            100% 38%,
            100% 100%
          );
        "
      />

      <!-- Near mountains (-1.5) -->
      <div
        class="scene-layer absolute inset-x-0 bottom-0 h-40"
        data-rellax-speed="-1.5"
        style="
          background: #0a1628;
          clip-path: polygon(
            0 100%,
            10% 35%,
            22% 72%,
            36% 18%,
            50% 65%,
            64% 28%,
            78% 58%,
            90% 32%,
            100% 50%,
            100% 100%
          );
        "
      />

      <!-- Ground (0 — no parallax) -->
      <div
        class="scene-layer absolute inset-x-0 bottom-0 h-12"
        data-rellax-speed="0"
        style="background: #040c1a"
      />

      <!-- Headline (-2) -->
      <div
        class="scene-layer pointer-events-none absolute inset-0 flex items-center justify-center"
        data-rellax-speed="-9"
      >
        <div class="text-center">
          <p class="text-xs font-semibold tracking-[0.3em] text-blue-400/60 uppercase">
            nuxt-rellax
          </p>
          <h2 class="mt-1 text-4xl font-bold text-white/90 drop-shadow-lg">Parallax Scene</h2>
          <p class="mt-2 text-sm text-blue-300/50">Scroll this panel to see layers separate</p>
        </div>
      </div>
    </div>
  </div>
</template>
