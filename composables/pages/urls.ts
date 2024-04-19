import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { string } from "yup";
import { useAuth } from "~/composables/auth";
import { SERVER } from "~/config/app.config";
import { toJSON } from "~/helpers/json";
import { useValidators } from "~/helpers/validators";
import type { UrlSchema } from "~/interfaces/schema";
import type { StateUser } from "~/types/user";

export const useUrlsPage = () => {
  let { t } = useI18n();
  const { requestToAPIProtected } = useAuth();
  const { validateShortUrl } = useValidators();

  let state: Ref<StateUser | null> = ref(null);
  let urls: Ref<UrlSchema[] | null> = ref(null);

  let url: Ref<string> = ref("");
  let shortUrl: Ref<string | undefined> = ref(undefined);
  let isSaved: Ref<boolean> = ref(false);
  let textToCopy: Ref<string> = ref("");

  const handleSubmit = async () => {
    if (!url.value && !url.value.endsWith(SERVER)) {
      toast.error(t("toast.errorField", { field: "url" }));
      url.value = "";
      return;
    }

    try {
      await string().url().validate(url.value);
    } catch {
      toast.error(t("toast.errorField", { field: "url" }));
      url.value = "";
      return;
    }

    const response = await requestToAPIProtected(
      "api/premium/generate_url",
      "GET"
    );

    if (!response) return;
    shortUrl.value = response.shortUrl;
    isSaved.value = true;
  };

  const handleSave = async () => {
    if (!shortUrl.value) {
      toast.error(t("toast.emptyShortURL"));
      return;
    }

    const valid = validateShortUrl(shortUrl.value);

    if (valid !== true) {
      toast.error(valid);
      return;
    }

    const response = await requestToAPIProtected(
      "api/premium/save",
      "POST",
      toJSON({
        url: url.value,
        short_url: shortUrl.value,
      })
    );

    if (!response.urls) {
      toast.error(t("toast.errorURLExists"));
      return;
    }

    toast.success(t("toast.successURLRegister"));
    url.value = "";
    isSaved.value = false;
    urls.value = response.urls;
    textToCopy.value = `${SERVER}p/${shortUrl.value}`;
  };

  const handleDelete = async (id: number) => {
    const response = await requestToAPIProtected(
      "api/premium/delete_url",
      "DELETE",
      toJSON({ id })
    );

    if (!response.deleted) {
      toast.error(t("toast.errorDeleteURL"));
      return;
    }

    toast.success(t("toast.successDeleteURL"));
    urls.value = response.urls;
  };

  const handleCopy = () => {
    shortUrl.value = undefined;
  };

  onMounted(async () => {
    const response = await requestToAPIProtected("/api/premium/url", "GET");
    if (response.urls && response.state) {
      urls.value = response.urls as UrlSchema[];
      state.value = response.state;
    }
  });

  return {
    isSaved,
    state,
    url,
    urls,
    textToCopy,
    shortUrl,
    handleCopy,
    handleDelete,
    handleSubmit,
    handleSave,
  };
};
