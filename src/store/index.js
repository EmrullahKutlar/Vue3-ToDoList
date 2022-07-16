import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import router from "../router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile
} from "firebase/auth";
const auth = getAuth();
const ls = new SecureLS({
  isCompression: false,
});

export default createStore({
  state: {
    user: null,
    isAuthenticated: false
  },
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated 
  },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setIsAuthenticated(state, value) {
      state.isAuthenticated = value;
    }
  },
  actions: {
    async login({ commit,state }, formValue) {
      const { email, password ,displayName} = formValue;
      try {
       await signInWithEmailAndPassword(auth, email, password);
       await updateProfile(auth.currentUser, { displayName: displayName }).catch(
        (err) => console.log(err)
      );
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert(error.message);
        }
        return
      }

      
      commit("setUser",auth.currentUser);
      commit("setIsAuthenticated",true);
      console.log("state user",state.user.email + " " + state.user.displayName);
      router.push("/");

    },

    async register({ commit ,state}, formValue) {
      const { email, password,displayName } = formValue;
      try {
        await createUserWithEmailAndPassword(auth, email, password,displayName);
        await updateProfile(auth.currentUser, { displayName: displayName }).catch(
          (err) => console.log(err)
        );
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert(error.message);
        }
        return
      }
      console.log(auth.currentUser);
      commit("setUser",auth.currentUser);
      commit("setIsAuthenticated",true);
      console.log("state user",state.user);
      router.push("/");
    },
    
    async logout({ commit }) {
      await signOut(auth);
      commit("clearUser");
      commit("setIsAuthenticated",false);
      router.push("/login");
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
});
