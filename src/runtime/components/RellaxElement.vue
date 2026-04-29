<script setup lang="ts">
import { watch, useTemplateRef } from "vue";

import { useRellax } from "../useRellax";

const props = withDefaults(
  defineProps<{
    /** HTML tag to render. Defaults to 'div'. */
    tag?: string;
    speed?: number;
    center?: boolean;
    wrapper?: string;
    relativeToWrapper?: boolean;
    round?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
    zindex?: number;
    /** Lazy-init: activate only when element enters the viewport. */
    observeIntersection?: boolean;
    intersectionThreshold?: number;
    intersectionRootMargin?: string;
  }>(),
  { tag: "div" },
);

const elRef = useTemplateRef<HTMLElement>("el");

const { instance, refresh, destroy, reinitialize } = useRellax(elRef, () => ({
  speed: props.speed,
  center: props.center,
  wrapper: props.wrapper,
  relativeToWrapper: props.relativeToWrapper,
  round: props.round,
  vertical: props.vertical,
  horizontal: props.horizontal,
  zindex: props.zindex,
  observeIntersection: props.observeIntersection,
  intersectionThreshold: props.intersectionThreshold,
  intersectionRootMargin: props.intersectionRootMargin,
}));

// Reinitialize when any Rellax option prop changes
watch(
  () => [
    props.speed,
    props.center,
    props.wrapper,
    props.relativeToWrapper,
    props.round,
    props.vertical,
    props.horizontal,
    props.zindex,
  ],
  reinitialize,
);

defineExpose({ instance, refresh, destroy, reinitialize });
</script>

<template>
  <component :is="tag" ref="el" v-bind="$attrs">
    <slot />
  </component>
</template>
