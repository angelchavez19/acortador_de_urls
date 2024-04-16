import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { type SchemaType } from "~/interfaces/schema";
import {
  useFields,
  useValid,
  useToastPromise,
} from "~/composables/dynamicForm";

export const useRegisterPage = () => {
  const { t } = useI18n();
  const { inputRequiredName, inputRequiredEmail, inputRequiredPassword } =
    useFields();
  const { validName, validEmail, validPassword } = useValid();
  const { toastPromise } = useToastPromise();

  const schema: SchemaType = {
    fields: [inputRequiredName, inputRequiredEmail, inputRequiredPassword],
    submitValue: t("register.form.login"),
    messages: [
      {
        message: t("register.form.message"),
        href: "/login",
        text: t("register.form.messageText"),
      },
    ],
  };

  const handleSubmit = async (values: any): Promise<boolean> => {
    const name: string = values.name;
    const email: string = values.email;
    const password: string = values.password;

    const validators = [
      validName(name),
      validEmail(email),
      validPassword(password),
    ];

    for (let res of validators)
      if (res.isValid !== true) {
        toast.error(t("register.error", { field: res.field }));
        return false;
      }

    toastPromise("/api/register", { name, email, password }, (data: any) => {
      if (data.status === 400) return t("toast.errorRegister");
      else if (data.status === 409) return t("toast.emailExists");
      return "Error";
    });

    return true;
  };

  return { handleSubmit, schema };
};
