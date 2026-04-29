import type { Ref } from "vue";

import type { UseRellaxOptions } from "./types";
import { useRellax } from "./useRellax";

type ElArg = string | Element | Ref<HTMLElement | null | undefined>;

type GroupItem =
  | ElArg
  | {
      el: ElArg;
      options?: UseRellaxOptions;
    };

const isItemObject = (item: GroupItem): item is { el: ElArg; options?: UseRellaxOptions } =>
  typeof item === "object" && item !== null && "el" in (item as object) && !("nodeType" in item);

export const useRellaxGroup = (items: GroupItem[], sharedOptions?: UseRellaxOptions) => {
  const instances = items.map((item) => {
    if (isItemObject(item)) {
      return useRellax(item.el, { ...sharedOptions, ...item.options });
    }
    return useRellax(item as ElArg, sharedOptions);
  });

  return {
    instances,
    refresh: () => instances.forEach((i) => i.refresh()),
    destroy: () => instances.forEach((i) => i.destroy()),
    reinitialize: () => instances.forEach((i) => i.reinitialize()),
  };
};
