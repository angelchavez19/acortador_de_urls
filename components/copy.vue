<script setup lang="ts">
const props = defineProps({ text: String, handleClick: Function });
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

let { t } = useI18n();

const copyOnClipboard = async () => {
  if (!props.text) return;

  try {
    await navigator.clipboard.writeText(props.text);
    toast.success(t("toast.copy"));
    if (props.handleClick) props.handleClick();
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
