<script setup lang="ts">
defineProps({
  fill: { type: String },
});
</script>

<template>
  <svg viewBox="0 0 22 22" :fill="fill">
    <path
      d="M11 .6c-1.3 0-2.4.8-2.8 2H4.8c-1.3 0-2.4.8-2.8 2v11c-1.2.4-2 1.5-2 2.8 0 1.7 1.3 3 3 3s3-1.3 3-3c0-1.3-.8-2.4-2-2.8v-10s0-1 1-1h3c.4 1.2 1.5 2 3 2s2.4-.8 3-2h3s1 0 1 1v10c-1.2.4-2 1.5-2 2.8 0 1.7 1.3 3 3 3s3-1.3 3-3c0-1.3-.8-2.4-2-2.8v-11c-.4-1.2-1.5-2-2.8-2H14c-.4-1.2-1.5-2-3-2m8 17c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m-16 2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1"
    />
  </svg>
</template>
