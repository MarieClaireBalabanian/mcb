<template>
    <section class="block-image-collage">
        <div class="container">
            <div class="collage">
                <div class="image-container" ref="imageRef" :class="`image-${index}`" v-for="(item, index) in images"
                    :key="`collage-img-${index}`">
                    <img loading="eager" :src="item.url" :alt="item.alt" />
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
import { ref, reactive, computed, toRefs, onMounted } from 'vue'



    const images = [

        { url: '/img/test/geffen.png', alt: 'Audio Wave' },
        { url: '/img/test/surety.png', alt: 'Audio Wave' },
        { url: '/img/test/cac.png', alt: 'Audio Wave' },
        { url: '/img/test/masters.png', alt: 'Audio Wave' },
        

        { url: '/img/test/clayton.png', alt: 'Audio Wave' },
        { url: '/img/test/mc.png', alt: 'Audio Wave' },
        { url: '/img/test/samson.png', alt: 'Audio Wave' },
    ];


    const observer = ref(null)
    const imageRef = ref([])


    const initObserver = () => {
        const options = { threshold: 0 };
        let obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("showing");
                } else {
                    entry.target.classList.remove("showing");

                }
            });
        }, options);

        const els = imageRef.value


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
    .block-image-collage {
        max-width: 1440px;
        margin: 46px auto 60px;

        @media (max-width:767px) {
            max-width: 500px;

            .container {
                padding: 0;
            }
        }

        .image-container {
            width: 400px;
            overflow: hidden;

            img {
                max-width: 100%;
                display: block;


            }
        }

        .collage {
            width: 100%;
            height: 0;
            padding-top: 200%;
            position: relative;


            .image-container {
                position: absolute;
                transition: opacity .8s ease;
                opacity: 0;
                overflow: hidden;

                &.showing {
                    opacity: 1;

                }


                &.image-0 {
                    width: 46%;
                    right: 0;
                    top: 0;

                    @media (min-width: 768px) {
                        top: 0;
                        right: auto;
                        right: initial;
                        left: 12.6%;
                        width: 28%;
                    }
                }

                &.image-1 {
                    width: 23.4%;
                    top: 5%;
                    right: 5%;
                    z-index: 2;
                }

                &.image-2 {
                    width: 20%;
                    top: 46.5%;
                    left: 5%;
                }

                &.image-3 {
                    width: 72.8%;
                    top: 23.6%;
                    right: 0;

                    @media (min-width: 768px) {
                        width: 62%;
                        top: 44.8%;
                        right: 3%;
                        z-index: 2;
                    }
                }

                &.image-4 {
                    width: 36%;
                    bottom: 18.5%;
                    right: 0;
                    overflow: visible;

                }

                &.image-5 {
                    width: 34.25%;
                    bottom: 0;
                    left: 22%;
                    z-index: 2;
                }

                /* &.image-6 {
                    width: 28%;
                    top: 28.5%;
                    left: 34.5%;
                    z-index: 3;

                    @media (min-width: 768px) {
                        width: 12.25%;
                        top: 37.9%;
                        left: 7.75%;
                        z-index: 3;
                    }
                } */
                &.image-6 {
                    width: 61.33%;
                    top: 39%;
                    right: 0;
                    overflow: visible;

                    @media (min-width: 768px) {
                        width: 26%;
                        top: 10%;
                        left: 41.7%;
                        overflow: visible;
                    }
                }

                &.image-8 {
                    width: 84%;
                    top: 60.9%;
                    left: 8.1%;

                    @media (min-width: 768px) {
                        width: 35.2%;
                        top: 47.3%;
                        left: 42%;
                    }
                }

                &.image-9 {
                    width: 16.1%;
                    top: 54.6%;
                    left: 80.8%;
                    z-index: 2;

                    @media (max-width:767px) {
                        display: none;
                    }
                }

                &.image-10 {
                    width: 14.25%;
                    top: 67.7%;
                    right: 0;

                    @media (max-width:767px) {
                        display: none;
                    }
                }

                &.image-11 {
                    width: 57.3%;
                    bottom: 0;
                    left: 0;

                    @media (min-width:768px) {
                        width: 31.6%;
                        bottom: 0;
                        left: 5.7%;
                    }
                }

                &.image-12 {
                    width: 14.25%;
                    bottom: 11%;
                    left: 31%;

                    @media (max-width:767px) {
                        display: none;
                    }
                }

                &.image-13 {
                    width: 45.9%;
                    bottom: 2.4%;
                    right: 8.1%;

                    @media (min-width:768px) {
                        width: 23.4%;
                        bottom: 1.8%;
                        right: 19.4%;
                    }
                }
            }
        }

        @media (min-width:768px) {
            margin: 50px auto 140px;

            .collage {
                padding-top: 125%;
            }
        }
    }
</style>