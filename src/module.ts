import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
} from "@nuxt/kit";
import { name, version } from "../package.json";

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "rellax",
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // Add plugin
    addPlugin(resolve("./runtime/plugin"));
    // add composable
    addImports({
      name: "useRellax",
      as: "useRellax",
      from: resolve("./runtime/useRellax"),
    });
    // add custom tab
    nuxt.hook("devtools:customTabs", (tabs) => {
      tabs.push({
        // unique identifier
        name,
        // title to display in the tab
        title: "Rellax Docs",
        // any icon from Iconify, or a URL to an image
        icon: "arcticons:o-relax",
        // iframe view
        view: {
          type: "iframe",
          src: "https://dixonandmoe.com/rellax/",
        },
      });
    });
  },
});
