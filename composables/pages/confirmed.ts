import { ref, type Ref } from "vue";

export const useConfirmedPage = () => {
  let confirmed: Ref<null | boolean> = ref(null);

  onMounted(async () => {
    let {
      params: { token },
    } = useRoute();

    const data = await $fetch(`/api/confirm/${token}`);
    confirmed.value = data.confirmed;
  });

  return { confirmed };
};
