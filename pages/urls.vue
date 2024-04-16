<script setup lang="ts">
let token = localStorage.getItem("token");
</script>

<template>
  <h1>URLs</h1>
  <p>{{ token }}</p>
</template>

<style scope lang="sass"></style>
