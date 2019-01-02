import Vue from "vue";
import Router from "vue-router";
import nativeToast from "native-toast";
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
        store.dispatch("signOut").then(() => {
          nativeToast({
            message: "Logged out!",
            position: "south-east",
            timeout: 3000,
            type: "success"
          });
          next({ name: "home" });
        });
      },
      meta: { requiresAuth: true }
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

function authRoute(to) {
  return to.matched.some(route => route.meta.requiresAuth);
}

function guestRoute(to) {
  return to.matched.some(route => route.meta.requiresGuest);
}

router.beforeEach((to, from, next) => {
  console.log(`${from.name} → ${to.name}`);

  store.dispatch("initAuthObserver").then(user => {
    console.log("🚦️", user);
    if (authRoute(to)) {
      if (user) {
        next();
      } else {
        next({ name: "login" });
      }
    } else if (guestRoute(to)) {
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
