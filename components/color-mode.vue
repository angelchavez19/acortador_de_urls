<script setup lang="ts">
import { ref, type Ref } from "vue";

const colorMode = useColorMode();
let selectState: Ref<boolean> = ref(false);

const onChangueColorMode = (color: string) => {
  colorMode.value = color;
  selectState.value = false;
  localStorage.setItem("nuxt-color-mode", color);
};
</script>

<template>
  <div class="ColorSelect">
    <div class="ColorSelect-current" @click="selectState = !selectState">
      <IconSun v-if="$colorMode.value === 'light'" />
      <IconMoon v-else-if="$colorMode.value === 'dark'" />
    </div>
    <div class="ColorSelect-modes" v-show="selectState">
      <button
        @click="() => onChangueColorMode('light')"
        type="button"
        :aria-label="$t('urls.modes.light')"
      >
        <IconSun />
      </button>
      <button
        @click="() => onChangueColorMode('dark')"
        type="button"
        :aria-label="$t('urls.modes.dark')"
      >
        <IconMoon />
      </button>
    </div>
  </div>
</template>

<style scope lang="sass">
.ColorSelect
  @include flex-center-center()
  position: relative
  .ColorSelect-current,
  .ColorSelect-modes button
    @include flex-center-center()
    background-color: $accent-1
    width: 45px
    height: 45px
    border-radius: 50%
    svg
      width: 25px
      height: 25px
      fill: $white
  .ColorSelect-modes
    @include flex-center-center()
    flex-direction: column
    gap: .2rem
    width: 100%
    position: absolute
    bottom: -110px
    button
      background-color: $accent-3
      border: none
</style>
