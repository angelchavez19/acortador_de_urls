<script setup lang="ts">
definePageMeta({ layout: "protected" });
import { type StateUser } from "~/types/user";
import { ref, type Ref } from "vue";
import { useAuth } from "~/composables/auth";
import type { UrlSchema } from "~/interfaces/schema";

const { requestToAPIProtected } = useAuth();

let state: Ref<StateUser | null> = ref(null);
let urls: Ref<UrlSchema[] | null> = ref(null);

onMounted(async () => {
  const response = await requestToAPIProtected("/api/url/premium", "GET");
  if (response.urls && response.state) {
    urls.value = response.urls as UrlSchema[];
    state.value = response.state;
  }
});
</script>

<template>
  <section class="Section NewUser" v-if="state === 'new-user'">
    <CardMessage
      :title="$t('urls.new_user.title')"
      :content="$t('urls.new_user.content')"
    >
      <NuxtLink :to="$t('urls.linkOccasional.to')">{{
        $t("urls.linkOccasional.text")
      }}</NuxtLink>
      <NuxtLink :to="$t('urls.linkPay.to')">{{
        $t("urls.linkPay.text")
      }}</NuxtLink>
    </CardMessage>
  </section>
  <section class="Section NotPaid" v-else-if="state === 'not-paid'">
    <CardMessage
      :title="$t('urls.not_paid.title')"
      :content="$t('urls.not_paid.content')"
    >
      <NuxtLink :to="$t('urls.linkPay.to')">{{
        $t("urls.linkPay.text")
      }}</NuxtLink>
    </CardMessage>
  </section>
  <section class="Section Pay" v-else-if="state === 'paid'"></section>
  <section class="Section Urls" v-if="urls">
    <table class="Urls-table">
      <thead class="Urls-tableHead">
        <tr>
          <th>ID</th>
          <th>Url</th>
          <th>Short Url</th>
          <th>Visits</th>
        </tr>
      </thead>
      <tbody class="Urls-tableBody">
        <tr v-for="url in urls">
          <th>{{ url.id }}</th>
          <th>{{ url.url }}</th>
          <th>{{ url.short_url }}</th>
          <th>{{ url.visits }}</th>
          <th><button>D</button></th>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scope lang="sass"></style>
