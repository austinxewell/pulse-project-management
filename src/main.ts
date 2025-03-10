import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { plugin } from '@formkit/vue'
import config from '../formkit.config'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, config)
app.use(VueSweetalert2)

app.mount('#app')
