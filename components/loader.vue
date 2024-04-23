<script setup lang="ts"></script>

<template>
  <div class="loader"></div>
</template>

<style scope lang="sass">
.loader
  width: fit-content
  font-weight: bold
  font-size: 30px
  clip-path: inset(0 100% 0 0)
  animation: loader 2s steps(11) infinite
.loader:before
  content: "Loading..."
.dark-mode .loader:before
  color: $white

@keyframes loader
  to
    clip-path: inset(0 -1ch 0 0)
</style>
