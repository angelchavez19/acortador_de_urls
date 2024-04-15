<script setup lang="ts">
defineProps({
  modelValue: { type: String, required: true },
  inputId: { type: String, required: true },
  label: { type: String },
  placeholder: { type: String },
});
import { ref, type Ref } from "vue";
import { useValidators } from "~/helpers/validators";

const { isRequired, validatePassword } = useValidators();

let hidden: Ref<boolean> = ref(true);
</script>

<template>
  <FormInputBase>
    <label class="InputLabel" :for="inputId">{{ label }}</label>
    <div class="InputPasswordContainer">
      <VeeField :name="inputId">
        <input
          class="InputField"
          @input="$emit('update:modelValue', $event.target?.value)"
          :value="modelValue"
          :name="inputId"
          :id="inputId"
          :type="hidden ? 'password' : 'text'"
          :placeholder="placeholder"
          autocomplete="new-password"
          :rules="[isRequired, validatePassword]"
        />
      </VeeField>
      <button
        :aria-label="$t('forms.passwordAriaLabel')"
        type="button"
        @click="hidden = !hidden"
      >
        <IconEye v-show="hidden" />
        <IconEyeInvisible v-show="!hidden" />
      </button>
    </div>
    <VeeError class="InputError" :name="inputId" />
  </FormInputBase>
</template>

<style scope lang="sass">
.InputPasswordContainer
  @include flex-center-evenly()
  gap: .5rem
  width: 100%
  position: relative
  input
    width: calc( 100% - 1rem )
  button
    @include flex-center-()
    position: absolute
    top: 0
    right: 7px
    width: 30px
    height: 100%
    background-color: $white
    border: none
    svg
      width: 30px
      height: 30px
      fill: $color-1
</style>
