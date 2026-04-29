<template>
  <div>
    <section id="composable-wrapper" class="wrapper">
      <div class="c-rellax" data-rellax-speed="-3" data-testid="composable-el">Speed = -3</div>
    </section>
  </div>
</template>

<script setup>
  useRellax(".c-rellax", { wrapper: "#composable-wrapper" });
</script>
