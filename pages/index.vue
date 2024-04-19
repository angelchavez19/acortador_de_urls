<script setup lang="ts">
definePageMeta({ layout: "header" });
import { useIndexPage } from "~/composables/pages";

let { handleSubmit, url, shortUrl, content } = useIndexPage();
</script>

<template>
  <section class="Hero" id="occasional">
    <IconLogo />
    <FormUrl v-model="url" :short-url="shortUrl" :handle-submit="handleSubmit">
      <p class="p">{{ shortUrl }}</p>
      <Copy :text="shortUrl" />
    </FormUrl>
  </section>
  <section class="Plans">
    <h2>{{ $t("index.titleSection") }}</h2>
    <div class="Plans-content">
      <CardPlan v-for="cont in content" :content="cont" />
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
.Hero,
.Plans
  padding-top: 2rem
  width: calc( 100% - 2rem )
  gap: 1.5rem
  flex-direction: column
.Hero
  @include flex-center-evenly()
  svg
    width: 180px
    height: 180px
.Plans
  @include flex-center-()
  h2
    color: $color-1
    text-align: center
  .Plans-content
    @include flex-stretch-evenly()
    flex-wrap: wrap
    width: 100%
    gap: 2rem
</style>
