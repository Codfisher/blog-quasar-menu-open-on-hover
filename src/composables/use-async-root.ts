import type { InjectionKey, Ref } from 'vue'
import { createEventHook } from '@vueuse/core'
import { provide, ref, watch } from 'vue'

export type ChildState = Ref<boolean>

interface ProvidedMethod {
  bind: (state: ChildState) => void;
  unbind: (state: ChildState) => void;
}
export const PROVIDE_KEY = Symbol(
  'use-async-root',
) as InjectionKey<ProvidedMethod>

// interface UseAsyncRootParams {
//   complement: boolean;
// }

export function useAsyncRoot() {
  const states = ref<ChildState[]>([])

  function bind(state: ChildState) {
    states.value.push(state)
  }
  function unbind(state: ChildState) {
    const index = states.value.indexOf(state)
    states.value.splice(index, 1)
  }

  provide(PROVIDE_KEY, {
    bind,
    unbind,
  })

  const isDoing = ref(false)
  const doingHook = createEventHook<void>()
  const doneHook = createEventHook<void>()

  /** watch deep 無法使用 new、old value，只能自己記錄了
   *
   * https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers
   */
  const oldStates = ref<ChildState[]>([])
  watch(
    states,
    (newStates) => {
      // 數量為 0
      if (newStates.length === 0 || newStates.length < oldStates.value.length) {
        return
      }

      // 變少不用管
      if (newStates.length < oldStates.value.length) {
        oldStates.value = clone(newStates)
        return
      }
      oldStates.value = clone(newStates)

      const anyFalse = newStates.some((state) => !state.value)
      if (anyFalse) {
        if (!isDoing.value) {
          doingHook.trigger()
          isDoing.value = true
        }

        return
      }

      doneHook.trigger()
      isDoing.value = false
    },
    {
      deep: true,
    },
  )

  return {
    states,
    onDoing: doingHook.on,
    onDone: doneHook.on,
  }
}

function clone(data: any) {
  return JSON.parse(JSON.stringify(data))
}
