import { getTranslate } from "~/i18n/validators";
import { useI18n } from "vue-i18n";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const required = (value: string) => value && value.trim();
export const isEmail = (value: string) => regexEmail.test(value);
export const containUppercase = (value: string) => /.*[A-Z].*/.test(value);
export const containLowercase = (value: string) => /.*[a-z].*/.test(value);
export const containNumber = (value: string) => /.*\d.*/.test(value);
export const containSymbol = (value: string) => /[!#$%&/]/.test(value);
export const length12 = (value: string) => /.{12,}/.test(value);
export const isPassword = (value: string) =>
  containUppercase(value) &&
  containLowercase(value) &&
  containNumber(value) &&
  containSymbol(value) &&
  length12(value);
export const max = (value: string, maxLength: number) =>
  value.length <= maxLength;

export const useValidators = () => {
  let { locale } = useI18n();
  let lang = locale.value;

  const isRequired = (value: string) => {
    if (!required(value)) return getTranslate(lang, "required");
    return true;
  };

  const validateEmail = (value: string): true | string => {
    if (!isEmail(value)) return getTranslate(lang, "email");
    return true;
  };

  const validatePassword = (value: string): true | string => {
    if (!containUppercase(value)) return getTranslate(lang, "uppercase");
    if (!containLowercase(value)) return getTranslate(lang, "lowercase");
    if (!containNumber(value)) return getTranslate(lang, "number");
    if (!containSymbol(value)) return getTranslate(lang, "symbol");
    if (!length12(value)) return getTranslate(lang, "length12");
    return true;
  };

  const validateMax = (
    maxLength: number
  ): ((value: string) => true | string) => {
    return (value: string): true | string => {
      if (!max(value, maxLength))
        return getTranslate(lang, "maxlength", [maxLength]);
      return true;
    };
  };

  return { isRequired, validateEmail, validateMax, validatePassword };
};
