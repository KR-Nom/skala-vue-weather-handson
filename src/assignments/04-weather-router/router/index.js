import { createRouter, createWebHistory } from 'vue-router'

/**
 * 작성자: 장현진
 * 작성일: 2026-08-26 (수)
 * 변경사항: 메인·소개·즐겨찾기·상세·404 경로와 Lazy Loading 설정
 * 프로그램 설명: URL과 각 날씨 View의 연결 규칙 관리
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather-home',
      component: () => import('../views/WeatherHomeView.vue'),
      alias: '/weather',
    },
    {
      path: '/about',
      name: 'weather-about',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/favorites',
      name: 'weather-favorites',
      component: () => import('../views/WeatherFavoriteView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
