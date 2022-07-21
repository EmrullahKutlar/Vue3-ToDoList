import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import Swal from "sweetalert2";
import router from "../../router";
import "../../firebase/index";
import store from "../index";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile,
} from "firebase/auth";

const ls = new SecureLS({
  isCompression: false,
});
const auth = getAuth();

const authentication = {
  state: {
    user: null,
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    getUser: (state) => {
      return state.user;
    },
    getUserId: (state) => {
      return state.user.uid;
    },
    getUserName: (state) => {
      return state.user.displayName;
    },
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    clearUser(state) {
      state.user = null;
    },
    setIsAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    async login({ commit, state }, formValue) {
      const { email, password, displayName } = formValue;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Swal.fire("Soryy!", "User not found", "error");
            break;
          case "auth/wrong-password":
            Swal.fire("Soryy!", " Wrong password", "error");
            break;
          default:
            Swal.fire("Soryy!", error.message, "error");
        }
        return;
      }
      commit("setUser", auth.currentUser);
      commit("setIsAuthenticated", true);
      Swal.fire("Success!", "Welcome " + state.user.displayName, "success");
      router.push("/");
      store.dispatch("getTasks", { value: "all" });

    },
    async register({ commit, state }, formValue) {
      const { email, password, displayName } = formValue;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        }).catch((err) => console.log(err));
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            Swal.fire("Soryy!", "Email already in use", "error");
            break;
          case "auth/invalid-email":
            Swal.fire("Soryy!", "Invalid email", "error");
            break;
          case "auth/weak-password":
            Swal.fire("Soryy!", "Weak password", "error");
            break;
          default:
            Swal.fire("Soryy!", error.message, "error");
        }
        return;
      }
      commit("setUser", auth.currentUser);
      commit("setIsAuthenticated", true);
      store.dispatch("registerData");
      Swal.fire("Success!", "Welcome " + state.user.displayName, "success");
      router.push("/");
    },
    async logout({ commit }) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          signOut(auth);
          commit("clearUser");
          store.commit("clearTasks");
          commit("setIsAuthenticated", false);
          router.push("/login");
          Swal.fire("Succes!", "You Logged Out", "success");
        }
      });
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("clearUser");
          commit("setIsAuthenticated", false);
          router.push("/login");
        } else {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
        }
        if (router.isReady() && router.currentRoute.path === "/login") {
          router.push("/");
        }
      });
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
};
export default authentication;
