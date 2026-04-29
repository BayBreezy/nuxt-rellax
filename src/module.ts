import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";
import { addCustomTab } from "@nuxt/devtools-kit";

import { name, version } from "../package.json";
import type { RellaxOptions } from "rellax";

export interface ModuleOptions {
  /** Default Rellax options merged into every instance created by the directive or composables. */
  defaults?: Partial<RellaxOptions>;
  /**
   * Disable parallax below this viewport width in pixels.
   * Set to 0 (default) to never disable based on screen size.
   */
  disableBelow?: number;
  /**
   * Respect the prefers-reduced-motion media query.
   * When true (default) and the user has reduced motion enabled, all instances are skipped.
   */
  respectReducedMotion?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "rellax",
  },
  defaults: {
    defaults: {},
    disableBelow: 0,
    respectReducedMotion: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Ensure Vite pre-bundles rellax for proper CJS -> ESM interop.
    // NOTE: Do NOT add rellax to build.transpile - Nuxt's vite-builder puts
    // transpile entries into optimizeDeps.exclude, which would prevent pre-bundling.
    nuxt.options.vite.optimizeDeps ||= {};
    nuxt.options.vite.optimizeDeps.include ||= [];
    if (!nuxt.options.vite.optimizeDeps.include.includes("rellax")) {
      nuxt.options.vite.optimizeDeps.include.push("rellax");
    }

    // Expose module options to the runtime
    nuxt.options.runtimeConfig.public.rellax = {
      defaults: options.defaults || {},
      disableBelow: options.disableBelow ?? 0,
      respectReducedMotion: options.respectReducedMotion ?? true,
    } as any;

    // Plugin: registers v-rellax directive and $rellax inject
    addPlugin(resolve("./runtime/plugin"));

    // Auto-import composables
    addImports([
      {
        name: "useRellax",
        as: "useRellax",
        from: resolve("./runtime/useRellax"),
      },
      {
        name: "useRellaxGroup",
        as: "useRellaxGroup",
        from: resolve("./runtime/useRellaxGroup"),
      },
    ]);

    // Auto-import RellaxElement component
    addComponent({
      name: "RellaxElement",
      filePath: resolve("./runtime/components/RellaxElement.vue"),
    });

    // DevTools tab
    addCustomTab({
      name,
      title: "Rellax Docs",
      icon: "arcticons:o-relax",
      view: {
        type: "iframe",
        src: "https://dixonandmoe.com/rellax/",
      },
    });
  },
});
