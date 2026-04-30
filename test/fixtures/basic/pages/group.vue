<template>
  <div>
    <section id="group-wrapper">
      <div class="rellax-g1" data-testid="group-el-1">Element 1</div>
      <div class="rellax-g2" data-testid="group-el-2">Element 2</div>
      <div class="rellax-g3" data-testid="group-el-3">Element 3</div>
    </section>
  </div>
</template>

<script setup>
  useRellaxGroup([
    { el: ".rellax-g1", options: { speed: -1, wrapper: "#group-wrapper", center: true } },
    { el: ".rellax-g2", options: { speed: -3, wrapper: "#group-wrapper", center: true } },
    { el: ".rellax-g3", options: { speed: -5, wrapper: "#group-wrapper", center: true } },
  ]);
</script>
