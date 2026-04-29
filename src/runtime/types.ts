import type { RellaxOptions, RellaxInstance } from "rellax";
import type { Ref } from "vue";

export interface UseRellaxOptions extends RellaxOptions {
  observeIntersection?: boolean;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
}

export interface RellaxReturn {
  instance: Ref<RellaxInstance | null>;
  refresh: () => void;
  destroy: () => void;
  reinitialize: () => void;
}
