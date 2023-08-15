import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faArrowLeft,
  faBars,
  faChevronRight,
  faHeartCircleCheck,
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faTriangleExclamation,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
  faBars,
  faX,
  faHouse,
  faHeart,
  faPlus,
  faArrowLeft,
  faTriangleExclamation,
  faHeartCircleCheck,
  faChevronRight,
  faMagnifyingGlass
);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
