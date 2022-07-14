import { createApp } from "vue";
import App from "./App.vue";
import "@vueform/multiselect/themes/default.css"
// import router from "./router";
import Toast from 'vue3-toast-single'
import 'vue3-toast-single/dist/toast.css'

const app = createApp(App);

app.use(Toast, { verticalPosition: "top",horizontalPosition:"center",transition:"transition",closeable:false, duration: 2000 });
// app.use(router);
app.mount("#app");
