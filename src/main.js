import { createApp } from "vue";
import App from "./App.vue";
import "@vueform/multiselect/themes/default.css"
import router from "./router";
import store from "./store";
import Toast from 'vue3-toast-single'
import 'vue3-toast-single/dist/toast.css'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

const app = createApp(App);

app.use(Toast, { verticalPosition: "top",horizontalPosition:"center",transition:"transition",closeable:false, duration: 1000 });
app.use(router);
app.use(store);
app.use(plugin, defaultConfig)
app.mount("#app");
