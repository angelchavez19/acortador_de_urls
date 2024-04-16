<script setup lang="ts">
import { useRegisterPage } from "~/composables/pages/register";

let { schema, handleSubmit } = useRegisterPage();
</script>

<template>
  <AuthForm :title="$t('register.title')">
    <FormDynamic :schema="schema" :submit="handleSubmit" />
  </AuthForm>
</template>
