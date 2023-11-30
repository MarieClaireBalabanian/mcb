<template>
    <section class="block-split-text-image" :class="alignment" ref="blockRef">
        <div class="container">
            <div class="h1 mb-20">{{ project.title }}</div>
            <div class="content">
                <div class="translates copy desktop-only" :class="copyTransition">
                    <h2 class="h2 mb-20">{{ project.subtitle }}</h2>
                    <p class="paragraph mb-20">
                        {{ project.body }}
                    </p>
                    <div class="actions" v-if="project.website">
                        <router-link :to="`/work/${project.slug}`" class="button red">See More</router-link>
                    </div>
                </div>
                <div class="translates image-wrapper grid grid-2" :class="imageTransition">
                    <!-- <GlobalCarousel :photos="photos"/> -->
                    <img v-for="image in project.images" :src="image.url" :alt="image.alt"
                        :class="{ 'full': !image.mobile}" />
                </div>
                <div class="translates copy" :class="copyTransition">
                    <h2 class="h2 mb-20">{{ project.subtitle }}</h2>
                    <p class="paragraph mb-40">{{ project.body }}</p>
                    <div class="actions" v-if="project.website">
                        <router-link :to="`/work/${project.slug}`" class="button red">See More</router-link>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
    import { ref, reactive, computed, toRefs, onMounted } from 'vue'

    const props = defineProps({
        project: {
            type: Object,
        },
        index: {
            type: Number
        }
    })

    const { index } = toRefs(props)

    const blockRef = ref(null)
    const observer = ref(null)

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
            margin-left: -20px;
            grid-gap: 15px;

            .full {
                grid-column: 1 / -1;
            }
        }

        .copy {
            padding: 35px 7% 0 7%;
            position: relative;
            z-index: 2;
        }

        .carousel-component {
            .dots {
                bottom: 0px;
            }
        }

        @media (min-width: 768px) {
            padding: 90px 0 100px;

            .content {
                display: flex;
                position: relative;
                padding: 20px 0 0 0;
                align-items: flex-start;
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