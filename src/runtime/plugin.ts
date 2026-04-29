import Rellax from "rellax";
import type { RellaxInstance, RellaxOptions } from "rellax";
import type { Directive } from "vue";

import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const moduleConfig = (config.public as any).rellax || {};

  const shouldSkip = (): boolean => {
    if (
      moduleConfig.respectReducedMotion !== false &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return true;
    }
    if (
      moduleConfig.disableBelow > 0 &&
      typeof window !== "undefined" &&
      window.innerWidth < moduleConfig.disableBelow
    ) {
      return true;
    }
    return false;
  };

  nuxtApp.vueApp.directive("rellax", <
    Directive<HTMLElement & { _rellax?: RellaxInstance }, RellaxOptions>
  >{
    getSSRProps() {
      return {};
    },
    mounted(el, binding) {
      if (shouldSkip()) return;

      const opts: RellaxOptions = {
        ...moduleConfig.defaults,
        ...binding.value,
      };

      // Convenience modifiers as shorthand for common options
      if (binding.modifiers.center) opts.center = true;
      if (binding.modifiers.horizontal) opts.horizontal = true;

      el._rellax = new Rellax(el, opts);
    },
    updated(el) {
      el._rellax?.refresh();
    },
    unmounted(el) {
      if (el._rellax) {
        el._rellax.destroy();
        delete el._rellax;
      }
    },
  });

  return {
    provide: {
      rellax: Rellax,
    },
  };
});
