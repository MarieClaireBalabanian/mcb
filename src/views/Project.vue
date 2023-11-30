<template>
    <div class="container project-detail">
        <section class="intro">
            <h1 class="h1 mb-40">{{ project.title }}</h1>
            <div class="stack">
                <h3 class="h3 bold">TECH:</h3>
                <ul class="text-blue bold">
                    <li v-for="item in project.tech">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </section>
                   <img class="" :src="project.images[0].url" />

    </div>

    <section>

    </section>
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
        section {
            margin-bottom: 40px;
        }

        img {
            box-shadow: 0 0 8px 2px rgba($gray-dark, .1);
            width: 100%;
        }

        .stack {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .h3 {
                margin-right: 30px;
            }

            ul {
                display: flex;
                flex-wrap: wrap;

                

                li {
                    
                    +li {
                        padding-left: 40px;
                        position: relative;

                        &::before {
                            position: absolute;
                            content: '';
                            top: .4em;
                            left: calc(20px - .15rem);
                            width: .3rem;
                            height: .3rem;
                            background: $black;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
</style>