<script setup lang="ts">
import { ref, type Ref } from "vue";
import { Toaster } from "vue-sonner";
import { useAuth } from "~/composables/auth";

const { requestToAPIProtected } = useAuth();

let auth: Ref<null | boolean> = ref(null);
let name: Ref<null | string> = ref(null);

onMounted(async () => {
  const response = await requestToAPIProtected("/api/auth");
  auth.value = response.auth;
  name.value = response.name.name;
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
    <ColorMode />
    <NuxtLink to="/qr" class="PageQR" :aria-label="$t('qr.header.ariaLink')">
      <IconQr />
    </NuxtLink>
    <p class="Name">{{ name }}</p>
  </BaseHeader>
  <main v-if="auth" class="Main">
    <slot />
    <Toaster
      class="Toaster"
      :theme="$colorMode.value === 'light' ? 'dark' : 'light'"
    />
  </main>
</template>

<style scope lang="sass">
.PageQR
  @include flex-center-center()
  background-color: $accent-1
  width: 45px
  height: 45px
  border-radius: 50%
  svg
    width: 25px
    height: 25px
    fill: $white
.Name
  color: $color-2
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 60px
@media (min-width: 400px)
  .Name
    max-width: 100px
@media (min-width: 500px)
  .Name
    max-width: 180px
@media (min-width: 600px)
  .Name
    max-width: 290px
@media (min-width: 700px)
  .Name
    max-width: 400px
@media (min-width: 800px)
  .Name
    max-width: 490px
</style>
