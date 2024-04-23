<script setup lang="ts">
defineProps({ title: { type: String, required: true } });
import { Toaster } from "vue-sonner";
</script>

<template>
  <main>
    <section>
      <div class="FormAuth">
        <IconLogo class="FormAuth-logo" />
        <h1 class="FormAuth-title">{{ title }}</h1>
        <slot />
      </div>
    </section>
    <Toaster class="Toaster" theme="dark" />
  </main>
</template>

<style scope lang="sass">
$logo-size: 150px

section
  @include flex-center-evenly()
  width: 100%
  .FormAuth
    @include flex-center-evenly()
    flex-direction: column
    background-color: $accent-1
    width: calc( 300px - 2rem )
    padding: 1rem
    border-radius: 20px
    gap: 1rem
    margin-top: 1.5rem
    .FormAuth-logo
      width: $logo-size
      height: $logo-size
      fill: $white
    .FormAuth-title
      color: $color-2
      font-size: 2rem
      text-transform: uppercase
      text-align: center
</style>
