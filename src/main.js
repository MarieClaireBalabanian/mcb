import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

// register router
import router from './routes.js'

// register store
import { pinia } from './stores'

// register gobal components
import FocusTrap from "./components/Global/FocusTrap.vue";
import GlobalModal from "./components/Global/Modal.vue"; 
import GlobalCarousel from "./components/Global/Carousel.vue";
import GlobalParallaxWrapper from "./components/Global/ParallaxWrapper.vue"
import BlocksHero from "./components/Blocks/Hero.vue";
import BlocksSplit from "./components/Blocks/Split.vue";
import BlocksSkills from "./components/Blocks/Skills.vue";
import BlocksAbout from "./components/Blocks/About.vue";
import BlocksThumbnails from "./components/Blocks/Thumbnails.vue"


const app = createApp(App).use(router).use(pinia)

app.component('GlobalFocusTrap', FocusTrap)
    .component('GlobalModal', GlobalModal)
    .component('GlobalCarousel', GlobalCarousel)
    .component('GlobalParallaxWrapper', GlobalParallaxWrapper)
    .component('BlocksHero', BlocksHero)
    .component('BlocksSplit', BlocksSplit)
    .component('BlocksAbout', BlocksAbout)
    .component('BlocksThumbnails', BlocksThumbnails)
    .component('BlocksSkills', BlocksSkills)

app.mount('#app')



