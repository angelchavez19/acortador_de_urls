<script setup lang="ts"></script>

<template>
  <header>Header</header>
  <main class="Main">
    <slot />
  </main>
</template>

<style scope lang="sass">
.Main
  @include flex-center-evenly()
  flex-direction: column
  width: 100%
</style>
