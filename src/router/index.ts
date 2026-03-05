import { createRouter, createWebHistory } from 'vue-router';
import WorkbenchLayout from '../layouts/WorkbenchLayout.vue';

const routes = [
  {
    path: '/',
    component: WorkbenchLayout,
    redirect: '/filing-review',
    children: [
      {
        path: 'filing-review',
        name: 'filing-review',
        component: () => import('../views/filingReview/index.vue'),
        meta: { title: '立案审核' }
      },
      {
        path: 'dossier-reading',
        name: 'dossier-reading',
        component: () => import('../views/dossierReading/index.vue'),
        meta: { title: '智能阅卷' }
      },
      {
        path: 'doc-writer',
        name: 'doc-writer',
        component: () => import('../views/docWriter/index.vue'),
        meta: { title: '文书写作助手' }
      },
      {
        path: 'doc-review',
        name: 'doc-review',
        component: () => import('../views/docReview/index.vue'),
        meta: { title: '文书审核' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
