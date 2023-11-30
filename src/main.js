import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

// register router
import router from './routes.js'

// register store
import { pinia } from './stores'

// register gobal components
import FocusTrap from "./components/Global/FocusTrap.vue";
import Grid from "./components/Global/Grid.vue";
import BlocksHero from "./components/Blocks/Hero.vue";
import BlocksCollage from "./components/Blocks/Collage.vue";
import BlocksSplit from "./components/Blocks/Split.vue";
import BlocksSkills from "./components/Blocks/Skills.vue";
import BlocksAbout from "./components/Blocks/About.vue";
import BlocksThumbnails from "./components/Blocks/Thumbnails.vue"

const app = createApp(App).use(router).use(pinia)

app.component('GlobalFocusTrap', FocusTrap)
    .component('GlobalGrid', Grid)
    .component('BlocksHero', BlocksHero)
    .component('BlocksAbout', BlocksAbout)
    .component('BlocksCollage', BlocksCollage)
    .component('BlocksSplit', BlocksSplit)
    .component('BlocksSkills', BlocksSkills)
    .component('BlocksThumbnails', BlocksThumbnails)

app.mount('#app')



