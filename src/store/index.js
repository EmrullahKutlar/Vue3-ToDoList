import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import authentication from "../store/modules/auth";
import updateUser from "../store/modules/updateUser";
import tasks from "../store/modules/tasks";
import "../firebase/index";




const ls = new SecureLS({
  isCompression: false,
});

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    getTasks({ commit },state) {
      
    }
  },
  modules: {
    authentication,
    updateUser,
    tasks
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
