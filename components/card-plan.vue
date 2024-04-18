<script setup lang="ts">
import { type PropType } from "vue";
import { type ContentSchema } from "~/interfaces/schema";

defineProps({
  content: { type: Object as PropType<ContentSchema>, required: true },
});
</script>

<template>
  <div class="Plan">
    <h3 class="Plan-title">{{ content.title }}</h3>
    <p class="Plan-pricing">{{ content.pricing }}</p>
    <ul class="Plan-card">
      <li v-for="item in content.card">
        <p>{{ item.value }}</p>
        <div v-if="item.message" :data-title="item.message"><IconInfo /></div>
      </li>
    </ul>
    <div class="Plan-action">
      <NuxtLink :to="content.to">{{ content.start }} →</NuxtLink>
    </div>
  </div>
</template>

<style scope lang="sass">
.Plan
  display: flex
  flex-direction: column
  background-color: $accent-1
  padding: 1rem
  border-radius: 10px
  gap: .7rem
  width: calc( 100% - 1.4rem )
  max-width: 320px
  .Plan-title,
  .Plan-pricing
    color: $color-2
  .Plan-title
    font-size: 1.5rem
  .Plan-pricing
    font-size: 1.2rem
  .Plan-card
    display: flex
    flex-direction: column
    gap: 1rem
    margin-top: 1rem
    li
      list-style: none inside url('/check.svg')
      p
        display: inline
        font-size: 1.1rem
        overflow-wrap: break-word
        word-wrap: break-word
        width: 100%
        color: $color-2
      div
        display: inline-block
        margin-left: 1rem
        width: 16px
        height: 16px
      [data-title]:hover:after
        opacity: 1
        transition: all 0.1s ease 0.5s
        display: block
      [data-title]:after
        content: attr(data-title)
        background-color: $accent-3
        color: $color-2
        font-size: 14px
        position: absolute
        padding: 7px
        bottom: -45px
        right: -65px
        white-space: nowrap
        font-weight: 900
        opacity: 0
        border: 1px solid #ffffff
        z-index: 99999
        display: none
        border-radius: 6px
      [data-title]
        position: relative
  .Plan-action
    @include flex-end-center()
    flex: 1
    a
      background-color: $accent-3
      width: 100%
      text-align: center
      color: $bg-color
      text-decoration: none
      font-size: 1.5rem
      border-radius: 20px
</style>
