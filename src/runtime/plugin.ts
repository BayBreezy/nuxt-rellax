import { defineNuxtPlugin } from "#app";
import Rellax, { type RellaxInstance, type RellaxOptions } from "rellax";
import { type Directive } from "vue";

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
      const rellax = new Rellax(el, binding?.value || {});
      // Save the instance to the element
      el._rellax = rellax;
    },
    updated(el, binding) {
      // Update the instance when the element is updated
      el._rellax.refresh();
    },
    unmounted(el) {
      // Destroy the instance when the element is unmounted
      el._rellax.destroy();
    },
  });
  // Return an instance of rellax so the user can do whatever with it
  return {
    provide: {
      rellax: Rellax,
    },
  };
});
