<template>
  <q-menu
    ref="menuRef"
    v-model="menuVisible"
    v-bind="attrs"
    @mouseenter="handleMenuHover"
    @mouseleave="handleMenuLeave"
  >
    <slot />
  </q-menu>
</template>

<script setup lang="ts">
import type { QMenuProps } from 'quasar'
import type { MenuData } from './constant'
import { useElementHover, useParentElement } from '@vueuse/core'
import { omit } from 'lodash-es'
import { debounce, QMenu } from 'quasar'
import { computed, inject, onBeforeUnmount, provide, ref, watch } from 'vue'
import { injectionKey } from './constant'

interface Props extends Omit<QMenuProps, 'modelValue' | 'target'> {
  disableHoverOpen?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disableHoverOpen: false,
})

const attrs = computed(
  () => omit(props, ['modelValue', 'target']),
)

const id = crypto.randomUUID()

const triggerEl = useParentElement()
const isTriggerHover = useElementHover(triggerEl, {
  delayLeave: 100,
})

const menuRef = ref<InstanceType<typeof QMenu>>()
const isMenuHover = ref(false)
const handleMenuLeave = debounce(() => {
  isMenuHover.value = false
}, 100)
function handleMenuHover() {
  isMenuHover.value = true
  handleMenuLeave.cancel()
}

/** 只有 root menu 使用，child menu 應該使用 currentSubmenuList */
const submenuList = ref<MenuData[]>([])

const rootProvider = inject(injectionKey, null)
const currentSubmenuList = computed(() => rootProvider?.submenuList.value ?? [])

// 紀錄目前是第幾層 menu
const menuLevel = inject('menu-level', 0)
provide('menu-level', menuLevel + 1)

const menuVisible = ref(false)
const hasSubmenuVisible = computed(() => {
  if (menuLevel === 0 && submenuList.value.length > 0) {
    return true
  }

  const visible = currentSubmenuList.value.some(({ level }) => level > menuLevel)

  // 自己也要顯示才算是自己的 submenu
  return visible && menuVisible.value
})

watch(() => [
  isTriggerHover,
  isMenuHover,
  hasSubmenuVisible,
], () => {
  if (props.disableHoverOpen) {
    return
  }

  menuVisible.value = isTriggerHover.value || isMenuHover.value || hasSubmenuVisible.value
}, { deep: true })

watch(menuVisible, (value) => {
  if (value) {
    rootProvider?.bindSubmenu({
      id,
      level: menuLevel,
    })
  }
  else {
    rootProvider?.unbindSubmenu(id)
  }
})

onBeforeUnmount(() => {
  rootProvider?.unbindSubmenu(id)
})

// rootProvider 邏輯
function bindSubmenu(data: MenuData) {
  /** 清掉同一層者，因為同層同時只會顯示一個 */
  submenuList.value = submenuList.value.filter((item) => item.level !== data.level)
  submenuList.value.push(data)
}
function unbindSubmenu(id: string) {
  const index = submenuList.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    submenuList.value.splice(index, 1)
  }
}
if (!rootProvider) {
  provide(injectionKey, {
    bindSubmenu,
    unbindSubmenu,
    submenuList,
  })
}
</script>
