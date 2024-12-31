import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: () => import('@/views/layouts/BaseLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/team',
          name: 'team',
          component: () => import('@/views/TeamView.vue'),
        },
        {
          path: '/team/:id',
          name: 'team-detail',
          props: (route) => {
            console.log(route)
            const id = +route.params.id

            return isNaN(id) ? { id: 1 } : { id }
          },
          component: () => import('@/views/TeamDetailView.vue'),
        },
      ],
    },
  ],
})

export default router
