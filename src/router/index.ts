import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import useFavorite from "@/stores/favorite";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    { path: "/home", redirect: "/" },
    {
      path: "/",
      name: "Home",
      component: HomeView,
      children: [
        {
          path: "/favorites",
          name: "Favorites",
          component: HomeView,
        },
      ],
    },
    {
      path: "/contact",
      name: "Contacts",
      component: () => import("../views/ContactsView.vue"),
      children: [
        {
          path: "new",
          name: "NewContact",
          component: () => import("../components/newContact/NewContact.vue"),
          // props: (route) => ({ id: route.query.id }),
        },
        {
          path: "detail/:id",
          name: "ContactDetail",
          component: () => import("../components/contact/ContactDetail.vue"),
          props: true,
        },
        {
          path: "edit/:id",
          name: "ContactEdit",
          component: () => import("../components/contact/ContactEdit.vue"),
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const favoriteStore = useFavorite();

  if (to.name === "Favorites") {
    favoriteStore.change(true);
    next();
  } else {
    favoriteStore.change(false);
    next();
  }
});

export default router;
