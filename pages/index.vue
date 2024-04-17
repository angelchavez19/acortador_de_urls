<script setup lang="ts">
definePageMeta({ layout: "header" });

import { ref, type Ref } from "vue";
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";

let { t } = useI18n();

let url: Ref<string> = ref("");
let shortUrl: Ref<undefined | string> = ref(undefined);

const handleSubmit = () => {
  if (!url.value) {
    toast.error(t("toast.errorField", { field: "url" }));
    return;
  }

  toast.promise(
    $fetch("/api/urls", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ url: url.value }),
    }),
    {
      loading: "Loading...",
      success: (data: any) => {
        shortUrl.value = data.shortUrl;
        return t("toast.successUrl");
      },
      error: (data: any) => {
        if (data.status === 400) return t("toast.errorUrl");
        if (data.status === 507) return t("toast.errorUrl507");
        return "Error";
      },
    }
  );
  url.value = "";
};
</script>

<template>
  <section class="Hero">
    <IconLogo />
    <form class="Hero-form" novalidate @submit.prevent="handleSubmit">
      <input
        type="text"
        name="url"
        v-model="url"
        :placeholder="$t('index.form.placeholder')"
      />
      <button type="submit" aria-label="Submit">
        <IconScissors />
      </button>
    </form>
    <div class="Hero-shortUrl" v-show="shortUrl">
      <p>{{ shortUrl }}</p>
      <Copy :text="shortUrl" />
    </div>
  </section>
</template>

<style scope lang="sass">
.HeaderLogin
  background-color: $accent-1
  padding: .5rem .7rem
  a
    color: $color-2
    text-decoration: none
.Hero
  @include flex-center-evenly()
  flex-direction: column
  padding-top: 2rem
  width: calc( 100% - 2rem )
  gap: 1.5rem
  svg
    width: 180px
    height: 180px
  .Hero-form,
  .Hero-shortUrl
    @include flex-center-evenly()
    gap: 1rem
    width: 100%
    max-width: 600px
    input,
    p
      @include flex-center-()
      border: none
      background-color: $accent-4
      flex: 1
      font-size: 1.1rem
      padding: 0 .7rem
      border-radius: 50px
      width: calc( 100% - 1.4rem - 40px )
      height: 50px
    button
      @include flex-center-center()
      display: block
      border: none
      background-color: $accent-4
      width: 50px
      height: 50px
      border-radius: 50%
    button svg
      width: 25px
      height: 25px
</style>
