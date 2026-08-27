# SKALA Vue 날씨 Hands-on

Vue 수업에서 배운 내용을 날씨 서비스에 하나씩 추가하며 완성한 Hands-on 저장소입니다.

과제 1의 Mockup부터 시작해 Composition API, Component, Router, Pinia Store, Axios, 외부 UI Library를 적용했고 마지막에는 Vercel에 배포했습니다.

## 실행 방법

### 1. 저장소 내려받기

```bash
git clone https://github.com/KR-Nom/skala-vue-weather-handson.git
cd skala-vue-weather-handson
```

### 2. Package 설치

```bash
npm install
```

### 3. API Key 설정

프로젝트 루트에 `.env` 파일을 만들고 발급받은 OpenWeatherMap API Key를 입력합니다.

```env
VITE_OPENWEATHER_API_KEY=발급받은_API_KEY
```

실제 `.env` 파일은 Git에 올라가지 않습니다. 필요한 변수 이름은 `.env.example`에서 확인할 수 있습니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

### 5. 품질 점검과 Build

```bash
npm run lint
npm run build
```

Build가 완료되면 배포용 정적 파일이 `dist/`에 생성됩니다.

## 과제 진행 과정

### 1. Weather Mockup

`v-for`, `v-if`, `v-model`과 이벤트를 이용해 8개 도시 날씨 카드를 반복 출력하고 검색·선택 기능을 구현했습니다.

- 폴더: [`01-weather-mockup`](src/assignments/01-weather-mockup)
- 버전: `v1.0-assignment1`

### 2. Weather Composition

과제 1의 화면을 유지하면서 `ref`, `computed`, `watch`, `watchEffect`를 적용하고 즐겨찾기 상태를 추가했습니다.

- 폴더: [`02-weather-composition`](src/assignments/02-weather-composition)
- 버전: `v2.0-assignment2`

### 3. Weather Components

한 파일에 모여 있던 검색창, 날씨 카드, 공통 틀과 즐겨찾기 목록을 독립 Component로 분리하고 `props`, `emits`, `slot`으로 연결했습니다.

- 폴더: [`03-weather-components`](src/assignments/03-weather-components)
- 버전: `v3.0-assignment3`

### 4. Weather Router

Vue Router를 이용해 메인·상세보기·즐겨찾기·서비스 소개·Not Found 화면을 주소별 View로 나눴습니다.

- 폴더: [`04-weather-router`](src/assignments/04-weather-router)
- 버전: `v4.0-assignment4`

### 5. Weather Store

Pinia Store로 섭씨·화씨 설정을 공통 관리하고 메인과 상세 화면에서 같은 단위 상태를 사용했습니다.

- 폴더: [`05-weather-store`](src/assignments/05-weather-store)
- 버전: `v5.0-assignment5`

### 6. Weather Axios

Axios로 OpenWeatherMap의 현재 날씨와 3시간 예보를 요청하고 Open-Meteo의 미세먼지·초미세먼지·AQI 정보를 추가했습니다.

- 폴더: [`06-weather-axios`](src/assignments/06-weather-axios)
- 버전: `v6.0-assignment6`

### 7. Weather UI Library

Element Plus를 적용하고 하늘 테마, 도시 대표 사진, 날씨별 영상, 반응형 카드와 상태별 색상을 이용해 개인 날씨 대시보드로 꾸몄습니다.

- 폴더: [`07-weather-ui-library`](src/assignments/07-weather-ui-library)
- 버전: `v7.0-assignment7`

### 8. Weather Deployment

ESLint·Oxlint 품질 점검, 환경변수 분리, Vite Build와 Vue Router Rewrite를 적용하고 Vercel에 배포했습니다.

- 폴더: [`08-weather-deployment`](src/assignments/08-weather-deployment)
- 버전: `v8.0-assignment8`
- 배포 URL: [https://skala-vue-weather-handson.vercel.app](https://skala-vue-weather-handson.vercel.app)

## 각 과제의 자세한 기록

각 과제 폴더의 `README.md`에는 다음 내용을 따로 정리했습니다.

- 어떤 순서로 기능을 구현했는지
- 과제에서 사용한 Vue 핵심 개념
- 직접 구현하면서 발생한 문제
- 변수명·이벤트·반응형 상태·API 응답 처리와 관련된 트러블슈팅
- 문제의 원인과 해결 방법

따라서 전체 진행 순서는 이 메인 README에서 확인하고, 자세한 구현 과정과 트러블슈팅은 각 과제 폴더의 README에서 확인할 수 있습니다.

## 환경과 기술

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Element Plus
- OpenWeatherMap API
- Open-Meteo Air Quality API
- Vercel
