<template>
    <section class="block-thumbnails bg-black" ref="blockRef">
        <div class="container">
            <GlobalParallaxWrapper x="0" y="120">
                <p class="floating-text">{{ project.title }}</p>
            </GlobalParallaxWrapper>
            
            <ul  :class="{ 'grid grid-2': project.portrait }" aria-label="More media from the project">
                <li class="video-container mb-20" v-if="project.video">
                    <video playsinline muted loop controls aria-describedby="video-transcript">
                        <source :src="project.video" type="video/mp4">
                    </video>
                    <p class="sr-only" id="video-transcript">A video</p>
                </li>
                <li class="mb-20" v-for="image in project.images">
                    <img :src="image.url" :alt="image.alt" />
                </li>
            </ul>
        </div> 
    </section>
</template>

<script setup>
    import { ref, reactive, computed, toRefs, onMounted } from 'vue';
    
    const props = defineProps({
        project: {
            type: Object,
        },
    })

    const blockRef = ref(null)
    const observer = ref(null)


    // const initObserver = () => {
    //     let observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('showing');
    //             }
    //         });
    //     });

    //     const els = blockRef.value.querySelectorAll('.translates');
    //     els.forEach((el) => {
    //         observer.observe(el);
    //     })

    //     observer.value = observer;
    // };

    onMounted(() => {
        // initObserver();
    })

</script>


<style lang="scss">
    .block-thumbnails {
        clip-path: polygon(0 0, 100% 60px, 100% 100%, 0 calc(100% - 60px));
        padding: 100px 0;
        .container {
            position: relative;
        }

        
        


        .floating-text {
            position: absolute;
            top: 0;
            left: 0;
            transform: rotate(-90deg) translateX(-100%);
            text-transform: uppercase;
            letter-spacing: .1em;
            transform-origin: left top;
        }

        img {
            width: 100%;
            object-fit: contain;
            object-position: center;
        }


        @media (min-width: 768px) {
            padding: 100px 0;

        }
    }
</style>