import { toast } from "vue-sonner";
import { useI18n } from "#imports";
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
  };

  return { requestToAPIProtected };
};
