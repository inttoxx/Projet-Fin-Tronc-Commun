import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/src/modal.js'
import 'bootstrap'
//require('./bootstrap');



createApp(App).use(router).use(store).mount('#app')