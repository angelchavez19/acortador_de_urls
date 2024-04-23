// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/sass/globals.sass"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/sass/_utils.sass" as *\n',
        },
      },
    },
  },
  modules: ["@nuxtjs/i18n", "@nuxtjs/color-mode"],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
  routeRules: {
    "/urls": { ssr: false },
    "/pay": { ssr: false },
    "/qr": { ssr: false },
  },
});
