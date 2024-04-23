import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { type SchemaType } from "~/interfaces/schema";
import {
  useFields,
  useValid,
  useToastPromise,
} from "~/composables/dynamicForm";
import { toJSON } from "~/helpers/json";

export const useConfirmResetPage = () => {
  const { t } = useI18n();
  const { inputRequiredPassword } = useFields();
  const { validPassword } = useValid();
  const { toastPromise } = useToastPromise();

  let confirmed: Ref<null | boolean> = ref(null);

  const schema: SchemaType = {
    fields: [inputRequiredPassword],
    submitValue: t("confirmReset.page.title"),
    messages: [],
  };

  const handleSubmit = async (values: any) => {
    let { params } = useRoute();

    if (!params.token) return false;

    const password = values.password;
    const validators = [validPassword(password)];

    for (let res of validators)
      if (res.isValid !== true) {
        toast.error(t("toast.errorField", { field: res.field }));
        return false;
      }

    const data = await $fetch(`/api/confirm-reset/${params.token}`, {
      method: "POST",
      body: toJSON({ password }),
    });
    confirmed.value = data.confirmed;
    return true;
  };

  return { confirmed, schema, handleSubmit };
};
