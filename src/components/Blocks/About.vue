<template>
    <section class="block-full-screen-fade" tabindex="-1">
        <div class="wrapper">



                    <div class="global-image">
                            <img src="/img/mc.jpeg" alt="Me admiring Deception Pass State Park" />

                    </div>


            <div class="container">
                <div class="content">
                    <div :data-id="index" v-for="(item, index) in slides" class="item">
                        <div class="item-inner" ref="slidesRef">
                            <h3 class="h2">{{ item }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>



<script setup>
    import { ref, reactive, computed, toRefs, onMounted } from 'vue'

    const props = defineProps({
        slides: Array,
    })

    const { slides } = toRefs(props)

    const currentIndex = ref(0);
    const observer = ref(null);
    const slidesRef = ref([])


    const currentImage = computed(() => {
        const arr = slides.value.map((el) => {
            return el.img;
        })

        // return arr[currentIndex.value];
        return slides.value[1].img
    })


    const initObserver = () => {
        let obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const current = parseInt(entry.target.getAttribute('data-id'), 10)

                if (entry.isIntersecting) {
                    entry.target.classList.add('showing');
                } else {

                }
            })
        })

        slidesRef.value.forEach((el) => { obs.observe(el) })
        observer.value = obs;
    }



    onMounted(() => {
        initObserver();
    })

</script>


<style lang="scss">
    .block-full-screen-fade {
        position: relative;
        min-height: 100vh;
        background: rgba($white, .7);

        .global-image {
            position: sticky;
            top: 0;
            width: 100vw;
            height: 100vh;
            filter: grayscale(100%);
            background: rgba($white, .7);

            
        }

        img {
            position: absolute;
            inset: 0 0 0 0;
            object-fit: cover;
            object-position: center;
            z-index: 1;
            mix-blend-mode: screen;

        }

        .content {
            z-index: 5;
            position: relative;
            padding: 50vh 0;
        }

        .item {
            min-height: 100vh;
            padding: 30vh 0;

            &:nth-child(odd) {
                .item-inner {
                    margin-left: auto;

                }
            }

            .item-inner {
                /* padding: 30px 20px; */
                /* max-width: 608px; */
                /* background-color: white; */
                position: relative;
                display: inline-block;
                overflow: hidden;
              

                /* clip-path: polygon(99% 99%, 5% 0, 100% 0, 100% 93%, 85% 93%, 85% 100%, 0 100%, 0 8%); */
                
                
                
                
                .h2 {
                    opacity: 0;
                    transform: scale(.5);
                    /* clip-path: polygon(0 0, 0 100%, 0 100%, 0 0); */
                transition: opacity .5s ease, transform .3s ease-out;
                }

                &.showing {
                    .h2 {
                        /* clip-path: polygon(5% 8%, 5% 0, 100% 0, 100% 93%, 85% 93%, 85% 100%, 0 100%, 0 8%); */
                    /* clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0); */
                    opacity: 1;
                    transform: scale(1);

                    }

                }
            }


        }

        .copy {
            margin-top: 16px;
        }

        .buttons {
            margin-top: 8px;

            .button.small {
                margin: 8px 16px 8px 0;
                padding: 7px 24px;
            }
        }
    }
</style>