import { formEN, formES } from "~/i18n/forms";
import { registerEN, registerES } from "~/i18n/register";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      forms: formEN,
      register: registerEN,
    },
    es: {
      forms: formES,
      register: registerES,
    },
  },
}));
