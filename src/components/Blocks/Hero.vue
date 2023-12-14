<template>
    <section class="block-hero" ref="blockRef" :style="`--progress: ${progress};`">
        <div class="shapes absolute-cover">
            <h1 class="h1 heading" :class="{ hide: progress >= .4}">
                <!-- <div class="waviy">
                    <span v-for="(letter, index) in first" :style="`--i: ${index};`">{{ letter }}</span>
                </div> -->
                Marie-Claire<br>Balabanian
            </h1>
            <h2 class="h2 heading" :class="{ show: progress >= .4}">Web Developer</h2>
        </div>
        <div class="spacer"></div>
    </section>
</template>

<script setup>
    import { ref, reactive, computed, toRefs, onMounted, watch } from 'vue'
    import { useWindowStore } from '@/stores/window';
    const windowStore = useWindowStore();

    const first = ["M", "a", "r", "i", "e", "-", "C", "l", "a", "i", "r", "e"]

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
        let progress = scrollTop?.value / blockRef?.value?.offsetHeight;
        if (progress < 0 || isNaN(progress)) return 0;
        if (progress > 1) return 1;
        return progress;
    });

    const opacity = computed(() => {
        let op, cutOff;
        cutOff = window.innerHeight / 3;
        const progress = cutOff / boundsTop.value;

        if (isNaN(progress)) return 0;
        if (progress > 1 || progress < 0) return 1;

        return progress;
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
    .block-hero {
        position: relative;
        min-height: 100vh;
        background: black;

        .shapes {
            position: absolute;
            height: 100vh;
            width: 100vw;
            z-index: 1;
            position: sticky;
            overflow: hidden;

            &::before,
            &::after {
                position: absolute;
                display: inline-block;
                content: '';
                background: white;
                width: 100%;
                top: 0;
                height: 100%;
            }

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
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: 100%;
            text-align: center;
            transition: .5s ease;
            z-index: 2;
        }

        .h1 {
            /* animation: grow 1s forwards; */

            &.hide {
                opacity: 0;
                transform: translateY(calc(-50% - 100px));
            }
        }

        .h2 {
            color: white;
            opacity: 0;
            transform: translateY(calc(-50% + 100px));

            &.show {
                opacity: 1;
                transform: translateY(-50%);
            }
        }

        .spacer {
            height: 200vh;
            position: relative;
            z-index: 3;
        }

        @keyframes grow {
            0% {
                clip-path: polygon(0 0, 100% 0%, 100% 2%, 0 2%);
            }

            100% {
                clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
            }
        }


        .waviy {
            position: relative;
        }

        .waviy span {
            display: inline-block;
            animation: flip .5s forwards ease;
            animation-delay: calc(.2s * var(--i));
            transform-origin: left top;
            transform: rotateX(-180deg);
            opacity: 0;
            overflow: hidden;

        }

        @keyframes flip {

            0% {
                transform: rotateX(-180deg) translateY(100px) skew(-.02turn, 0);
                opacty: 0;
            }
           
            100% {
                transform: rotateX(0) skew(0) translateY(0);
                opacity: 1;
            }
        }
    }
</style>