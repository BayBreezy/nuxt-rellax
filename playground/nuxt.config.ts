import tailwindcss from "@tailwindcss/vite";

const title = "Nuxt Rellax Module: Effortless Parallax Effects for Dynamic Web Experiences";
const description =
  "Unlock the power of seamless parallax effects in your Nuxt 3 applications with our Rellax module. Explore the documentation to effortlessly integrate this module, offering composable utilities and directives for an enhanced and dynamic web experience. Elevate your website's visual appeal with SEO-friendly parallax scrolling - the perfect blend of performance and aesthetics.";
const url = process.env.PUBLIC_URL || "http://localhost:3000";
const logo = "/logo.png";
const locale = "en";
const author = "Behon Baker";

export default defineNuxtConfig({
  modules: [
    "nuxt-rellax",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxtjs/seo",
    "@nuxt/fonts",
    "@hypernym/nuxt-gsap",
  ],

  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  colorMode: { classSuffix: "", preference: "dark", fallback: "dark" },

  vite: {
    plugins: [tailwindcss() as any],
  },

  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "JetBrains Mono", provider: "google" },
    ],
  },

  app: {
    head: {
      link: [
        {
          rel: "icon",
          href: "/logo-white.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          rel: "icon",
          href: "/logo.png",
          media: "(prefers-color-scheme: light)",
        },
      ],
    },
  },

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
    ],
  },

  site: {
    url,
    name: title,
    description,
    defaultLocale: locale,
  },

  schemaOrg: {
    identity: {
      type: "Person",
      name: author,
      url,
      "@type": ["Person"],
      description,
      image: logo,
    },
  },

  sitemap: {
    autoLastmod: true,
  },

  ogImage: { enabled: false },

  gsap: {
    composables: true,
    provide: false,
    extraPlugins: { scrollTrigger: true },
  },

  compatibilityDate: "2024-07-09",
});
