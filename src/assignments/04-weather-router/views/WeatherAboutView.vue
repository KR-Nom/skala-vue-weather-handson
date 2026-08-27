<script setup>
/**
 * 작성자: 장현진
 * 작성일: 2026-08-26 (수)
 * 변경사항: 과제 3에서 분리한 독립 부품의 연동 내용을 소개 View로 작성
 * 프로그램 설명: 날씨 컴포넌트의 역할과 부모·자식 통신 구조 소개
 * 실행 방법: /about 경로에서 확인
 */
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="about-view">
    <h2>ℹ️ 서비스 소개</h2>
    <p>
      HandsOn의 <code>weather-components</code> 폴더에서 분리한 독립 부품을 연결한 날씨
      대시보드입니다.
    </p>
    <ul>
      <li><code>BaseDashboardCard</code>: 검색·날씨·즐겨찾기 영역의 공통 틀</li>
      <li><code>SearchBar</code>: 검색어를 부모에게 전달</li>
      <li><code>WeatherCard</code>: 도시 선택·상세보기·즐겨찾기 이벤트 전달</li>
      <li><code>FavoriteCityList</code>: 즐겨찾기 도시 표시와 해제 처리</li>
      <li><code>WeatherFavoriteView</code>: 선택한 즐겨찾기를 별도 화면에서 표시</li>
    </ul>
    <RouterLink to="/">대시보드 홈으로 이동</RouterLink>
  </main>
</template>

<style scoped>
.about-view {
  padding: 18px;
  border: 1px solid #e1e7eb;
  border-radius: 6px;
}

h2 {
  margin: 0 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dbe3e8;
  font-size: 19px;
}

li {
  margin: 8px 0;
}

a {
  display: block;
  margin-top: 18px;
  padding: 10px;
  border-radius: 4px;
  color: #ffffff;
  background: #169fda;
  text-align: center;
  text-decoration: none;
}
</style>
