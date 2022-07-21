import "../../firebase/index";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import Swal from "sweetalert2";
const ls = new SecureLS({
    isCompression: false,
  });
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
const auth = getAuth();
const updateUser = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
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
        });
        await updateEmail(auth.currentUser, email);
      } catch (error) {
        Swal.fire("Soryy!", error.message, "error");
        return;
      }
      Swal.fire("Success!", "Profile Updated", "success");
    },
    async changePassword({ commit }, formValue) {
      var password = formValue.password;
      await updatePassword(auth.currentUser, password)
        .then(() => {
          Swal.fire("Success!", "Password updated", "success");
        })
        .catch((error) => {
          Swal.fire("Soryy!", error.message, "error");
        });
    },
    async sendPasswordReset({ commit }, formValue) {
      var email = formValue.email;
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          Swal.fire(
            "Success!",
            "Password reset email sent. Check your email (If you cant see it, check your spam folder)",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire("Soryy!", error.message, "error");
          console.log(error);
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
export default updateUser;
