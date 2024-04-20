<script setup lang="ts">
definePageMeta({ layout: "protected" });
import { useUrlsPage } from "~/composables/pages/urls";
import { SERVER } from "~/config/app.config";

let {
  isSaved,
  state,
  url,
  urls,
  textToCopy,
  shortUrl,
  handleCopy,
  handleDelete,
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
  <section class="Urls" v-if="state === 'paid' && urls">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Url</th>
          <th>
            {{ $t("urls.table.short_url") }}
          </th>
          <th>{{ $t("urls.table.visits") }}</th>
          <th :aria-label="$t('urls.table.delete')">
            <IconDelete />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(url, index) in urls">
          <td>{{ index + 1 }}</td>
          <td><Copy :text="url.url" />{{ url.url }}</td>
          <td>
            <Copy :text="`${SERVER}p/${url.short_url}`" />
            {{ `${SERVER}p/${url.short_url}` }}
          </td>
          <td>{{ url.visits }}</td>
          <td>
            <button
              type="button"
              @click="() => handleDelete(url.id)"
              :aria-label="$t('urls.table.delete')"
            >
              <IconDelete />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scope lang="sass">
.Section
  width: calc( 100% - 1rem ) !important
.Pay
  p span
    border: 2px solid $accent-1
.Urls
  display: flex
  width: calc( 100% - 1rem )
  max-width: 1200px
  overflow-x: auto
  table
    width: 100%
    th
      background-color: $accent-3
      padding: 10px
      color: $bg-color
      svg
        width: 25px
        height: 25px
        fill: $color-2
    tr:nth-child(odd)
      background-color: $accent-5
    tr:nth-child(even)
      background-color: $accent-6
    th:nth-child(1),
    th:nth-child(5)
      width: 40px
    th:nth-child(4)
      width: 60px
    td
      white-space: nowrap
      overflow-x: auto
    td:nth-child(1),
    td:nth-child(4),
    td:nth-child(5)
      text-align: center
    td:nth-child(2),
    td:nth-child(3)
      padding: 0 5px
      max-width: 150px
    button
      background-color: transparent
      color: $accent-3
      border: none
      padding: 5px 10px
      cursor: pointer
      svg
        width: 25px
        height: 25px
        fill: $color-1
    button:active
      transform: scale(.9)
.Urls::-webkit-scrollbar,
.Urls table td::-webkit-scrollbar
  height: 10px
.Urls::-webkit-scrollbar-track,
.Urls table td::-webkit-scrollbar-track
  box-shadow: inset 0 0 5px #696969
  border-radius: 10px
.Urls::-webkit-scrollbar-thumb,
.Urls table td::-webkit-scrollbar-thumb
  background: $accent-3
  border-radius: 10px
</style>
