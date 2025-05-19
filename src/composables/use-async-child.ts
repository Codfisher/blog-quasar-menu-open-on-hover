import type { ChildState } from './use-async-root'
import { tryOnBeforeUnmount } from '@vueuse/core'
import { inject } from 'vue'
import { PROVIDE_KEY } from './use-async-root'

export function useAsyncChild(state: ChildState): void {
  const root = inject(PROVIDE_KEY)

  root?.bind(state)

  tryOnBeforeUnmount(() => {
    root?.unbind(state)
  })
}
