<template>
    <section class="block-split-text-image" :class="alignment" ref="blockRef" tabindex="-1">
        <div class="container">
            <h3 class="h2 mb-40">
                <span class="desktop-only" aria-hidden="true">/* </span>{{ project.title }}<span class="desktop-only" aria-hidden="true"> */</span></h3> 
            <div class="content">
                <div class="translates copy desktop-only" :class="copyTransition">
                    <h4 class="h3 mb-20" v-if="project.subtitle">{{ project.subtitle }}</h4>
                    <div class="paragraph mb-20" v-if="project.description" v-html="project.description"></div>
                    <div class="actions" v-if="isDesktop && alignment === 'image-right'">
                        <GlobalModal :project="project" />
                    </div>
                </div>
                <div v-if="images" class="translates image-wrapper grid grid-2" :class="imageTransition">
                    <img v-for="image in images" :src="image.url" :alt="image.alt"
                        :class="{ 'full': !project.portrait}" />
                </div>
                <div class="translates copy" :class="copyTransition">
                    <h4 class="h3 mb-20" v-if="project.subtitle">{{ project.subtitle }}</h4>
                    <div class="paragraph mb-20" v-if="project.description" v-html="project.description"></div>
                    <div class="actions" v-if="(isDesktop && alignment !== 'image-right') || !isDesktop">
                        <GlobalModal :project="project" />
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
    import { ref, reactive, computed, toRefs, onMounted } from 'vue';
    import { useWindowStore } from '@/stores/window';
    const windowStore = useWindowStore();

    const props = defineProps({
        project: {
            type: Object,
        },
        index: {
            type: Number
        }
    })


    const { project, index } = toRefs(props)

    const blockRef = ref(null)
    const observer = ref(null)

    const images = computed(() => {
        const num = project?.value.portrait ? 2 : 1;
        return project.value.images.slice(0, num);
    });

    const isDesktop = computed(() => {
        return windowStore.isDesktop;
    });

    const alignment = computed(() => {
        return index.value % 2 ? 'image-right' : 'image-left';
    });

    const imageTransition = computed(() => {
        return alignment?.value === 'image-right' ? 'translate-left' : 'translate-right'
    });

    const copyTransition = computed(() => {
        return alignment?.value === 'image-right' ? 'translate-right' : 'translate-left'
    });

    const initObserver = () => {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('showing');
                }
            });
        });

        const els = blockRef.value.querySelectorAll('.translates');
        els.forEach((el) => {
            observer.observe(el);
        })

        observer.value = observer;
    };

    onMounted(() => {
        initObserver();
    })

</script>


<style lang="scss">
    .block-split-text-image {
        padding: 60px 0;

        &:nth-of-type(odd) {
            background-color: black;
            color: $white;

            img {
                box-shadow: 0 0 2px 1px rgba(darkgrey, .3);
            }
        }

        &:nth-of-type(even) {
            img {
                box-shadow: 0 0 2px 1px rgba(darkgrey, .2);
            }
        }

        .image-wrapper,
        img {
            width: 100%;
        }

        .image-wrapper {
            grid-gap: 15px;

            .full {
                grid-column: 1 / -1;
            }
        }

        .copy {
            padding: 35px 7% 0 7%;
            position: relative;
            z-index: 2;

            .paragraph p {
                &:first-child {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    text-align: left;
                }

                &:not(:first-child) {
                    display: none;
                }
                
            }
        }

        .h2 {   
            /* max-width: 85%; */
        }

        @media (min-width: 768px) {
            padding:  160px 0 100px;

            .content {
                display: flex;
                position: relative;
                align-items: center;
                overflow: hidden;
 
            }

            .image-wrapper {
                width: 45%;
                margin: unset;
            }

            .copy {
                width: 55%;
                padding: 40px 5% 0 5%;
            }

            &.image-left {
                .copy {
                    padding: 40px 5% 0 5%;

                    &.desktop-only {
                        display: none;
                    }
                }
            }

            &.image-right {
                .copy {
                    padding: 40px 5% 0 0;

                    &:not(.desktop-only) {
                        display: none;
                    }
                }
            }

            .copy,
            .image-wrapper {
                transition: transform .6s ease-out, opacity .4s ease-out;
                opacity: 0;
                will-change: transform, opacity;
            }

            .translate-left {
                transform: translate3d(0, 100px, 0);
                transition-delay: .6s;
            }

            .translate-right {
                transform: translate3d(0, 100px, 0);
            }

            .translates.translate-right,
            .translates.translate-left {

                &.showing {
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                }
            }
        }
    }
</style>