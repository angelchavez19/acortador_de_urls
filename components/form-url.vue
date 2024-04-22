<script setup lang="ts">
defineProps({
  modelValue: { type: String, required: true },
  handleSubmit: { type: Function, required: true },
  shortUrl: { type: String },
});
</script>

<template>
  <form class="FormURL" novalidate @submit.prevent="handleSubmit">
    <input
      type="text"
      name="url"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :placeholder="$t('forms.placeholderURLInput')"
    />
    <button type="submit" aria-label="Submit">
      <IconScissors />
    </button>
  </form>
  <div class="FormURL-shortUrl" v-show="shortUrl !== undefined">
    <slot />
  </div>
</template>

<style scope lang="sass">
.FormURL,
.FormURL-shortUrl
  @include flex-center-evenly()
  gap: 1rem
  width: 100%
  max-width: 600px
  input,
  .p
    @include flex-center-()
    border: none
    background-color: $accent-4
    flex: 1
    font-size: 1.1rem
    padding: 0 .7rem
    border-radius: 50px
    width: calc( 100% - 1.4rem - 40px )
    height: 50px
  div.p
    justify-content: flex-start
    gap: 0
    p
      width: auto
    input
      width: 100px
  div.p:hover input
    outline: 1px solid $color-1
  button
    @include flex-center-center()
    border: none
    background-color: $accent-4
    width: 50px
    height: 50px
    border-radius: 50%
    cursor: pointer
  button:active
    transform: scale(.9)
  button svg
    width: 25px
    height: 25px
</style>
