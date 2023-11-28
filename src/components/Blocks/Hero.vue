<template>
    <section class="block-hero" ref="heroRef">


        <div class="container">
            <h1 class="h1 mb-40">
                <span class="bar mb-20">
                    <span>Marie-Claire</span>
                </span>
                <br>
                <span class="bar">
                    <span>Balabanian</span>

                </span>
            </h1>
            <h2 class="bar right">
                <span class="h2 left-auto">Web Developer</span>
            </h2>
        </div>

    </section>
</template>


<script setup>
import { ref, reactive, computed, toRefs, onMounted } from 'vue'


    const observer = ref(null)
    const blurbsRef = ref([])
    const heroRef = ref(null)


    const initObserver = () => {
        const options = { threshold: 0 };
        let obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("showing");
                }
            });
        }, options);

        const els = heroRef.value.querySelectorAll('.bar');
        els.forEach((el) => {
            obs.observe(el);
        });
        observer.value = obs;
    }


    onMounted(() => {
            initObserver();
        
    })

</script>


<style lang="scss">
    .block-hero {
        padding: 10vh 0;
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: $white;
        overflow-x: hidden;

        .global-grid {
            position: absolute;
            top: 0;
            left: 0;
        }

        .container {
            width: 100%;
            display: flex;
            flex-direction: column;
            color: $white;
        }

        .bar {
            display: inline-block;
            position: relative;
            color: $white;
            width: auto;
            padding: 20px;

            &::before {
                position: absolute;
                top: 0;
                width: 200vh;
                right: 0;
                bottom: 0;
                transform: scaleX(0);
                transform-origin: right bottom;
                transition: 1s ease;
                content: '';
                background: $black;
                z-index: 0;
            }

            &.right {
                align-self: flex-end;

                &::before {
                    transform-origin: left bottom;
                    right: unset;
                    left: 0;
                }
            }

            &.showing {
                &::before {
                    transform: scaleX(1);
                }

                span {
                    transition-delay: 1s;
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            span {
                position: relative;
                display: inline-block;
                z-index: 5;
                opacity: 0;
                transform: translateY(100%);
                transition: 1s ease;
            }
        }
    }
</style>