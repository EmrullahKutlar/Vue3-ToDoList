import { createApp } from "vue";
import App from "./App.vue";
import "@vueform/multiselect/themes/default.css"
import router from "./router";
import store from "./store";
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: "top-right",
  timeout: 1750,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
}

const app = createApp(App);

app.use(Toast, options);
app.use(router);
app.use(store);
app.use(plugin, defaultConfig)
app.mount("#app");
