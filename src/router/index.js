import store from "@/store";
import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component:() =>
    import ('@/views/index/index.vue'),
    
  },
  {
    name: "LoginPage",
    path: "/login",
    component:() =>
    import ('@/views/login/login.vue'),
    
  },
  {
    name: "RegisterPage",
    path: "/register",
    component:() =>
    import ('@/views/register/register.vue'),
    
  },
  {
    name: "AccountPage",
    path: "/account",
    component:() =>
    import ('@/views/account/account.vue'),
    
  },
  {
    name: "PageNotFound",
    path: "/:pathMatch(.*)",
    component:  () =>
    import ('@/views/404/404.vue'),
    meta: {
        layout: 'pagenotfound',
    }
  }

 
];
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes,

});

router.beforeEach((to, from, next) => {
  const AuthenticatedPages = ["HomePage","AccountPage"];
  const NotAuthenticatedPages = [
    "LoginPage",
    "RegisterPage",
  ];
  const _isAuthenticated = store.getters.isAuthenticated;
  if (NotAuthenticatedPages.indexOf(to.name) > -1 && _isAuthenticated){
    next({ name: "HomePage" }); // Giriş yapmış kullanıcının login ve registera ulaşmasını engeller.
  }
  if (AuthenticatedPages.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next(); // burada herkese açık olan componentler gözükür. Burayı false yaparak dışarı açık olan tüm componentler kapatılabilir.
  }
});

export default router;
