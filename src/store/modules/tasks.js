import {
  getDatabase,
  ref,
  onValue,
  set,
  child,
  push,
  update,
  remove,
} from "firebase/database";
import store from "../index";
const db = getDatabase();

const tasks = {
  state: {
    tasks: [],
  },
  getters: {
    getTasks: (state) => {
      return state.tasks;
    },
  },
  mutations: {
    setTasks: (state, filteredTasks) => {
      state.tasks = filteredTasks;
    },
    clearTasks: (state) => {
      state.tasks = [];
    }
  },
  actions: {
    getTasks({ commit, state }, parameter) {
      const tasksRef = ref(db, "users/" + store.getters.getUserId + "/tasks");
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        let filteredTasks = [];
        switch (parameter.value) {
          case "active":
            Object.values(data).forEach((element) => {
              element.isDone == false ? filteredTasks.push(element) : null;
            });
            state.tasks = filteredTasks;
            break;
          case "doned":
            Object.values(data).forEach((element) => {
              element.isDone == true ? filteredTasks.push(element) : null;
            });
            state.tasks = filteredTasks;
            break;
          default:
            Object.values(data).forEach((element) => {
              element.isDone != null ? filteredTasks.push(element) : null;
            });
            state.tasks = filteredTasks;
            break;
        }
        commit("setTasks", filteredTasks);
      });
    },
    updateTasks({ commit, state }, formValue) {
      set(
        ref(
          db,
          "users/" + store.getters.getUserId + "/tasks/" + formValue.id
        ),
        {
          description: formValue.description,
          id: formValue.id,
          tags: formValue.tags,
          title: formValue.title,
          isDone: formValue.isDone,
        },
        { merge: true }
      );
    },
    addTask({ commit, state }, formValue) {
      const newPostKey = push(
        child(ref(db), "users/" + store.getters.getUserId + "/tasks")
      ).key;
      const newTask = {
        description: formValue.description,
        title: formValue.title,
        isDone: formValue.isDone,
        tags: formValue.tags,
        id: newPostKey,
      };

      const updates = {};
      updates["users/" + store.getters.getUserId + "/tasks/" + newPostKey] =
        newTask;
      return update(ref(db), updates);
    },
    removeTask({ commit,  dispatch }, task) {
      remove(ref(db, "users/" + store.getters.getUserId + "/tasks/" + task.id));
    },
    registerData({ commit }) {
      set(ref(db, "users/" + store.getters.getUserId + "/tasks/"), {
        merge: true,
      });
    },
  },
};
export default tasks;
