import { ref, type Ref } from "vue";

export const useConfirmedPage = () => {
  let confirmed: Ref<null | boolean> = ref(null);

  onMounted(async () => {
    let {
      params: { token },
    } = useRoute();

    const data = await $fetch(`/api/confirm/${token}`, { method: "POST" });
    confirmed.value = data.confirmed;
  });

  return { confirmed };
};
