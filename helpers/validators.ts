import { getTranslate } from "~/i18n/validators";
import { useI18n } from "vue-i18n";

export const useValidators = () => {
  let { locale } = useI18n();
  let lang = locale.value;

  const isRequired = (value: string) => {
    if (value && value.trim()) return true;
    return getTranslate(lang, "required");
  };

  const validateEmail = (value: string): true | string => {
    if (!value) return getTranslate(lang, "required");

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) return getTranslate(lang, "email");

    return true;
  };

  const validatePassword = (value: string): true | string => {
    if (!/.*[A-Z].*/.test(value)) return getTranslate(lang, "uppercase");
    if (!/.*[a-z].*/.test(value)) return getTranslate(lang, "lowercase");
    if (!/.*\d.*/.test(value)) return getTranslate(lang, "number");
    if (!/[!#$%&/]/.test(value)) return getTranslate(lang, "symbol");
    if (!/.{12,}/.test(value)) return getTranslate(lang, "length12");
    return true;
  };

  return { isRequired, validateEmail, validatePassword };
};
