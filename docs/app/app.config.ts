const repoBase = "https://github.com/BayBreezy/nuxt-rellax";

export default defineAppConfig({
  docd: {
    ui: {
      extraLinks: [
        {
          label: "Star on GitHub",
          icon: "lucide:star",
          external: true,
          href: repoBase,
        },
        {
          icon: "lucide:bug",
          label: "Report an issue",
          external: true,
          href: `${repoBase}/issues/new?template=bug_report.yml`,
        },
        {
          icon: "lucide:lightbulb",
          label: "Feature request",
          external: true,
          href: `${repoBase}/issues/new?template=feature_request.yml`,
        },
        {
          icon: "lucide:coffee",
          label: "Buy me coffee",
          external: true,
          href: "https://buymeacoffee.com/llehXIrI8g",
        },
      ],
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
