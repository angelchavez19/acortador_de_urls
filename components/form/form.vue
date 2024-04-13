<script setup lang="ts">
const props = defineProps(["handleSubmit"]);

const onSubmit = () => {
  props.handleSubmit();
};
</script>

<template>
  <VeeForm as="">
    <form class="Form" @submit.prevent="onSubmit">
      <slot />
    </form>
  </VeeForm>
</template>

<style scope lang="sass">
.Form
  @include flex-center-evenly()
  flex-direction: column
  width: 100%
  gap: 1rem
</style>
