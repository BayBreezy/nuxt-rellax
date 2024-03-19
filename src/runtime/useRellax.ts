import Rellax, { type RellaxOptions } from "rellax";
import { onUpdated, onUnmounted, ref, onMounted } from "vue";

export const useRellax = (el?: string | Element | undefined, options?: RellaxOptions) => {
  if (typeof window === "undefined") return;

  const instance = ref<InstanceType<typeof Rellax> | null>(null);

  const initializeRellax = () => {
    instance.value = new Rellax(el, options);
  };

  const destroyRellax = () => {
    if (instance.value) {
      instance.value.destroy();
      instance.value = null;
    }
  };

  // Initialize Rellax when component is mounted
  onMounted(() => {
    initializeRellax();
  });

  // Destroy the instance if the element is removed from the DOM
  onUnmounted(() => {
    destroyRellax();
  });

  // Reinitialize Rellax when component is updated
  onUpdated(() => {
    if (!instance.value) {
      initializeRellax();
    }
  });

  return instance;
};
