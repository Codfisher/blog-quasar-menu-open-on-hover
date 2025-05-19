import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export interface RouteMeta {
  name: string;
}

export enum RouteName {
  HOME = 'home',
  ASYNC_CHILDREN = 'async-children',
  DROPDOWNS_ENABLED_ON_HOVER = 'dropdowns-enabled-on-hover',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: RouteName.HOME,
    },
  },

  {
    path: `/home`,
    name: RouteName.HOME,
    component: () => import('../views/the-home.vue'),
  },
  {
    path: `/async-children`,
    name: RouteName.ASYNC_CHILDREN,
    component: () => import('../views/the-async-children.vue'),
  },
  {
    path: `/dropdowns-enabled-on-hover`,
    name: RouteName.DROPDOWNS_ENABLED_ON_HOVER,
    component: () => import('../views/the-dropdowns-enabled-on-hover.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
