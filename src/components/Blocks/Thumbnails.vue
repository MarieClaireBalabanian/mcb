<template>
    <section class="block-thumbnails" ref="blockRef">
        <div class="container">
            <ul class="">
                <li v-for="project in projects">
                    <img class="mb-20" :src="project.images[0].url" :alt="project.images[0].alt" />
                    
                    <div class="copy text-center">
                        <h3 class="h3 mb-20">{{ project.title }}</h3>
                        <div class="actions">
                            <router-link :to="`/work/${project.slug}`" class="text-link" target="_blank" rel="noopener noreferrer">Learn More &rarr;</router-link>
                        </div>
                    </div>
    
                
                </li>
            </ul>
             
            

        </div>
    </section>
</template>

<script setup>
    import { ref, reactive, computed, toRefs, onMounted } from 'vue'

    const props = defineProps({
        projects: {
            type: Array,
        },
    })

    const blockRef = ref(null)
    const observer = ref(null)


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
        // initObserver();
    })

</script>


<style lang="scss">
    .block-thumbnails {
        padding: 60px 0;
        background: $black;


        .image-wrapper,
        img {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            object-position: left center;
        }

        ul {
            columns: 2;
            column-gap: 5%;
            li {
                margin-bottom: 60px;
                width: 90%;
                background: $white;
                break-inside: avoid;
                

                &:nth-child(3n) {
                    margin-left: auto;
                }
    
            }
            .copy {
                padding: 0 10px 20px;
            }
        }


        @media (min-width: 768px) {
            padding: 90px 0 100px;

        }
    }
</style>