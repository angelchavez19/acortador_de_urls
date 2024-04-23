import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { type SchemaType } from "~/interfaces/schema";
import {
  useFields,
  useValid,
  useToastPromise,
} from "~/composables/dynamicForm";

export const useResetPassword = () => {
  const { t } = useI18n();
  const { inputRequiredEmail } = useFields();
  const { validEmail } = useValid();
  const { toastPromise } = useToastPromise();

  const schema: SchemaType = {
    fields: [inputRequiredEmail],
    submitValue: t("reset.form.submit"),
    messages: [],
  };

  const handleSubmit = async (values: any) => {
    const email: string = values.email;

    const validators = [validEmail(email)];

    for (let res of validators)
      if (res.isValid !== true) {
        toast.error(t("toast.errorField", { field: res.field }));
        return false;
      }

    toastPromise(
      "/api/reset-password",
      { email },
      (_: any) => t("toast.successReset"),
      (data: any) => {
        if (data.status === 404) return t("toast.userNotExist");
        if (data.status === 409) return t("toast.userNotConfirmed");
        return "Error";
      },
      "PATCH"
    );

    return true;
  };

  return { schema, handleSubmit };
};
