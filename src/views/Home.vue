<template>
    <BlocksHero id="top"/>
    <BlocksThumbnails :projects="pageData.projects" />
    <!-- <section class="work" id="work">
        <BlocksSplit v-for="(project, index) in pageData.projects" 
            :project="project"
            :index="index" />
    </section> -->
    <BlocksSkills :items="pageData.skills" id="skills"/>
</template>



<script setup>
  import pageData from '../assets/data.json';
</script>