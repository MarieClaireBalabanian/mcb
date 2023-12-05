<template>
    <section class="block-full-screen-fade" tabindex="-1">
        <div class="wrapper">


            <div class="image-carousel">
                <div class="image-container">
             

                    <div class="global-image cover">
                        <transition name="fade">
                        <img :src="currentImage.url" :alt="currentImage.alt" :key="currentImage.url" />
                    </transition>

                    </div>
             
                </div>
            </div>



            <div class="container">
                <div class="content">
                    <div :data-id="index" v-for="(item, index) in slides" class="item" ref="slidesRef">
                        <div class="item-inner">
                            <h3 v-if="item.title" class="h3">{{ item.title }}</h3>
                            <div v-if="item.body" class="copy subhead-4" v-html="item.body"></div>
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
        return arr[currentIndex.value];
    })


    const initObserver = () => {
        let obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const current = parseInt(entry.target.getAttribute('data-id'), 10)

                if (entry.isIntersecting) {
                    currentIndex.value = current
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

	.image-carousel {
		position: absolute;
		inset: 0 0 0 0;
        min-height: 100vh;

	}
	
	.image-container {
		position: sticky;
		top: 0;
		width: 100vw;
		height: 100vh;
	}

	.global-image, img {
		position: absolute;
		inset: 0 0 0 0;
		object-fit: cover;
		object-position: center;
		z-index: 1;
	}

	.content {
		z-index: 5;
		position: relative;
	}

	.item {
		min-height: 100vh;
		padding: 70vh 0;

		.item-inner {
			padding: 48px;
			max-width: 608px;
			background-color: white;
			position: relative;
			overflow: hidden;
			clip-path: polygon(5% 8%, 5% 0, 100% 0, 100% 93%, 85% 93%, 85% 100%, 0 100%, 0 8%);
				margin-left: auto;
		}
	}

	.copy  {
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