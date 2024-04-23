<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template>
  <BaseHeader to="/" :aria-label="$t('protected.urlsPageArial')">
    <ClientOnly>
      <ColorMode />
    </ClientOnly>
    <div class="HeaderLogin">
      <NuxtLink to="/login">{{ $t("index.headerLogin") }}</NuxtLink>
    </div>
  </BaseHeader>
  <main class="Main">
    <slot />
    <Toaster
      class="Toaster"
      :theme="$colorMode.value === 'light' ? 'dark' : 'light'"
    />
  </main>
</template>

<style scope lang="sass">
.Main
  @include flex-center-evenly()
  flex-direction: column
  width: 100%
.HeaderLogin
  background-color: $accent-1
  padding: .5rem .3rem
  a
    color: $color-2
    text-decoration: none
    font-size: 1rem
</style>
