import './assets/main.css'

import { createApp } from 'vue'
import FocusTrap from "./components/Global/FocusTrap.vue";
import GlobalModal from "./components/Global/Modal.vue"; 
import GlobalCarousel from "./components/Global/Carousel.vue";


import { pinia } from './stores'
import App from './App.vue'

const app = createApp(App).use(pinia)

app.component('GlobalFocusTrap', FocusTrap)
    .component('GlobalModal', GlobalModal)
    .component('GlobalCarousel', GlobalCarousel);

app.mount('#app')
