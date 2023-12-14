<template>
    <div class="project-detail">
        <section class="intro mb-40 bg-black">
            <div class="container">
                <h1 class="h2-large uppercase mb-40">{{ project.title }}</h1>
                <h2 class="h3 bold text-center">{{ project.subtitle }}</h2>
            </div>
        </section>
        <section class="description mb-40">
            <div class="container">
                <ul class="tech">
                    <li class="paragraph-small text-turquoise bold mb-20" v-for="item in project.tech">
                        {{ item }} 
                    </li>
                </ul>
                <div class="paragraph" v-if="project.description" v-html="project.description"></div>
            </div>
        </section>
        <BlocksThumbnails  :project="project" />
    </div>
</template>


<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute()
    import data from '../assets/data.json'

    const project = data.projects.find((item) => {
        return route.params.project === item.slug
    })
</script>


<style lang="scss">
    .project-detail {
        padding-top: $header_height;


        .intro {
            padding: 100px 0;
            clip-path: polygon(0 0, 100% 60px, 100% 100%, 0 calc(100% - 60px));
        }

        .container {
            max-width: 1150px;
        }

        .description .container {
            display: flex;
            ul {
                width: 200px;
            }
            div {
                width: calc(100% - 200px);
                padding-left: 30px;
            }
        }

        video {
            width: 100%;
        }
    }
</style>