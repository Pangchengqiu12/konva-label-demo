import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/preview',
  },
  {
    path: '/preview',
    name: 'preview',
    meta: {
      title: '预览',
    },
    component: () => import('@/views/image/preview/index.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '标注',
    },
    component: () => import('@/views/image/detail/index.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
