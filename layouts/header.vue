<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template>
  <BaseHeader to="/" :aria-label="$t('protected.urlsPageArial')">
    <div class="HeaderLogin">
      <NuxtLink to="/login">{{ $t("index.headerLogin") }}</NuxtLink>
    </div>
  </BaseHeader>
  <main class="Main">
    <slot />
    <Toaster class="Toaster" theme="dark" />
  </main>
</template>

<style scope lang="sass">
.Main
  @include flex-center-evenly()
  flex-direction: column
  width: 100%
</style>
