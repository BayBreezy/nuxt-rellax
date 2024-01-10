import Rellax, { type RellaxOptions } from "rellax";
import { onUpdated, onUnmounted, ref } from "vue";

export const useRellax = (el?: string | Element | undefined, options?: RellaxOptions) => {
  if (typeof window === "undefined") return;

  const instance = ref(new Rellax(el, options));
  onUpdated(() => {
    instance?.value?.refresh();
  });
  onUnmounted(() => {
    instance?.value?.destroy();
  });
  return instance;
};
