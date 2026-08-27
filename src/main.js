import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './assignments/05-weather-store/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
