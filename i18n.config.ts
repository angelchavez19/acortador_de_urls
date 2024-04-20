import { confirmedEN, confirmedES } from "./i18n/confirmed";
import { formEN, formES } from "~/i18n/forms";
import { headsEN, headsES } from "./i18n/heads";
import { indexEN, indexES } from "./i18n";
import { loginEN, loginES } from "./i18n/login";
import { payEN, payES } from "./i18n/pay";
import { registerEN, registerES } from "~/i18n/register";
import { toastEN, toastES } from "./i18n/toasts";
import { urlsEN, urlsES } from "./i18n/urls";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      confirmed: confirmedEN,
      forms: formEN,
      head: headsEN,
      index: indexEN,
      login: loginEN,
      pay: payEN,
      register: registerEN,
      toast: toastEN,
      protected: {
        urlsPageArial: "Go to the application",
        settingsPageArial: "Go to settings",
      },
      urls: urlsEN,
    },
    es: {
      confirmed: confirmedES,
      forms: formES,
      head: headsES,
      index: indexES,
      login: loginES,
      pay: payES,
      register: registerES,
      toast: toastES,
      protected: {
        urlsPageArial: "Ir a la aplicación",
        settingsPageArial: "Ir a las configuraciones",
      },
      urls: urlsES,
    },
  },
}));
