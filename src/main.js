import './assets/main.css'

import { createApp } from 'vue'
import FocusTrap from "./components/Global/FocusTrap.vue";
import Grid from "./components/Global/Grid.vue";
import { pinia } from './stores'
import App from './App.vue'

const app = createApp(App).use(pinia)

app.component('GlobalFocusTrap', FocusTrap).component('GlobalGrid', Grid);

app.mount('#app')
