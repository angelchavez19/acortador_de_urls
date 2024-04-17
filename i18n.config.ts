import { confirmedEN, confirmedES } from "./i18n/confirmed";
import { formEN, formES } from "~/i18n/forms";
import { loginEN, loginES } from "./i18n/login";
import { registerEN, registerES } from "~/i18n/register";
import { toastEN, toastES } from "./i18n/toasts";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      confirmed: confirmedEN,
      forms: formEN,
      login: loginEN,
      register: registerEN,
      toast: toastEN,
      protected: {
        urlsPageArial: "Go to the application",
        settingsPageArial: "Go to settings",
      },
    },
    es: {
      confirmed: confirmedES,
      forms: formES,
      login: loginES,
      register: registerES,
      toast: toastES,
      protected: {
        urlsPageArial: "Ir a la aplicación",
        settingsPageArial: "Ir a las configuraciones",
      },
    },
  },
}));
