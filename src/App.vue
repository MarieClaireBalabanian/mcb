<template>
  <div id="app">
    <div class="meta-actions">
      <a @click.prevent="skipToContent" href="#main" class="skip-link sr-only sr-only-focusable">Skip
        to Content</a>
    </div>
    <GlobalHeader />
    <article class="page">
      <main id="main" tabindex="-1">
       <router-view />
      </main>
    </article>
    <GlobalFooter />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import GlobalHeader from "./components/Global/Header.vue";
  import GlobalFooter from "./components/Global/Footer.vue";
  
  import { useWindowStore } from './stores/window';
  const windowStore = useWindowStore();
 
  const scroll = () => {
      windowStore.scrollTop = window.scrollY;
  };
  const skipToContent = ()=> {
				const anchor = document.getElementById("main");
				if (anchor) {
					anchor.focus();
				}
			}
  const resize = () => {
      windowStore.isDesktop = window.innerWidth >= 768;
      windowStore.windowHeight = window.innerHeight;
  };
  onMounted(() => {
      scroll();
      resize();
      window.addEventListener('scroll', scroll);
      window.addEventListener('resize', resize);
  })
</script>



<style lang="scss">

  
</style>