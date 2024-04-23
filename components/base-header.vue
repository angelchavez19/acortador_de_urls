<script setup lang="ts">
defineProps({ to: String, ariaLabel: String });
</script>

<template>
  <div class="Header-container">
    <header class="Header">
      <NuxtLink :to="to" class="Header-icon" :aria-label="ariaLabel">
        <IconLogo />
      </NuxtLink>
      <nav class="Header-nav">
        <ClientOnly>
          <LanguageSelector />
        </ClientOnly>
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
    width: calc( 100% - .6rem )
    max-width: 1200px
    padding: .5rem .3rem
    gap: .5rem
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
      gap: .5rem
@media (min-width: 350px)
  .Header-container .Header
    width: calc( 100% - 1.4rem )
    padding: .5rem .7rem
    gap: 1rem
    .Header-nav
      gap: 1rem
@media (min-width: 370px)
  .Header-container .Header
    width: calc( 100% - 2rem )
    padding: .5rem 1rem
</style>
