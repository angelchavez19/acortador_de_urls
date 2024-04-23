import { confirmResetEN, confirmResetES } from "./i18n/confirm-reset";
import { confirmedEN, confirmedES } from "./i18n/confirmed";
import { formEN, formES } from "~/i18n/forms";
import { headsEN, headsES } from "./i18n/heads";
import { indexEN, indexES } from "./i18n";
import { loginEN, loginES } from "./i18n/login";
import { payEN, payES } from "./i18n/pay";
import { qrEN, qrES } from "./i18n/qr";
import { registerEN, registerES } from "~/i18n/register";
import { resetEN, resetES } from "~/i18n/reset-password";
import { toastEN, toastES } from "./i18n/toasts";
import { urlsEN, urlsES } from "./i18n/urls";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      confirmReset: confirmResetEN,
      confirmed: confirmedEN,
      forms: formEN,
      head: headsEN,
      index: indexEN,
      login: loginEN,
      pay: payEN,
      qr: qrEN,
      register: registerEN,
      reset: resetEN,
      toast: toastEN,
      protected: {
        urlsPageArial: "Go to the application",
        settingsPageArial: "Go to settings",
      },
      urls: urlsEN,
    },
    es: {
      confirmReset: confirmResetES,
      confirmed: confirmedES,
      forms: formES,
      head: headsES,
      index: indexES,
      login: loginES,
      pay: payES,
      qr: qrES,
      register: registerES,
      reset: resetES,
      toast: toastES,
      protected: {
        urlsPageArial: "Ir a la aplicación",
        settingsPageArial: "Ir a las configuraciones",
      },
      urls: urlsES,
    },
  },
}));
