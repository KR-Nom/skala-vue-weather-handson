<script setup>
/**
 * 작성자: 장현진
 * 작성일: 2026-08-27 (목)
 * 변경사항: Open-Meteo의 미세먼지와 대기질 정보 추가
 * 프로그램 설명: 도시별 실시간 날씨·단기 예보·대기질을 출력
 */
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { fetchCurrentAirQuality } from '../api/airQualityApi'
import { fetchCurrentWeather, fetchWeatherForecast } from '../api/weatherApi'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const configStore = useConfigStore()
const apiWeather = ref(null)
const forecastList = ref([])
const airQuality = ref(null)
const isLoading = ref(false)
const isAirLoading = ref(false)
const errorMessage = ref('')
const airErrorMessage = ref('')

const weatherList = [
  { id: 'city_01', region: '대한민국 서울특별시', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', region: '부산광역시', lat: 35.1796, lon: 129.0756 },
  { id: 'city_03', region: '경기도 수원시', lat: 37.2636, lon: 127.0286 },
  { id: 'city_04', region: '인천광역시', lat: 37.4563, lon: 126.7052 },
  { id: 'city_05', region: '대구광역시', lat: 35.8714, lon: 128.6014 },
  { id: 'city_06', region: '대전광역시', lat: 36.3504, lon: 127.3845 },
  { id: 'city_07', region: '광주광역시', lat: 35.1595, lon: 126.8526 },
  { id: 'city_08', region: '제주특별자치도', lat: 33.4996, lon: 126.5312 },
]

const selectedWeather = computed(() => {
  return weatherList.find((weather) => weather.id === route.params.cityId)
})

const displayTemp = computed(() => {
  if (!apiWeather.value) return null
  if (configStore.unit === 'fahrenheit') {
    return Math.round((apiWeather.value.main.temp * 9) / 5 + 32)
  }
  return Math.round(apiWeather.value.main.temp)
})

const currentWeatherIcon = computed(() => {
  const icon = apiWeather.value?.weather[0].icon
  return icon ? `https://openweathermap.org/img/wn/${icon}@4x.png` : ''
})

const detailWeatherTheme = computed(() => {
  if (!apiWeather.value) return 'default'

  const main = apiWeather.value.weather[0].main
  const isHot = apiWeather.value.main.temp >= 25

  if (['Rain', 'Drizzle', 'Thunderstorm'].includes(main)) return isHot ? 'hot-rain' : 'rain'
  if (main === 'Clouds') return isHot ? 'hot-clouds' : 'clouds'
  if (main === 'Clear') return isHot ? 'hot-clear' : 'clear'
  return 'default'
})

const displayForecastList = computed(() => {
  return forecastList.value.slice(0, 5).map((forecast) => ({
    time: new Date(forecast.dt * 1000).toLocaleString('ko-KR', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
    }),
    temp:
      configStore.unit === 'fahrenheit'
        ? Math.round((forecast.main.temp * 9) / 5 + 32)
        : Math.round(forecast.main.temp),
    status: forecast.weather[0].description,
  }))
})

const airQualityStatus = computed(() => {
  const aqi = airQuality.value?.current.us_aqi

  if (aqi <= 50) return '좋음'
  if (aqi <= 100) return '보통'
  if (aqi <= 150) return '민감군 주의'
  if (aqi <= 200) return '나쁨'
  return '매우 나쁨'
})

