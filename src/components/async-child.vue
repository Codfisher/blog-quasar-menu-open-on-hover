<template>
  <q-card class="flex flex-col">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        Cat Fact
      </div>
    </q-card-section>

    <q-card-section class=" w-[300px] flex-1">
      <q-img :src="cat">
        <q-inner-loading :showing="!isCatReady" />
      </q-img>

      {{ catFact?.fact }}
    </q-card-section>

    <q-card-actions class=" bg-slate-100">
      <q-btn
        label="更新"
        flat
        class="w-full"
        @click="startTask"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { useAsyncChild } from '../composables/use-async-child'

const { state: catFact, isReady: isFactReady, execute: updateFact } = useAsyncState(async () => {
  const res = await fetch('https://catfact.ninja/fact')
  return await res.json() as { fact: string }
}, undefined)

const { state: cat, isReady: isCatReady, execute: updateCat } = useAsyncState(async () => {
  const res = await fetch('https://cataas.com/cat')
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}, undefined)

useAsyncChild(isFactReady)
useAsyncChild(isCatReady)

function startTask() {
  updateFact()
  updateCat()
}
startTask()
</script>
