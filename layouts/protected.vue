<script setup lang="ts">
import { ref, type Ref } from "vue";

let auth: Ref<null | boolean> = ref(null);
const { push } = useRouter();

onMounted(async () => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    push("/login");
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

  <BaseHeader
    v-if="auth"
    to="/urls"
    :aria-label="$t('protected.urlsPageArial')"
  >
    <NuxtLink
      to="/settings"
      class="Setting"
      :aria-label="$t('protected.settingsPageArial')"
    >
      <IconSetting />
    </NuxtLink>
  </BaseHeader>
  <main v-if="auth"><slot /></main>
</template>

<style scope lang="sass">
.Setting
  @include flex-center-center()
  background-color: $accent-1
  width: 40px
  height: 40px
  border-radius: 50%
  svg
    width: 25px
    height: 25px
    fill: $white
</style>
