<template>
  <div class="flex gap-10 p-4">
    <div class="flex gap-4">
      <async-child />
      <async-child />
      <async-child />
      <async-child />
    </div>

    states：{{ root.states }}<br>
    完成時間：{{ doneAt }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AsyncChild from '../components/async-child.vue'

import { useAsyncRoot } from '../composables/use-async-root'

const root = useAsyncRoot()

const doneAt = ref(0)

root.onDone(() => {
  doneAt.value = new Date().getTime()
  console.log('[ onDone ] : ', doneAt.value)
})

root.onDoing(() => {
  console.log('[ onDoing ]')
  doneAt.value = 0
})
</script>

<style scoped lang="sass">
</style>
