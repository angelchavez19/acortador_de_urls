<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

let { locale, setLocale } = useI18n();

let languages = ["en", "es"];
let lang: Ref<string> = ref(locale);
let langSelector: Ref<boolean> = ref(false);

const onChangeLanguage = (_lang: string) => {
  setLocale(_lang);
  useHead({ htmlAttrs: { lang: _lang } });
  lang.value = _lang;
  localStorage.setItem("lang", _lang);
};

onMounted(() => {
  setLocale(localStorage.getItem("lang") || "en");
});
</script>

<template>
  <div class="Language">
    <div class="Language-locale" @click="langSelector = !langSelector">
      <IconLang />
      <p>{{ lang }}</p>
    </div>
    <div
      class="Language-options"
      v-show="langSelector"
      @click="langSelector = !langSelector"
    >
      <button
        type="button"
        v-for="lang in languages"
        @click="() => onChangeLanguage(lang)"
      >
        {{ lang }}
      </button>
    </div>
  </div>
</template>

<style scope lang="sass">
.Language
  position: relative
  width: max-content
  cursor: pointer
  .Language-locale
    @include flex-center-evenly()
    padding: .5rem
    gap: .7rem
    outline: 2px solid $white
    border-radius: 10px
    svg
      width: 20px
      height: 20px
      fill: $white
    p
      color: $white
      text-transform: uppercase
  .Language-options
    @include flex-center-evenly()
    flex-direction: column
    position: absolute
    top: 60px
    background-color: $accent-3
    width: 100%
    cursor: pointer
    button
      background-color: transparent
      border: none
      outline: 1px solid $white
      padding: .5rem
      width: 100%
      color: $color-2
      font-size: 1.2rem
      text-transform: uppercase
</style>
