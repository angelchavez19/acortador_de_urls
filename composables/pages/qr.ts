import { ref, type Ref } from "vue";

export const useQRPage = () => {
  let message: Ref<string> = ref("");
  let dataUrl: Ref<string | null> = ref(null);

  const onDataUrlChange = (_dataUrl: string) => {
    dataUrl.value = _dataUrl;
  };

  return { message, dataUrl, onDataUrlChange };
};