const loadWeather = async () => {
  if (!selectedWeather.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const [currentWeather, forecastWeather] = await Promise.all([
      fetchCurrentWeather(selectedWeather.value.lat, selectedWeather.value.lon),
      fetchWeatherForecast(selectedWeather.value.lat, selectedWeather.value.lon),
    ])

    apiWeather.value = currentWeather
    forecastList.value = forecastWeather.list
  } catch (error) {
    console.error('날씨와 예보 요청 실패:', error)
    errorMessage.value = '날씨 또는 예보 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

const loadAirQuality = async () => {
  if (!selectedWeather.value) return

  isAirLoading.value = true
  airErrorMessage.value = ''

  try {
    airQuality.value = await fetchCurrentAirQuality(
      selectedWeather.value.lat,
      selectedWeather.value.lon,
    )
  } catch (error) {
    console.error('대기질 요청 실패:', error)
    airErrorMessage.value = '대기질 정보를 가져오지 못했습니다.'
  } finally {
    isAirLoading.value = false
  }
}

onMounted(() => {
  loadWeather()
  loadAirQuality()
})
</script>

<template>
  <main class="detail-view">
    <div class="detail-heading">
      <div><span>WEATHER DETAIL</span><h2>{{ selectedWeather?.region ?? '지역별 상세 기상 정보' }}</h2><p>현재 날씨부터 단기 예보와 대기질까지 확인하세요.</p></div>
      <RouterLink to="/"><el-button round>← 전체 도시</el-button></RouterLink>
    </div>

    <el-skeleton v-if="isLoading" :rows="5" animated />
    <el-alert v-else-if="errorMessage" :title="errorMessage" type="error" show-icon :closable="false" />

    <el-card v-else-if="selectedWeather && apiWeather" :class="['current-card', detailWeatherTheme]" shadow="never">
      <div class="current-main">
        <div class="current-summary"><span>NOW · 현재 날씨</span><div class="temperature-row"><strong>{{ displayTemp }}<small>{{ configStore.unitSymbol }}</small></strong><img :src="currentWeatherIcon" :alt="apiWeather.weather[0].description" /></div><p>{{ apiWeather.weather[0].description }}</p></div>
        <div class="current-metrics">
          <div><span>습도</span><strong>{{ apiWeather.main.humidity }}%</strong></div>
          <div><span>풍속</span><strong>{{ apiWeather.wind.speed }}m/s</strong></div>
        </div>
      </div>
    </el-card>
    <el-empty v-else-if="!selectedWeather" description="도시 정보를 찾을 수 없습니다." />

    <section v-if="displayForecastList.length" class="forecast-section">
      <h3>🕒 3시간 간격 단기 예보</h3>
      <div class="forecast-grid">
        <el-card v-for="forecast in displayForecastList" :key="forecast.time" shadow="hover">
          <strong>{{ forecast.time }}</strong>
          <b>{{ forecast.temp }}{{ configStore.unitSymbol }}</b>
          <span>{{ forecast.status }}</span>
        </el-card>
      </div>
    </section>

    <section class="air-quality-section">
      <h3>🌫️ 현재 대기질 정보</h3>
      <el-skeleton v-if="isAirLoading" :rows="2" animated />
      <el-alert v-else-if="airErrorMessage" :title="airErrorMessage" type="error" :closable="false" />
      <div v-else-if="airQuality" class="air-quality-grid">
        <p>
          미세먼지 PM10
          <strong>{{ airQuality.current.pm10 }}{{ airQuality.current_units.pm10 }}</strong>
        </p>
        <p>
          초미세먼지 PM2.5
          <strong>{{ airQuality.current.pm2_5 }}{{ airQuality.current_units.pm2_5 }}</strong>
        </p>
        <p>
          대기질 지수
          <strong>{{ airQuality.current.us_aqi }}</strong>
          <el-tag type="success">{{ airQualityStatus }}</el-tag>
        </p>
        <small>기준 시각: {{ airQuality.current.time }}</small>
      </div>
    </section>

  </main>
</template>

<style scoped>
.detail-view { display: grid; gap: 18px; }
.detail-heading { display: flex; align-items: end; justify-content: space-between; padding: 26px 28px; border: 1px solid rgba(255,255,255,.75); border-radius: 20px; background: rgba(255,255,255,.86); box-shadow: 0 14px 34px rgba(40,108,149,.11); backdrop-filter: blur(12px); }
.detail-heading span { color: #1688c1; font-size: 12px; font-weight: 800; letter-spacing: 1px; }
.detail-heading h2 { margin: 4px 0 0; color: #17384b; font-size: clamp(24px, 4vw, 32px); }
.detail-heading p { margin: 5px 0 0; color: #708895; }
.current-card { overflow: hidden; border: 1px solid rgba(255,255,255,.55); border-radius: 22px; color: #fff; box-shadow: 0 20px 45px rgba(25,83,114,.2); }
.current-card.default { background: linear-gradient(135deg, #175b78, #2f9d8b); }
.current-card.clear { background: linear-gradient(135deg, #2787ba, #f2c85c); }
.current-card.hot-clear { background: linear-gradient(135deg, #e75c32, #f3a62d); }
.current-card.clouds { background: linear-gradient(135deg, #526c7c, #8ca0aa); }
.current-card.hot-clouds { background: linear-gradient(135deg, #836957, #c58d67); }
.current-card.rain { background: linear-gradient(135deg, #264e6b, #4f8ca8); }
.current-card.hot-rain { background: linear-gradient(135deg, #206f76, #c86559); }
.current-card :deep(.el-card__body) { padding: clamp(24px, 5vw, 44px); }
.current-main { display: flex; gap: 30px; align-items: end; justify-content: space-between; }
.current-main strong { display: block; margin-top: 16px; font-size: clamp(52px, 8vw, 82px); line-height: 0.9; }
.temperature-row { display: flex; align-items: center; }
.temperature-row img { width: 150px; height: 150px; object-fit: contain; filter: drop-shadow(0 10px 10px rgba(0,0,0,.15)); }
.current-main strong small { font-size: 24px; }
.current-main p { margin: 12px 0 0; font-size: 18px; }
.current-metrics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.current-metrics div { min-width: 120px; padding: 17px; border: 1px solid rgba(255,255,255,.18); border-radius: 14px; background: rgba(255,255,255,.16); backdrop-filter: blur(8px); }
.current-metrics span, .current-metrics strong { display: block; margin: 0; font-size: 14px; }
.current-metrics strong { margin-top: 5px; font-size: 20px; }
.forecast-section, .air-quality-section { padding: 24px; border: 1px solid rgba(255,255,255,.78); border-radius: 20px; background: rgba(255,255,255,.88); box-shadow: 0 14px 34px rgba(43,108,146,.09); backdrop-filter: blur(12px); }
.forecast-section h3, .air-quality-section h3 { margin: 0 0 15px; color: #24495b; }
.forecast-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.forecast-grid :deep(.el-card) { border: 1px solid #deedf3; border-radius: 14px; background: linear-gradient(145deg, #fff, #edf8fd); transition: transform .2s ease, box-shadow .2s ease; }
.forecast-grid :deep(.el-card:hover) { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(38,105,145,.12); }
.forecast-grid strong, .forecast-grid b, .forecast-grid span { display: block; }
.forecast-grid b { margin: 12px 0 5px; color: #16879a; font-size: 24px; }
.forecast-grid span { color: #718690; }
.air-quality-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.air-quality-grid p { display: grid; gap: 6px; margin: 0; padding: 18px; border: 1px solid #dcefe6; border-radius: 14px; background: linear-gradient(145deg, #f5fcf8, #eaf7f1); }
.air-quality-grid strong { color: #236a65; font-size: 23px; }
.air-quality-grid small { grid-column: 1 / -1; color: #718690; }
@media (max-width: 800px) { .forecast-grid { grid-template-columns: repeat(2, 1fr); } .current-main { align-items: stretch; flex-direction: column; } .detail-heading { align-items: flex-start; flex-direction: column; gap: 16px; } }
@media (max-width: 520px) { .forecast-grid, .air-quality-grid, .current-metrics { grid-template-columns: 1fr; } .air-quality-grid small { grid-column: auto; } }
</style>
