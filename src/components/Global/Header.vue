<template>
    <header class="global-header" :class="{open: open, 'full-nav': 
    hasScrolled }" id="header">
        <div class="container">
            <GlobalFocusTrap :enabled="open" class="trap-wrapper">
                <nav class="items-container" @keyup.esc="closeNav" aria-label="Main Navigation">
                    <a href="#top" class="logo" @click.prevent="scroll('top')">
                        <span>MCB</span>
                     </a>

                    <div class="button-wrapper">
                        <button id="menu-toggle" aria-haspopup="true" class="hamburger" ref="hamburger"
                            @click="toggleNav" :aria-expanded="open.toString()">
                            <span class="sr-only">{{ hamburgerSR }}</span>
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22"
                                height="19" viewBox="0 0 22 19" fill="none">
                                <path class="bar-1 bar" d="M1 1.5H21" stroke="black" stroke-width="1.5"
                                    stroke-linecap="round" />
                                <path class="bar-2 bar" d="M1 9.5H21" stroke="black" stroke-width="1.5"
                                    stroke-linecap="round" />
                                <path class="bar-3 bar" d="M1 17.5H21" stroke="black" stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                        </button>
                        <transition name="radiate">
                            <div class="circle" :class="{ 'show' : open, 'hide': !open }"></div>
                        </transition>
                    </div>

                    <transition name="showItems">
                        <div class="items-wrapper" v-show="open">
                            <div class="container">
                                <div class="inner-menu" tabindex="-1" id="inner-menu" aria-label="Expanded Navigation">
                                    <ul class="items">
                                        <li v-for="(item, index) in menu" :key="`nav-${index}`">
                                            <a @click.prevent="scroll(item.slug)" :href="`#${item.slug}`"
                                                ref="topLevel">
                                                {{ item.title }}
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </transition>
                </nav>
            </GlobalFocusTrap>
        </div>
    </header>

</template>

<script setup>
    import { ref, reactive, computed, toRefs, onMounted, watch  } from 'vue'
    import { scrollTo } from '../../composables/scrollTo.js'

    import { useWindowStore } from '@/stores/window';
    const windowStore = useWindowStore();

    const scrollTop = computed(() => {
        return windowStore.scrollTop;
    });

    const hasScrolled = computed(() => {
        return scrollTop?.value > window.innerHeight * 3; // try subtrating the height of WORK
    })

    const menu = [
        { title: 'Work', slug: 'work' },
        { title: 'About', slug: 'about' },
        { title: 'Contact', slug: 'contact' },
    ]

    const open = ref(false);

    const toggleNav = () => {
        if (open.value) closeNav();
        else openNav();
    }

    const openNav = () => {
        open.value = true;
        nextTick(() => {
            document.body.style.overflow = "hidden";
            const focus = document.getElementById("inner-menu");
            focus.focus();
        });
    }

    const closeNav = () => {
        open.value = false;
        document.body.style.overflow = "auto";
    }

    const scroll = (id) => {
        const anim = open.value ? 'instant' : 'smooth';
        if (open.value) closeNav();
        scrollTo(id, anim);
    }

    const skipToContent = () => {
        const anchor = document.getElementById('main');
        anchor.focus();
    };

    const hamburgerSR = computed(() => {
        return open.value ? "Close Navigation" : "Open Navigation";
    })

</script>

<style lang="scss">
    .global-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 999;
        transition: 300ms ease;
        transform: translateY(-100%);
        opacity: 0;
        animation: .6s header-show .5s forwards ease;

        >.container {
            height: $header-height;
        }

        .logo {
            font-family: $major-mono;
            font-size: 26px;
            margin-right: auto;
            transition: 0.25s ease .2s;
            position: relative;
            z-index: 999;

        }

        .button-wrapper {
            height: 22px;
            width: 22px;
            margin-top: 5px;
            display: none;
        }

        .hamburger {
            display: block;
            z-index: 9;
            position: relative;
            border-radius: 100%;
            width: 100%;
            height: 100%;

            svg {
                display: inline-block;
                width: 100%;
            }

            .bar {
                transition: 0.25s ease .2s;
            }
        }



        .circle {
            $pad: 20px;

            height: 300vmax;
            width: 300vmax;
            display: block;
            position: absolute;
            top: 50%;
            background: $black;
            border-radius: 100%;
            transform-origin: center;
            will-change: transform;
            z-index: -1;
            left: calc(100vw - 20px - 11px);

            @media (min-width: 768px) {
                left: calc(100vw - 40px - 11px);
            }

            @media (min-width: $max-container) {
                left: calc(50% + calc($max-container/2) - 40px - 11px);
            }

            &.hide {
                transform: translate3d(-50%, -50%, 0) scale(0);
            }

            &.show {
                transform: translate3d(-50%, -50%, 0) scale(1);
            }

            &.show {
                transition: transform .6s ease-in, opacity .25s ease;
            }

            &.hide {
                transition: transform .5s ease-out .25s, opacity .25s ease-out .5s;
            }
        }

        .items-container {
            width: 100%;
            -webkit-overflow-scrolling: touch;
            z-index: 9999;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            padding-top: 15px;
        }

        .items-wrapper {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 100vh;
            overflow: auto;
            color: $white;
            padding-top: $header-height;
            display: flex;
            flex-direction: column;
            justify-content: center;

            ul {
                padding: 60px 40px;
            }

            li {
                font-size: 1.3rem;
                letter-spacing: .1rem;
                font-family: $rubik;
                margin-bottom: 2em;
            }
        }


        &.open {

            .logo {
                color: $white;
            }

            .items-container {
                pointer-events: auto;
            }

            .button-wrapper {
                .bar {
                    stroke: $white;

                    &.bar-1 {
                        transform: translate(4px, 1px) rotate(45deg);
                    }

                    &.bar-2 {
                        opacity: 0;
                    }

                    &.bar-3 {
                        transform: translate(-9px, 5px) rotate(-45deg);
                    }
                }
            }
        }

        &.full-nav {
            background: $white;
            .button-wrapper {
                display: block;
            }
        }

        .showItems-enter-active {
            transition: transform .4s ease-out .65s, opacity .6s ease-out .69s;
        }

        .showItems-leave-active {
            transition: .2s ease-out;
        }

        .showItems-enter-from,
        .showItems-leave-to {
            opacity: 0;
            transform: translate3d(0, 200px, 0);
        }

        .showItems-enter-to,
        .showItems-leave {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        @keyframes header-show {
            100% {
                transform: translateY(0);
                opacity: 1;

            }
        }
    }
</style>