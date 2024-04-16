<script setup lang="ts">
defineProps({
  label: { type: String },
  type: { type: String },
  name: { type: String },
  placeholder: { type: String },
  autocomplete: { type: String },
  rules: { type: Array },
  as: { type: String },
});
</script>

<template>
  <label class="InputLabel" :for="name">{{ label }}</label>
  <VeeField
    :as="as"
    class="InputField"
    :name="name"
    :id="name"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :rules="rules"
  />
  <VeeError class="InputError" :name="name" />
</template>

<style scope lang="sass">
.InputLabel
  color: $color-2
  font-size: 1.5rem
.InputField
  width: calc( 100% - 1rem )
  padding: .5rem
  font-size: 1.2rem
  border: none
  outline: none
  border-radius: 10px
  color: $color-1
  background-color: $white
.InputError
  color: $danger
  font-size: 1.2rem
  margin-top: .4rem
  text-align: center
</style>
