<script setup>
/**
 * 작성자: 장현진
 * 작성일: 2026-08-27 (목)
 * 프로그램 설명: 과제 6 메뉴와 공통 온도 단위 설정 및 현재 View를 출력
 */
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './assignments/06-weather-axios/components/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header>
      <h1>🌦️ 과제 6: 날씨 Axios</h1>
      <nav aria-label="주요 메뉴">
        <RouterLink to="/">🌦️ 날씨 대시보드</RouterLink>
        <RouterLink to="/favorites">⭐ 즐겨찾기 도시</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  width: min(100% - 32px, 760px);
  margin: 24px auto;
  padding: 24px;
  color: #263746;
  background: #ffffff;
}

header h1 {
  margin: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #dbe3e8;
  color: #111111;
  font-size: clamp(22px, 4vw, 28px);
}

nav {
  display: flex;
  gap: 18px;
  margin: 16px 0;
  padding: 14px;
  border: 1px solid #e4eaee;
  border-radius: 6px;
  justify-content: center;
}

nav a {
  padding: 5px;
  color: #657783;
  font-weight: 700;
  text-decoration: none;
}

nav a.router-link-exact-active {
  border-bottom: 2px solid #25a4df;
  color: #168bc2;
}

@media (max-width: 520px) {
  .app-shell {
    width: 100%;
    margin: 0;
    padding: 16px;
  }

  nav {
    flex-wrap: wrap;
    gap: 8px;
    font-size: 14px;
  }
}
</style>
