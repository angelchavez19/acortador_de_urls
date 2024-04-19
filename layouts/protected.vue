<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useAuth } from "~/composables/auth";
import { Toaster } from "vue-sonner";

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

  <BaseHeader
    v-if="auth"
    to="/urls"
    :aria-label="$t('protected.urlsPageArial')"
  >
    <!-- <NuxtLink
      to="/settings"
      class="Setting"
      :aria-label="$t('protected.settingsPageArial')"
    >
      <IconSetting />
    </NuxtLink> -->
  </BaseHeader>
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
