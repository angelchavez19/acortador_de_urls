<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
});
</script>

<template>
  <button class="FormSubmit">
    {{ value }}
  </button>
</template>

<style scope lang="sass">
.FormSubmit
  width: 100%
  padding: .5rem
  background-color: $color-1
  border: none
  border-radius: 20px
  color: $color-2
  font-size: 1.2rem
  text-transform: uppercase
  cursor: pointer
.FormSubmit:active
  transform: scale(.95)
</style>
