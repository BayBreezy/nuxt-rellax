export default defineNuxtConfig({
  extends: ["@baybreezy/docd"],
  modules: ["../src"],
  app: {
    head: {
      titleTemplate: "%s - Nuxt Rellax",
    },
  },
  llms: {
    domain: process.env.NUXT_SITE_URL || "http://localhost:3000",
    title: process.env.NUXT_SITE_NAME || "My Docs",
    description: "A starter documentation site powered by Docd.",
    full: {
      title: process.env.NUXT_SITE_NAME || "My Docs",
      description: "A starter documentation site powered by Docd.",
    },
  },
});
