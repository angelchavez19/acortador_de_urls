<script setup lang="ts">
definePageMeta({ layout: "protected" });
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import { useAuth } from "~/composables/auth";

const { t } = useI18n();
const { requestToAPIProtected } = useAuth();

const handleSubmit = () => {
  toast.promise(requestToAPIProtected("api/pay"), {
    loading: "Loading...",
    success: (data: any) => {
      navigateTo("/urls");
      return t("toast.successPay");
    },
    error: (data: any) => {
      if (data.status === 409) return t("toast.errorPay");
      return "error";
    },
  });
};
</script>

<template>
  <section class="Message">
    <h1>{{ $t("pay.title") }}</h1>
    <p>{{ $t("pay.message") }}</p>
    <button type="button" @click="handleSubmit">
      {{ $t("pay.button") }}
    </button>
  </section>
</template>
