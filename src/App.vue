<template>
  <div id="app">
    <GlobalHeader />
    <article class="page">
      <main id="main">
        <BlocksHero id="top"/>
        <section class="work" id="work" tabindex="-1">
          <h2 class="h1 work-header container">WORK</h2>
            <BlocksSplit v-for="(project, index) in pageData.projects" 
                :project="project"
                :index="index" />
        </section>
       
        <!-- <BlocksAbout :slides="pageData.about" id="about"/> -->
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
      windowStore.isDesktop = window.innerWidth >= 1024;
  };
  onMounted(() => {
      scroll();
      resize();
      window.addEventListener('scroll', scroll);
      window.addEventListener('resize', resize);
  })
</script>



<style lang="scss">

  .work-header {
    margin: 2em auto -.25em;
    font-weight: 700;
    letter-spacing: .7em;
    /* transform: skew(-0.01turn, 0); */
    text-align: right;



  }
</style>