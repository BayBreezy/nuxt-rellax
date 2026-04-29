import Rellax from "rellax";
import type { RellaxInstance } from "rellax";
import { isRef, onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import type { Ref } from "vue";

import { useRuntimeConfig } from "nuxt/app";

import type { RellaxReturn, UseRellaxOptions } from "./types";

type ElArg = string | Element | Ref<HTMLElement | null | undefined> | undefined;
type OptionsArg = UseRellaxOptions | (() => UseRellaxOptions) | undefined;

export const useRellax = (el?: ElArg, options?: OptionsArg): RellaxReturn => {
  const stub: RellaxReturn = {
    instance: ref<RellaxInstance | null>(null),
    refresh: () => {},
    destroy: () => {},
    reinitialize: () => {},
  };

  if (import.meta.server) return stub;

  const config = useRuntimeConfig();
  const moduleConfig = (config.public as any).rellax || {};

  const instance = ref<RellaxInstance | null>(null);

  const shouldSkip = (): boolean => {
    if (
      moduleConfig.respectReducedMotion !== false &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return true;
    }
    if (moduleConfig.disableBelow > 0 && window.innerWidth < moduleConfig.disableBelow) {
      return true;
    }
    return false;
  };

  const getTarget = () => (isRef(el) ? el.value : el);

  // Resolve options fresh each call so reinitialize picks up latest prop values
  const resolveOptions = (): UseRellaxOptions => {
    const raw = typeof options === "function" ? options() : options || {};
    return { ...moduleConfig.defaults, ...raw };
  };

  const initialize = () => {
    if (instance.value || shouldSkip()) return;
    const target = getTarget();
    if (!target) return;
    const {
      observeIntersection: _obs,
      intersectionThreshold: _thr,
      intersectionRootMargin: _rm,
      ...rellaxOpts
    } = resolveOptions();
    instance.value = new Rellax(target as any, rellaxOpts);
  };

  const destroy = () => {
    if (instance.value) {
      instance.value.destroy();
      instance.value = null;
    }
  };

  const refresh = () => instance.value?.refresh();

  const reinitialize = () => {
    destroy();
    initialize();
  };

  const { observeIntersection, intersectionThreshold, intersectionRootMargin } =
    resolveOptions();

  if (observeIntersection && typeof IntersectionObserver !== "undefined") {
    let observer: IntersectionObserver | null = null;

    const setupObserver = (target: Element) => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) initialize();
            else destroy();
          });
        },
        {
          threshold: intersectionThreshold ?? 0,
          rootMargin: intersectionRootMargin ?? "0px",
        },
      );
      observer.observe(target);
    };

    onMounted(() => {
      const target = getTarget();
      if (target instanceof Element) setupObserver(target);
    });

    onUnmounted(() => {
      observer?.disconnect();
      destroy();
    });
  } else {
    onMounted(initialize);
    onUnmounted(destroy);

    if (isRef(el)) {
      // Watch template refs — they change when v-if toggles the element in/out
      watch(el, (newEl, oldEl) => {
        if (oldEl) destroy();
        if (newEl) initialize();
      });
    } else {
      onUpdated(() => {
        if (instance.value) refresh();
        else initialize();
      });
    }
  }

  // Tear down / restore when viewport crosses the disableBelow threshold
  if (moduleConfig.disableBelow > 0) {
    const handleResize = () => {
      if (window.innerWidth < moduleConfig.disableBelow) destroy();
      else if (!instance.value) initialize();
    };
    onMounted(() => window.addEventListener("resize", handleResize));
    onUnmounted(() => window.removeEventListener("resize", handleResize));
  }

  return { instance, refresh, destroy, reinitialize };
};
