import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { type SchemaType } from "~/interfaces/schema";
import {
  useFields,
  useValid,
  useToastPromise,
} from "~/composables/dynamicForm";

export const useLoginPage = () => {
  const { t } = useI18n();
  const { inputRequiredEmail, inputRequiredPassword } = useFields();
  const { validEmail, validPassword } = useValid();
  const { toastPromise } = useToastPromise();

  const schema: SchemaType = {
    fields: [inputRequiredEmail, inputRequiredPassword],
    submitValue: t("login.form.login"),
    messages: [
      {
        message: t("login.message"),
        href: "/register",
        text: t("login.messageText"),
      },
    ],
  };

  const handleSubmit = async (values: any): Promise<boolean> => {
    const email: string = values.email;
    const password: string = values.password;

    const validators = [validEmail(email), validPassword(password)];

    for (let res of validators)
      if (res.isValid !== true) {
        toast.error(t("toast.errorField", { field: res.field }));
        return false;
      }

    toastPromise(
      "/api/login",
      { email, password },
      (data: any) => {
        localStorage.setItem("token", data.token);
        navigateTo("/urls");
        return t("toast.successLogin");
      },
      (data: any) => {
        if (data.status === 400) return t("toast.errorRegister");
        else if (data.status === 409) return t("toast.emailExists");
        return "Error";
      }
    );

    return false;
  };

  return { handleSubmit, schema };
};
