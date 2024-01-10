<template>
  <div :class="styles({ class: $attrs.class })">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "flex h-48 w-48 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm",
  });
</script>
