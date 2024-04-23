<script setup lang="ts">
import { useResetPassword } from "~/composables/pages/reset-password";

const { schema, handleSubmit } = useResetPassword();
</script>

<template>
  <AuthForm :title="$t('reset.title')">
    <FormDynamic :schema="schema" :submit="handleSubmit" />
  </AuthForm>
</template>
