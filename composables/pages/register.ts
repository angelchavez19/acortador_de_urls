import { ref, type Ref } from "vue";
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";

export const useRegisterPage = () => {
  const { t } = useI18n();

  let name: Ref<string> = ref("");
  let email: Ref<string> = ref("");
  let password: Ref<string> = ref("");

  const resetValues = () => {
    name.value = "";
    email.value = "";
    password.value = "";
  };

  const handleSubmit = async () => {
    toast.promise(
      $fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      }),
      {
        loading: "Loading...",
        success: (_) => {
          resetValues();
          return t("toast.successRegister");
        },
        error: (data: any) => {
          resetValues();
          if (data.status === 400) return t("toast.errorRegister");
          else if (data.status === 409) return t("toast.emailExists");
          return "Error";
        },
      }
    );
  };

  return { handleSubmit, name, email, password };
};
