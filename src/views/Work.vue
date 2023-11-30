<template>
    <section class="work" id="work">
        <BlocksSplit v-for="(project, index) in pageData.projects" 
            :project="project"
            :index="index" />
    </section>
</template>


<script setup>
  import pageData from '../assets/data.json';
</script>