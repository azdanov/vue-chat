import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/Home.vue"),
      meta: { requiresGuest: true }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue"),
      meta: { requiresGuest: true }
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter(to, from, next) {
        store.dispatch("signOut").then(() => next({ name: "home" }));
      }
    },
    {
      path: "/chat",
      name: "chat",
      component: () =>
        import(/* webpackChunkName: "chat" */ "./views/Chat.vue"),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(`${from.name} → ${to.name}`);

  store.dispatch("initAuthentication").then(user => {
    console.log("🚦️", user);
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (user) {
        next();
      } else {
        next({ name: "login" });
      }
    } else if (to.matched.some(route => route.meta.requiresGuest)) {
      if (!user) {
        next();
      } else {
        next({ name: "chat" });
      }
    } else {
      next();
    }
  });
});

export default router;
