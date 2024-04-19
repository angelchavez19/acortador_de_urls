<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
</script>

<template>
  <div class="CardMessage">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
    <div class="CardMessage-links">
      <slot />
    </div>
  </div>
</template>

<style scope lang="sass">
.CardMessage
  @include flex-center-center()
  flex-direction: column
  background-color: $accent-4
  width: calc( 100% - 2rem - 1rem )
  max-width: 500px
  padding: 1rem
  gap: .5rem
  border-radius: 20px
  .CardMessage-links
    @include flex-center-evenly()
    width: 100%
    gap: 1rem
    margin-top: .5rem
    a
      padding: .3rem .3rem
      border-radius: 20px
      background-color: $accent-3
      color: $color-2
      text-decoration: none
      text-align: center
      width: 45%
</style>
