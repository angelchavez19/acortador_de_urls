<script setup lang="ts">
definePageMeta({ layout: "protected" });
import { useUrlsPage } from "~/composables/pages/urls";

let {
  isSaved,
  state,
  url,
  urls,
  textToCopy,
  shortUrl,
  handleCopy,
  handleSubmit,
  handleSave,
} = useUrlsPage();
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
  <section class="Section Pay" v-else-if="state === 'paid'">
    <FormUrl v-model="url" :short-url="shortUrl" :handle-submit="handleSubmit">
      <div class="p">
        <p>/p/</p>
        <input type="text" v-model="shortUrl" />
      </div>
      <button
        type="button"
        @click="handleSave"
        v-show="isSaved"
        :aria-label="$t('urls.ariaSaveButton')"
      >
        <IconSave />
      </button>
      <Copy
        v-show="!isSaved && shortUrl"
        :text="textToCopy"
        :handle-click="handleCopy"
      />
    </FormUrl>
  </section>
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

<style scope lang="sass">
.Pay
  p span
    border: 2px solid $accent-1
</style>
