import type { InjectionKey, Ref } from 'vue'

export interface MenuData {
  id: string;
  level: number;
}

export const injectionKey = Symbol('q-menu-hover') as InjectionKey<{
  bindSubmenu: (data: MenuData) => void;
  unbindSubmenu: (id: string) => void;
  submenuList: Ref<MenuData[]>;
}>
