import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)

//Bootstrap 
import { BootstrapVueNext} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
app.use(BootstrapVueNext)

import './styles/styles.scss';

//axios
import axios from 'axios';
const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})
app.config.globalProperties.$axios = api;  

//SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


app.use(VueSweetalert2)
app.mount('#app')

