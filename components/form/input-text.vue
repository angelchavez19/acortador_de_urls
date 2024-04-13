<script setup lang="ts">
defineProps({
  label: { type: String },
  modelValue: { type: String, required: true },
  inputId: { type: String, required: true },
  type: { type: String },
  placeholder: { type: String },
  autocomplete: { type: String },
  rules: { type: Array },
});
</script>

<template>
  <FormInputBase>
    <label class="InputLabel" :for="inputId">{{ label }}</label>
    <VeeField
      class="InputField"
      @input="$emit('update:modelValue', $event.target?.value)"
      :name="inputId"
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :rules="rules"
    />
    <VeeError class="InputError" :name="inputId" />
  </FormInputBase>
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
