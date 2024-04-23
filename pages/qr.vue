<script setup lang="ts">
definePageMeta({ layout: "protected" });
import VueQrcode from "vue-qrcode";
import { useQRPage } from "~/composables/pages/qr";

let { message, dataUrl, onDataUrlChange } = useQRPage();
</script>

<template>
  <section class="Section">
    <div class="QR-input">
      <textarea
        v-model="message"
        type="text"
        :placeholder="$t('qr.qr.placeholder')"
      ></textarea>
    </div>
    <div class="QR" v-show="message">
      <a
        v-if="dataUrl"
        :href="dataUrl"
        download="qr"
        class="QR-download"
        :aria-label="$t('qr.qr.ariaDownload')"
      >
        <IconDownload />
      </a>
      <div class="QR-qr">
        <VueQrcode
          :value="message"
          type="image/png"
          :color="{ dark: '#000000', light: '#ffffff' }"
          @change="onDataUrlChange"
        />
      </div>
    </div>
  </section>
</template>

<style scope lang="sass">
.Section
  gap: 2rem
  .QR-input,
  .QR
    @include flex-center-center()
  .QR-input textarea
    min-width: 220px
    width: calc( 300px - 1.4rem )
    max-width: 100%
    min-height: 50px
    height: 50px
    border: none
    background-color: $accent-4
    font-size: 1.1rem
    padding: .7rem
    border-radius: 20px
  .QR
    flex-direction: column
    gap: 1rem
    .QR-download
      @include flex-center-center()
      outline: 2px solid $accent-1
      border-radius: 50%
      padding: .7rem
      svg
        width: 35px
        height: 35px
    .QR-qr
      @include flex-center-center()
      outline: 2px solid #000
// Dark
.dark-mode .Section .QR
  .QR-download
    outline: 2px solid $color-2
    svg
      fill: $color-2
  .QR-qr
    outline: 2px solid $accent-4
</style>
