import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import Swal from "sweetalert2";

import router from "../router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail 
} from "firebase/auth";
const auth = getAuth();
const ls = new SecureLS({
  isCompression: false,
});

export default createStore({
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
    },
    setUpdateName(state, value) {
      state.user.displayName = value;
    },
    setUpdateEmail(state, value) {
      state.user.email = value;
    },
  },
  actions: {
    async login({ commit, state }, formValue) {
      const { email, password, displayName } = formValue;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        })
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
      console.log(
        "state user",
        state.user.email + " " + state.user.displayName
      );
      Swal.fire(
        "Success!",
        "Welcome " + state.user.displayName,
        "success"
      );
      router.push("/");
    },

    async register({ commit, state }, formValue) {
      const { email, password, displayName } = formValue;
      try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          displayName
        );
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
      console.log(auth.currentUser);
      commit("setUser", auth.currentUser);
      commit("setIsAuthenticated", true);
      console.log("state user", state.user);
      Swal.fire(
        "Success!",
        "Welcome " + state.user.displayName,
        "success"
      );
      router.push("/");
    },

    async updateProfile({ commit }, formValue) {
      var displayName =
        formValue.name == undefined || null || "" || formValue.name.length <= 0
          ? auth.currentUser.displayName
          : formValue.name;
      var email =
        formValue.email == undefined ||
        null ||
        "" ||
        formValue.email.length <= 0
          ? auth.currentUser.email
          : formValue.email;
      try {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        })
        await updateEmail(auth.currentUser, email)
      } catch (error) {
        Swal.fire("Soryy!", error.message, "error");
        return;
      }
      Swal.fire(
        "Success!",
        "Profile Updated",
        "success"
      );
    },
    async changePassword({ commit }, formValue) {
      var password = formValue.password;
      await updatePassword(auth.currentUser, password)
        .then(() => {
          Swal.fire(
            "Success!",
            "Password updated",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire("Soryy!", error.message, "error");
        });
    },
    async sendPasswordReset({ commit }, formValue) {
      var email = formValue.email;
      await sendPasswordResetEmail(auth,email)
        .then(() => {
          Swal.fire(
            "Success!",
            "Password reset email sent. Check your email (If you cant see it, check your spam folder)",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire("Soryy!", error.message, "error");
        });
    },

    async logout({ commit }) {
      
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          signOut(auth);
          commit("clearUser");
          commit("setIsAuthenticated", false);
          router.push("/login");
          Swal.fire(
            'Succes!',
            'You Logged Out',
            'success'
          )
        }
      })
     
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
