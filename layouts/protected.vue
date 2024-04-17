<script setup lang="ts">
import { ref, type Ref } from "vue";

let auth: Ref<null | boolean> = ref(null);
const { push } = useRouter();

onMounted(async () => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    auth.value = false;
    return;
  }

  const response = await $fetch("/api/auth", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.auth) push("/login");
  auth.value = response.auth;
});
</script>

<template>
  <main class="Main" v-if="auth === null">
    <section class="Confirmed">
      <Loader />
    </section>
  </main>
  <main v-else-if="!auth"></main>
  <header v-if="auth">Header</header>
  <main v-if="auth"><slot /></main>
</template>

<style scope lang="sass"></style>
