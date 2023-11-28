import { ref } from 'vue'

export function scrollTo(id, motion) {
  const el = document.getElementById(id);
  if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: motion })
        el.focus({
            preventScroll: true // prevents interruption of a smooth animated scroll
        });
  }
}