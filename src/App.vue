<template>
  <div id="app">
    <GlobalHeader />
    <article class="page">
      <main id="main">
        <BlocksHero id="top"/>
        <section class="work" id="work">
            <BlocksSplit v-for="(project, index) in pageData.projects" 
                :project="project"
                :index="index" />
        </section>
        <BlocksSkills :items="pageData.skills" id="skills"/>
        <BlocksAbout :slides="pageData.about" id="about"/>
      </main>
    </article>
    <GlobalFooter />
  </div>
</template>

<script setup>
  import GlobalHeader from "./components/Global/Header.vue";
  import GlobalFooter from "./components/Global/Footer.vue";
  import BlocksHero from "./components/Blocks/Hero.vue";
  import BlocksCollage from "./components/Blocks/Collage.vue";
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
  onMounted(() => {
      scroll();
      window.addEventListener('scroll', scroll) 
  })
</script>


