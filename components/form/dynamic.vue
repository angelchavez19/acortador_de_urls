<script setup lang="ts">
import { type PropType } from "vue";
import { type SchemaType } from "~/interfaces/schema";
const props = defineProps({
  schema: { type: Object as PropType<SchemaType>, required: true },
  submit: {
    type: Function as PropType<(values: any) => Promise<boolean>>,
    required: true,
  },
});

const getFields = (e: EventTarget) => {
  let fields: any = {};
  props.schema.fields.forEach(({ name }) => {
    fields[name] = e[name].value;
  });
  return fields;
};

const resetFields = (e: EventTarget) => {
  props.schema.fields.forEach(({ name }) => (e[name].value = ""));
};

const onSubmit = async (e: SubmitEvent) => {
  if (!e.target) return;
  if (await props.submit(getFields(e.target))) resetFields(e.target);
};
</script>

<template>
  <VeeForm as="">
    <form novalidate class="Form" @submit.prevent="onSubmit">
      <FormInputBase v-for="field in schema.fields">
        <FormInputPassword
          v-if="field.type === 'custom-password'"
          v-bind="{
            name: field.name,
            label: field.label,
            placeholder: field.placeholder,
          }"
        />
        <FormInputText
          v-else
          v-bind="{
            label: field.label,
            type: field.type,
            name: field.name,
            placeholder: field.placeholder,
            rules: field.rules,
            as: field.as,
          }"
        />
        <NuxtLink t v-if="field.link" :to="field.link.href">{{
          field.link.text
        }}</NuxtLink>
      </FormInputBase>
      <FormInputSubmit :value="schema.submitValue" />
      <FormMessage v-for="message in schema.messages" v-bind="message" />
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
