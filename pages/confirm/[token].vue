<script setup lang="ts">
definePageMeta({ layout: "header" });
import { ref, type Ref } from "vue";

let confirmed: Ref<null | boolean> = ref(null);

onMounted(async () => {
  let {
    params: { token },
  } = useRoute();

  const data = await $fetch(`/api/confirm/${token}`);
  confirmed.value = data.confirmed;
});
</script>

<template>
  <section class="Confirmed" v-if="confirmed === null">
    <Loader />
  </section>
  <section class="Confirmed" v-else-if="!confirmed">
    <h1>{{ $t("confirmed.error") }}</h1>
    <p>{{ $t("confirmed.errorMessage") }}</p>
    <a href="/register">{{ $t("confirmed.register") }} →</a>
  </section>
  <section class="Confirmed" v-else-if="confirmed">
    <h1>{{ $t("confirmed.success") }}</h1>
    <p>{{ $t("confirmed.successMessage") }}</p>
    <a href="/login">{{ $t("confirmed.login") }} →</a>
  </section>
</template>

<style scope lang="sass">
.Confirmed
  @include flex-center-center()
  flex-direction: column
  width: 100%
  height: calc( 100vh - 2rem )
  gap: 1rem
  h1,
  p
    text-align: center
  h1
    font-size: 2rem
  p
    font-size: 1.5rem
  a
    padding: 1rem
    outline: 1px solid $color-1
    box-shadow: 0 0 5px 0 $accent-1
    border-radius: 10px
    margin-top: 1rem
    text-decoration: none
    color: $color-1
</style>
