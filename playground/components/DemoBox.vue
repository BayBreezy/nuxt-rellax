<template>
  <div :class="styles({ class: $attrs.class as string })">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "bg-primary text-primary-foreground flex h-48 w-48 items-center justify-center rounded-md shadow-sm",
  });
</script>
