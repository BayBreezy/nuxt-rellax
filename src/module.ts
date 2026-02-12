import { defineNuxtModule, addPlugin, createResolver, addImports } from "@nuxt/kit";
import { addCustomTab } from "@nuxt/devtools-kit";
import { name, version } from "../package.json";

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "rellax",
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
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // Add plugin
    addPlugin(resolve("./runtime/plugin"));
    // add composable
    addImports({
      name: "useRellax",
      as: "useRellax",
      from: resolve("./runtime/useRellax"),
    });
    // add custom devtools tab
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
