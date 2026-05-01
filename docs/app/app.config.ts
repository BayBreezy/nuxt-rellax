export default defineAppConfig({
  docd: {
    ui: {
      expandNav: true,
      borderType: "dashed",
      header: {
        logo: {
          alt: "Nuxt Rellax Logo",
          dark: "/logo-white.png",
          light: "/logo.png",
          favicon: "/favicon.ico",
        },
        title: "Nuxt Rellax",
      },
      transition: {
        name: "fade",
      },
    },
  },
});
