<template>
    <div>
        <button class="button button-red red" 
            ref="triggerRef" 
            @click="open = true"
            :aria-label="`Learn more about ${project.title}`">
            Learn More
        </button>

        <Teleport to="body">
            <transition name="modalTransition">
                <div v-if="open" class="modal" @keyup.esc="open = false" @click.self="open = false">
                    <GlobalFocusTrap class="focus-trap" :enabled="open">
                            <div v-if="project" class="modal-content container" role="dialog" aria-modal="true" tabindex="-1" ref="modalRef"
                                aria-labelledby="modal-title">
                                <button type="button button-red" class="close" @click.stop="open = false">
                                    <span class="sr-only">Close Modal</span>
                                </button>
                                <div class="header mb-40">
                                    <h2 class="h2" id="modal-title">{{ project.title }}</h2>

                                </div>

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

                                <div class="video-container mb-80" v-if="project.video">
                                    <video playsinline muted loop controls>
                                        <source :src="project.video" type="video/mp4">
                                    </video>
                                    <p class="paragraph">Short snippet of the presentation</p>
                                </div>
    
                                <GlobalCarousel class="mb-80" :images="project.images" />

                                
                                <slot></slot>
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
        background: $white;
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
                height: 2px;
                left: 0;
                position: absolute;
                top: 12px;
                width: 25px;
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
                background: $red;
                &::before, &::after {
                    background: $white;
                }
            }

            @media (min-width: 768px) {
                right: 20px;
                top: 20px;
            }
        }

        .modal-content {
            position: relative;
            width: 100%;
            padding-top: 100px;
            padding-bottom: 100px;
            max-width: 1000px;
        }

        video {
            width: 100%;
        }

        .h2 {
            display: inline;
            background: $black;
            color: $white;
            padding: 0 20px;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
        }
    }
</style>