import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { useValidators } from "~/helpers/validators";
import { type Method } from "~/types/method";

export const useFields = () => {
  const { t } = useI18n();
  const { isRequired, validateEmail, validateMax } = useValidators();

  const inputRequiredName = {
    name: "name",
    as: "input",
    label: t("forms.input.name"),
    placeholder: t("forms.input.name"),
    type: "text",
    autocomplete: "name",
    rules: [isRequired, validateMax(50)],
  };

  const inputRequiredEmail = {
    name: "email",
    as: "input",
    label: t("forms.input.email"),
    placeholder: t("forms.input.email"),
    type: "email",
    autocomplete: "email",
    rules: [isRequired, validateEmail],
  };

  const inputRequiredPassword = {
    name: "password",
    label: t("forms.input.password"),
    placeholder: t("forms.input.password"),
    type: "custom-password",
  };

  return { inputRequiredName, inputRequiredEmail, inputRequiredPassword };
};

export const useValid = () => {
  const { t } = useI18n();
  const { validateEmail, validateMax, validatePassword } = useValidators();

  const validName = (name: string) => {
    return { isValid: validateMax(50)(name), field: t("forms.input.name") };
  };

  const validEmail = (email: string) => {
    return { isValid: validateEmail(email), field: t("forms.input.email") };
  };

  const validPassword = (password: string) => {
    return {
      isValid: validatePassword(password),
      field: t("forms.input.password"),
    };
  };

  return { validName, validEmail, validPassword };
};

export const useToastPromise = () => {
  const toastPromise = async (
    url: string,
    data: any,
    callbackSuccess: (data: any) => string,
    callbackError: (data: any) => string,
    method: Method = "POST"
  ) => {
    toast.promise(
      $fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }),
      {
        loading: "Loading...",
        success: callbackSuccess,
        error: callbackError,
      }
    );
  };

  return { toastPromise };
};
