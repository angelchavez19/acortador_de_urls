<script setup lang="ts">
import { useLoginPage } from "~/composables/pages/login";

let { handleSubmit, schema } = useLoginPage();
</script>

<template>
  <AuthForm :title="$t('login.title')">
    <FormDynamic :schema="schema" :submit="handleSubmit" />
  </AuthForm>
</template>
