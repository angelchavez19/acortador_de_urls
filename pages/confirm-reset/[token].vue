<script setup lang="ts">
definePageMeta({ layout: "header" });
import { useConfirmResetPage } from "~/composables/pages/confirm-reset";

let { confirmed, schema, handleSubmit } = useConfirmResetPage();
</script>

<template>
  <AuthForm :title="$t('confirmReset.page.title')" v-if="confirmed === null">
    <FormDynamic :schema="schema" :submit="handleSubmit" />
  </AuthForm>
  <section class="Message" v-else-if="!confirmed">
    <h1>{{ $t("confirmReset.error") }}</h1>
    <p>{{ $t("confirmReset.errorMessage") }}</p>
    <a href="/register">{{ $t("confirmReset.register") }} →</a>
  </section>
  <section class="Message" v-else-if="confirmed">
    <h1>{{ $t("confirmReset.success") }}</h1>
    <p>{{ $t("confirmReset.successMessage") }}</p>
    <a href="/login">{{ $t("confirmReset.login") }} →</a>
  </section>
</template>
