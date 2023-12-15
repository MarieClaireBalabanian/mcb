<template>
  <div id="app">
    <GlobalHeader />
    <article class="page">
      <main id="main">
        <BlocksHero id="top"/>
        <section class="work" id="work" tabindex="-1">
          <h2 class="h1 work-header container text-right">Work</h2>
            <BlocksSplit v-for="(project, index) in pageData.projects" 
                :project="project"
                :index="index" />
        </section>
        <section class="about" id="about" tabindex="-1">
          <h2 class="h2 work-header container">About Me</h2>
          <BlocksAbout :slides="pageData.about"/>
        </section>
        
      </main>
    </article>
    <GlobalFooter />
  </div>
</template>

<script setup>
  import GlobalHeader from "./components/Global/Header.vue";
  import GlobalFooter from "./components/Global/Footer.vue";

  import BlocksHero from "./components/Blocks/Hero.vue";
  import BlocksSplit from "./components/Blocks/Split.vue";
  import BlocksSkills from "./components/Blocks/Skills.vue";
  import BlocksAbout from "./components/Blocks/About.vue";


  import { useWindowStore } from './stores/window';
  import { onMounted } from 'vue'
  import pageData from './assets/data.json';

  const windowStore = useWindowStore();
  const scroll = () => {
      windowStore.scrollTop = window.scrollY;
  };
  const resize = () => {
      windowStore.isDesktop = window.innerWidth >= 768;
  };
  onMounted(() => {
      scroll();
      resize();
      window.addEventListener('scroll', scroll);
      window.addEventListener('resize', resize);
  })
</script>



<style lang="scss">

  #work, #about {
    position: relative;
  }

  #work {
    
    margin-top: 150px;
    

  }
  .work-header {

    letter-spacing: 0;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 4;
    transform: translateY(calc(-100% - -.26em));
  }
</style>