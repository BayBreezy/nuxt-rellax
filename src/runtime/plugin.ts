import Rellax from "rellax";
import type { RellaxInstance, RellaxOptions } from "rellax";
import type { Directive } from "vue";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // A directive that can be used in Vue templates
  nuxtApp.vueApp.directive("rellax", <
    Directive<HTMLElement & { _rellax: RellaxInstance }, RellaxOptions>
  >{
    getSSRProps() {
      return {};
    },
    mounted(el, binding) {
      // Create a new instance of rellax
      el._rellax = new Rellax(el, binding?.value || {});
    },
    updated(el) {
      // Update the instance when the element is updated
      if (el._rellax) {
        el._rellax.refresh();
      }
    },
    unmounted(el) {
      // Destroy the instance when the element is unmounted
      if (el._rellax) {
        el._rellax.destroy();
      }
    },
  });
  // Return an instance of rellax so the user can do whatever with it
  return {
    provide: {
      rellax: Rellax,
    },
  };
});
