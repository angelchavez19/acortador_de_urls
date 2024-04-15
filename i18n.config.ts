import { formEN, formES } from "~/i18n/forms";
import { registerEN, registerES } from "~/i18n/register";
import { toastEN, toastES } from "./i18n/toasts";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      forms: formEN,
      register: registerEN,
      toast: toastEN,
    },
    es: {
      forms: formES,
      register: registerES,
      toast: toastES,
    },
  },
}));
