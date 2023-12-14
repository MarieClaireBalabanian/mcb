<template>
    <BlocksHero id="top"/>
    <section class="work" id="work">
      <h2 class="work-header text-right h1 container">
        WORK
      </h2>
        <BlocksSplit v-for="project in pageData.projects" :project="project" />
    </section>
    <BlocksSkills :items="pageData.skills" id="skills"/>
</template>



<script setup>
  import pageData from '../assets/data.json';
</script>


<style lang="scss">
  #work, #about {
    position: relative;
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