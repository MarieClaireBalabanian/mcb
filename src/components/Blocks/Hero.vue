<template>
    <section class="block-hero" ref="blockRef" :style="`--progress: ${progress}; min-height: 100vh;`">
        <div class="shapes absolute-cover flex-align-center wrap container" :style="`min-height: 100vh;`">
                <div class="global-image" :style="`opacity: ${progress};`">
                    <img src="/img/mc.jpeg" alt="Me admiring Deception Pass State Park" />
                </div>
                <h1 class="h1 heading text-center mb-40">
                    <span>Marie-Claire</span><span>Balabanian</span></h1>
                <h2 class="h2 heading text-right">Web Developer</h2>
            <!-- <nav class="container">
                <ul class="items flex-align-center">
                    <li v-for="(item, index) in menu" :key="`nav-${index}`">
                        <a  @click.prevent="scroll(item.slug)" :href="`#${item.slug}`"
                            ref="topLevel">
                            {{ item.title }}
                        </a>
                    </li>
                </ul>
            </nav> -->
        </div>
        <div class="spacer"></div>
    </section>
</template>

<script setup>
    import { ref, computed, toRefs, onMounted, watch } from 'vue'
    import { scrollTo } from '../../composables/scrollTo.js'

    import { useWindowStore } from '@/stores/window';
    const windowStore = useWindowStore();

    const boundsTop = ref(Infinity);
    const blockRef = ref(null);

    const menu = [
        { title: 'Work', slug: 'work' },
        { title: 'About', slug: 'about' },
        { title: 'Contact', slug: 'contact' },
    ]

    const scrollTop = computed(() => {
        return windowStore.scrollTop;
    });

    const windowHeight = computed(() => {
        return windowStore.windowHeight;
    })

    watch(scrollTop, (newScrollTop) => {
        updateProgress();
    });

    const progress = computed(() => {
        let progress = scrollTop?.value / blockRef?.value?.offsetHeight;
        if (progress < 0 || isNaN(progress)) return 0;
        if (progress > 1) return 1;
        return progress;
    });

    const opacity = computed(() => {
        let op, cutOff;
        cutOff = windowHeight.value / 5;

        const progress = cutOff / boundsTop.value;

        console.log(progress)

        if (isNaN(progress)) return .3;
        if (progress < .3 && progress >= 0) return .3;
        if (progress > 1 || progress < 0) return 1;

        return progress;
    });

    const updateProgress = () => {
        let bounds = blockRef.value.getBoundingClientRect();
        boundsTop.value = bounds.top;
    };
    const scroll = (id) => {
        const anim = open.value ? 'instant' : 'smooth';
        if (open.value) closeNav();
        scrollTo(id, anim);
    }

</script>



<style lang="scss">
    .block-hero {
        position: relative;
        /* background: black; */

        .shapes {
            width: 100vw;
            z-index: 1;
            position: sticky;

            &::before {
                left: 0;
                clip-path: polygon(100% 0, 0 100%, 0 0);
                transform: translateX(calc(-40vw * var(--progress)));
            }

            &::after {
                right: 0;
                clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
                transform: translateX(calc(40vw * var(--progress)));
            }
        }

       .heading {
        /* transition: .6s ease; */
        width: 100%;
       }
        .h1 {
            /* animation: grow 1s forwards; */
            padding-top: clamp(calc($header_height + 30px), 6vh, 6vh);
            display: inline-block;
            width: auto;
            margin: 0 auto;
            text-align: left;
            /* opacity: 0; */
            &.show {
                opacity: 1;
                /* transform: translateY(calc(-50% - 100px)); */
            }
            span {
                display: block;
                &:last-child {
                    padding-left: 20vw;
                    padding-top: .4em;
                }
                
            }
        }

        .h2{
            /* color: white; */
            /* opacity: 0; */
            /* transform: translateY(calc(50px)); */
            $tr: calc(-30vw * var(--progress));
            transform: translate3d($tr, 0, 0);
            will-change: transform;

            &.show {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .global-image {
            position: absolute;
            height: 0;
            padding-top: clamp(300px, 100%, 70vh);
            bottom: $header_height;
            left: -20vw;
            z-index: -1;
            width: 90vw;
            max-width: 1200px;
            filter: grayscale(100%);
            background: rgba($white, .75);
            transform: translate3d(calc(20vw * var(--progress)), 0, 0);
            will-change: transform;

            img {
                mix-blend-mode: screen;
            }
        }

        .spacer {
            height: 80vh;
        }

        nav {
            padding-bottom: calc($header_height/1);
            align-self: flex-end; 
            /* transform: translateX(-3%); */
        }

        ul {
            width: 100%;
            justify-content: center;
            /* transform: translateX(calc(3% * var(--progress))); */
        }

        li {
            font-size: 1.1rem;
            letter-spacing: .1rem;
            font-family: $rubik;
            + li {
                margin-left: 3em;
            }
            a {
                &:focus {
                    opacity: 1 !important;
                }
            }
        }
    }
</style>