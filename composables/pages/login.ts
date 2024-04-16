import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { type SchemaType } from "~/interfaces/schema";
import { useFields, useValid } from "~/composables/dynamicForm";

export const useLoginPage = () => {
  const { t } = useI18n();
  const { inputRequiredEmail, inputRequiredPassword } = useFields();
  const { validEmail, validPassword } = useValid();

  const schema: SchemaType = {
    fields: [inputRequiredEmail, inputRequiredPassword],
    submitValue: t("register.form.login"),
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
        toast.error(t("register.error", { field: res.field }));
        return false;
      }

    return true;
  };

  return { handleSubmit, schema };
};
