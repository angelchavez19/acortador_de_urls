import { ref, type Ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { indexPlans } from "~/i18n";
import type { ContentSchema } from "~/interfaces/schema";

export const useIndexPage = () => {
  let { t, locale } = useI18n();

  let url: Ref<string> = ref("");
  let shortUrl: Ref<undefined | string> = ref(undefined);
  let content: ComputedRef<ContentSchema[]> = computed(() => {
    if (locale.value === "en") return indexPlans.en;
    return indexPlans.es;
  });

  const handleSubmit = () => {
    if (!url.value) {
      toast.error(t("toast.errorField", { field: "url" }));
      return;
    }

    toast.promise(
      $fetch("/api/urls", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ url: url.value }),
      }),
      {
        loading: "Loading...",
        success: (data: any) => {
          shortUrl.value = data.shortUrl;
          return t("toast.successUrl");
        },
        error: (data: any) => {
          if (data.status === 400) return t("toast.errorUrl");
          if (data.status === 507) return t("toast.errorUrl507");
          return "Error";
        },
      }
    );
    url.value = "";
  };

  return { handleSubmit, url, shortUrl, content };
};
