<script setup lang="ts">
definePageMeta({ layout: "header" });
import { useIndexPage } from "~/composables/pages";

let { handleSubmit, url, shortUrl, content } = useIndexPage();
</script>

<template>
  <section class="Hero" id="occasional">
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
