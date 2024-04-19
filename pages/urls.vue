<script setup lang="ts">
definePageMeta({ layout: "protected" });
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { string } from "yup";
import { useAuth } from "~/composables/auth";
import { SERVER } from "~/config/app.config";
import type { UrlSchema } from "~/interfaces/schema";
import type { StateUser } from "~/types/user";

let { t } = useI18n();
const { requestToAPIProtected } = useAuth();

let state: Ref<StateUser | null> = ref(null);
let urls: Ref<UrlSchema[] | null> = ref(null);

let url: Ref<string> = ref("");
let shortUrl: Ref<string | undefined> = ref(undefined);
let isSaved: Ref<boolean> = ref(false);

const handleSubmit = async () => {
  if (!url.value && !url.value.endsWith(SERVER)) {
    toast.error(t("toast.errorField", { field: "url" }));
    url.value = "";
    return;
  }

  try {
    await string().url().validate(url.value);
  } catch {
    toast.error(t("toast.errorField", { field: "url" }));
    url.value = "";
    return;
  }

  const response = await requestToAPIProtected(
    "api/premium/generate_url",
    "GET"
  );

  if (!response) return;
  shortUrl.value = response.shortUrl;
  isSaved.value = true;
};

const handleSave = async () => {
  url.value = "";
  isSaved.value = false;
};

onMounted(async () => {
  const response = await requestToAPIProtected("/api/premium/url", "GET");
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
      <Copy v-show="!isSaved && shortUrl" :text="`${SERVER}p/${shortUrl}`" />
    </FormUrl>
  </section>
  <!-- <section class="Section Urls" v-if="urls">
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
  </section> -->
</template>

<style scope lang="sass">
.Pay
  p span
    border: 2px solid $accent-1
</style>
