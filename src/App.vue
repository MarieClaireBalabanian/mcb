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
  import GlobalHeader from "./components/Global/Header.vue";
  import GlobalFooter from "./components/Global/Footer.vue";
  

  import { useWindowStore } from './stores/window';
  import { onMounted } from 'vue'


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
  onMounted(() => {
      scroll();
      window.addEventListener('scroll', scroll) 
  })
</script>


