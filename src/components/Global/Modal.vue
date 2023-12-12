<template>
    <div>
        <button class="button button-red red" 
            ref="triggerRef" 
            @click="open = true"
            :aria-label="`Learn more about ${project.title}`">
            <span class="brackets h5" aria-hidden="true">[</span>
            Learn More
            <span class="brackets h5" aria-hidden="true">]</span>
        </button>

        <Teleport to="body">
            <transition name="modalTransition">
                <div v-if="open" class="modal" @keyup.esc="open = false" @click.self="open = false">
                    <GlobalFocusTrap class="focus-trap" :enabled="open">
                        <div class="container">
                            <div v-if="project" class="modal-content" role="dialog" aria-modal="true" tabindex="-1" ref="modalRef"
                                aria-labelledby="modal-title">
                                <h2 class="h2 mb-40" id="modal-title">{{ project.title }}</h2>

                                <div class="tech mb-40 flex-align-center wrap">
                                    <ul class=" text-list">
                                        <li class="paragraph-small rubik" v-for="item in project.tech">
                                            {{ item }}
                                        </li> 
                                    </ul>
                                </div>


                                <div class="company mb-80" v-if="project.description">
                                    <p class="paragraph mb-20"><u>ABOUT THE PROJECT:</u></p>
                                    <div class="paragraph" v-html="project.description"></div>
                                </div>
    
                                <GlobalCarousel class="mb-80" :images="project.images" />


                                <div class="video-container mb-80" v-if="project.video">
                                    <video playsinline muted loop controls>
                                        <source :src="project.video" type="video/mp4">
                                    </video>
                                    <p class="paragraph">Short snippet of the presentation</p>
                                </div>

                                <!-- <p class="paragraph">{{ project.body }}</p> -->
                                <button type="button button-red" class="close" @click.stop="open = false">
                                    <span class="sr-only">Close Modal</span>
                                </button>
                                <slot></slot>
                            </div>
                        </div>
                    </GlobalFocusTrap>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick } from 'vue'

    const props = defineProps({
        project: {
            type: Object,
        }
    })

    const open = ref(false)
    const triggerRef = ref(null)
    const modalRef = ref(null)

    watch(open, (newOpen) => {
        const app = document.getElementById('app');
        if (newOpen) {
            document.body.style.overflow = 'hidden';
            app.style.pointerEvents = 'none';
            app.setAttribute('aria-hidden', true);
            nextTick(() => {
                if (modalRef?.value) modalRef.value.focus();
            });

        } else {
            document.body.style.overflow = 'auto';
            app.style.pointerEvents = 'auto';
            app.setAttribute('aria-hidden', false);
            nextTick(() => {
                if (triggerRef?.value) modalRef.value.focus();
            })
        }
    })


</script>

<style lang="scss" scoped>
    .modal {
        background: rgba($black, 0.8);
        position: fixed;
        left: 0;
        top: 0;
        overflow: auto;
        height: 100vh;
        width: 100vw;
        z-index: 9999;
        display: flex;
        flex-direction: column;

        >.focus-trap {
            width: 100%;
            margin: auto;
            padding: 100px 0;
        }


        .close {
            background: none;
            border: 0;
            cursor: pointer;
            height: 25px;
            width: 25px;
            padding: 0;
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 1000;

            &::before,
            &::after {
                background: $black;
                content: '';
                display: block;
                height: 1px;
                left: 2px;
                position: absolute;
                top: 12px;
                width: 20px;
            }

            &::before {
                transform: rotate(-45deg);
            }

            &::after {
                transform: rotate(45deg);
            }

            &:hover,
            &:focus {
                border-radius: 2px;
                background: $prussian-blue;

                &::before,
                &::after {
                    background: $white;
                }
            }

            @media (min-width: 768px) {
                right: 20px;
                top: 20px;
            }
        }

        .modal-content {
            background: $white;
            max-width: 1200px;
            position: relative;
            width: 100%;
            margin: auto;
            padding: 10% 5%;
            
        }

        video {
            width: 100%;
        }

        .tech {
        }
    }
</style>