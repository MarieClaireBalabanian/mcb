import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Work from "./views/Work.vue";
import Project from "./views/Project.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/work",
    name: "Work",
    component: Work,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/work/:project",
    name: "Project",
    component: Project,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    else {
      return { top: 0 }
    }
  },
  linkActiveClass: 'active'
})

export default router;