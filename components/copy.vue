<script setup lang="ts">
const props = defineProps({ text: String });
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

let { t } = useI18n();

const copyOnClipboard = async () => {
  if (!props.text) return;

  try {
    await navigator.clipboard.writeText(props.text);
    toast.success(t("toast.copy"));
  } catch {
    toast.error(t("toast.errorCopy", { value: props.text }));
  }
};
</script>

<template>
  <button
    type="button"
    @click="copyOnClipboard"
    :aria-label="$t('toast.ariaCopy')"
  >
    <IconCopy />
  </button>
</template>

<style scope lang="sass"></style>
