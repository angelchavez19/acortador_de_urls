<script setup lang="ts"></script>

<template>
  <div class="input">
    <slot />
  </div>
</template>

<style scope lang="sass">
.input
  @include flex--start()
  flex-direction: column
  width: 100%
</style>
