<script setup lang="ts">
import { useI18n } from "vue-i18n";

let { t } = useI18n();

useHead({
  title: t("head.index.title"),
  meta: [{ name: "description", content: t("head.index.description") }],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
