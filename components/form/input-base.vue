<template>
  <div class="input">
    <slot />
  </div>
</template>

<style scope lang="sass">
.input
  @include flex--start()
  flex-direction: column
  width: 100%
  a
    margin-top: .5rem
    color: $white
    text-align: center
</style>
