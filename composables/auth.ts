import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import type { Method } from "~/types/method";

export const useAuth = () => {
  const { push } = useRouter();
  const { t } = useI18n();

  const token = window.localStorage.getItem("token");

  const requestToAPIProtected = async (
    url: string,
    method: Method = "POST",
    body?: any
  ) => {
    if (!token) {
      toast.error(t("toast.errorAuth"));
      push("/login");
      return false;
    }

    try {
      const response: any = await $fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (!response.auth) {
        toast.error(t("toast.errorAuth"));
        push("/login");
        return false;
      }

      return response;
    } catch {
      toast.error("Opps! Hubo un error. Intentelo más tarde.");
      return false;
    }
  };

  return { requestToAPIProtected };
};
