<script setup lang="ts">
defineProps({
  to: String,
  ariaLabel: String,
});
</script>

<template>
  <div class="Header-container">
    <header class="Header">
      <NuxtLink :to="to" class="Header-icon" :aria-label="ariaLabel">
        <IconLogo />
      </NuxtLink>
      <nav class="Header-nav">
        <LanguageSelector />
        <slot />
      </nav>
    </header>
  </div>
</template>

<style scope lang="sass">
.Header-container
  @include flex--center()
  width: 100%
  .Header
    @include flex--start()
    background-color: $accent-3
    width: calc( 100% - 2rem )
    max-width: 1200px
    padding: .5rem 1rem
    gap: 1rem
    .Header-icon
      @include flex-center-center()
      background-color: $accent-1
      border-radius: 50%
      width: 50px
      height: 50px
      svg
        width: 30px
        height: 30px
        fill: $white
    .Header-nav
      @include flex-center-end()
      flex: 1
      gap: 1rem
</style>
