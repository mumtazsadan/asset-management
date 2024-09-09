import './assets/style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createStore } from 'vuex'
import axios from 'axios'
import store from './stores'

let app

app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives
})

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.config.globalProperties.$http = axios
app.use(createPinia())
app.use(pinia)
app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
