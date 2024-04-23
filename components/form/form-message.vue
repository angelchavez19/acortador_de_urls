<script setup lang="ts">
defineProps({
  message: { type: String, required: true },
  href: { type: String, required: true },
  text: { type: String, required: true },
});
</script>

<template>
  <p class="FormMessage">
    {{ message }} <NuxtLink :to="href">{{ text }}</NuxtLink>
  </p>
</template>

<style scope lang="sass">
.FormMessage
  color: $color-2
  text-align: center
  a
    color: $light-blue
</style>
