<script setup lang="ts">
import { ref, type Ref } from "vue";
import { Toaster } from "vue-sonner";
import { useAuth } from "~/composables/auth";

const { requestToAPIProtected } = useAuth();

let auth: Ref<null | boolean> = ref(null);

onMounted(async () => {
  const response = await requestToAPIProtected("/api/auth");
  auth.value = response.auth;
});
</script>

<template>
  <main class="Main" v-if="auth === null">
    <section class="Message">
      <Loader />
    </section>
  </main>
  <main v-else-if="!auth"></main>

  <BaseHeader v-if="auth" to="/" :aria-label="$t('protected.urlsPageArial')" />
  <main v-if="auth" class="Main">
    <slot />
    <Toaster class="Toaster" theme="dark" />
  </main>
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
