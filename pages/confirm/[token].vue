<script setup lang="ts">
definePageMeta({ layout: "header" });
import { useConfirmedPage } from "~/composables/pages/confirmed";

let { confirmed } = useConfirmedPage();
</script>

<template>
  <section class="Message" v-if="confirmed === null">
    <Loader />
  </section>
  <section class="Message" v-else-if="!confirmed">
    <h1>{{ $t("confirmed.error") }}</h1>
    <p>{{ $t("confirmed.errorMessage") }}</p>
    <a href="/register">{{ $t("confirmed.register") }} →</a>
  </section>
  <section class="Message" v-else-if="confirmed">
    <h1>{{ $t("confirmed.success") }}</h1>
    <p>{{ $t("confirmed.successMessage") }}</p>
    <a href="/login">{{ $t("confirmed.login") }} →</a>
  </section>
</template>
