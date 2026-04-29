<template>
  <div>
    <div>basic</div>
    <div data-testid="rellax-provided">{{ $rellax ? "rellax-available" : "rellax-missing" }}</div>
  </div>
</template>

<script setup>
  const { $rellax } = useNuxtApp();
</script>
