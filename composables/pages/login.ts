import { ref, type Ref } from "vue";

export const useLoginPage = () => {
  let email: Ref<string> = ref("");
  let password: Ref<string> = ref("");

  const handleSubmit = () => {};

  return { handleSubmit, email, password };
};
