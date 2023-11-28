<template>
    <section class="block-image-callout-animated" ref="blockRef">
       
        <h2 class="h2 text-center mb-80" :style="opacity" :class="{ white: progress >= .7}">Skills</h2>

        <div class="content-container" :class="{active: showCopy}">
            <div class="container">
                <div class="item-wrapper">
                    <div class="text-box flex-align-center" >
                        <div class="item mb-20" v-for="skill in items">
                            <h3>{{ skill }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="background-container">
            <div class="background" ref="background">
                <div class="borders">
                    <div class="top" :style="borderStyle.x"></div>
                    <div class="right" :style="borderStyle.y"></div>
                    <div class="bottom" :style="borderStyle.x"></div>
                    <div class="left" :style="borderStyle.y"></div>
                </div>
                <div class="global-image" :style="{'opacity': progress }">
                    <div class="bg"></div>
                    <!-- <img loading="lazy" src="="/img/skills.png" alt="Image" /> -->
                </div>
            </div>
        </div>
    </section>
</template>



<script setup>
import { ref, reactive, computed, toRefs, onMounted, watch } from 'vue'

    import { useWindowStore } from '@/stores/window';

    const props = defineProps({
        items: Array
    });
    const windowStore = useWindowStore();

    const transformDistance = 250;
    const boundsTop = ref(Infinity);
    const active = ref(false);
    const blockRef = ref(null);

    const scrollTop = computed(() => {
        return windowStore.scrollTop;
    });

    watch(scrollTop, (newScrollTop) => {
        updateProgress();
    });

    const progress = computed(() => {
        let progress = 1 - (transformDistance + boundsTop.value) / transformDistance;

        if (progress < 0 || isNaN(progress)) return 0;
        if (progress > 1)  return 1;
        return progress;
    });

    const borderStyle = computed(() => {
        return {
            x: { transform: `scale(1, ${1 - progress.value})` },
            y: { transform: `scale(${1 - progress.value}, 1)` },
        };
    });

    const opacity = computed(() => {
        let op, cutOff;
        
        cutOff = window.innerHeight/3;

        const progress = cutOff/boundsTop.value;

        if (isNaN(progress)) return 0;
        if (progress > 1 || progress < 0) return 1;

        return progress;
      
    });

    const showCopy = computed(() => {
        return progress.value >= 0.5;
    });

    const initObserver = () => {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                active.value = entry.isIntersecting;
            });
        });
        observer.observe(blockRef.value);
        observer.value = observer;
    };

    const updateProgress = () => {
        if (active.value) {
            let bounds = blockRef.value.getBoundingClientRect();
            boundsTop.value = bounds.top;
        }
    };

    onMounted(() => {
        initObserver();
    });
</script>



<style lang="scss">
    .block-image-callout-animated {
        $transformDistance: 250px;
        position: relative;
        padding-top: 80px;

        h2 {
            position:sticky;
            top: 40vh;
            left: 0;
            width: 100%;
            z-index: 2;
            font-weight: 700;
            font-size: 5em;
            letter-spacing: .1rem;
            transition: .3s ease;
            &.white {
                color: white;
                opacity: .3;
            }
           
        }


        .background-container {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
        }

        .background {
            height: 100vh;
            width: 100%;
            position: sticky;
            top: 0;
        }

        video {
            position: absolute;
            object-fit: cover;
            object-position: center;
        }

        .global-image,
        .borders {
            height: 100vh;
            width: 100%;
        }

        .bg {
            height: 100%;
            width: 100%;
            background: black;
        }

        .borders {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
            transition: background 0.2s;

            >* {
                position: absolute;
                background: $white;
                transition: transform 0.1s;
                will-change: transform;
            }

            .top,
            .bottom {
                left: 0;
                right: 0;
                height: 50px;
            }

            .left,
            .right {
                top: 0;
                bottom: 0;
                width: 50px;
            }

            @media (min-width: 768px) {

                .top,
                .bottom {
                    height: 100px;
                }

                .left,
                .right {
                    width: 100px;
                }
            }

            .top {
                top: 0;
                transform-origin: center top;
            }

            .right {
                right: 0;
                transform-origin: right center;
            }

            .bottom {
                bottom: 0;
                transform-origin: center bottom;
            }

            .left {
                left: 0;
                transform-origin: left center;
            }
        }

        .content-container {
            padding-top: calc(45vh + #{$transformDistance});
            padding-bottom: 35vh;
            position: relative;
            z-index: 3;

            .container>* {
                transition: transform 1.25s, opacity 1.25s;

                opacity: 0;
                transform: translateY(100px);
            }

            &.active .container>* {
                opacity: 1;
                transform: translateY(0);

                &:first-child {
                    transition-duration: 0.75s;
                }
            }
        }


        .text-box {
            position: relative;
            z-index: 4;
            flex-wrap: wrap;
            justify-content: space-between;

            .item {
                width: calc(50% - 10px);
                padding: 20px 4px;
                background: white;
                /* color: white; */
                font-family: $body;
                font-weight: 700;
                font-size: 1rem;
                text-align: center; 
                letter-spacing: .1rem;

                @media (min-width: 768px) {
                    width: calc(33% - 10px);
                }


                h3 {
                    display: inline-block;
                    
                }
            }
        }
    }
</style>