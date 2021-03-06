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
import { useToast } from 'vue-toastification'
const toast = useToast()
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
    },
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
        ref(db, "users/" + store.getters.getUserId + "/tasks/" + formValue.id),
        {
          description: formValue.description,
          id: formValue.id,
          tags: formValue.tags,
          title: formValue.title,
          isDone: formValue.isDone,
        },
        { merge: true }
      ).then(() => {
        toast.success("Task updated successfully")
      })
      .catch((error) => {
        toast.error(error.message)
      });
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
       update(ref(db), updates).then(() => {
        toast.success("Task added successfully")
      })
      .catch((error) => {
        toast.error(error.message)
      });;
    },
    removeTask({ commit, dispatch }, task) {
      remove(ref(db, "users/" + store.getters.getUserId + "/tasks/" + task.id))
        .then(() => {
          toast.success("Task removed")
        })
        .catch((error) => {
          toast.error(error.message)
        });
    },
    registerData({ commit }) {
      set(ref(db, "users/" + store.getters.getUserId + "/tasks/"), {
        merge: true,
      });
    },
    searchTasks({ commit, state }, searchValue) {
      const tasksRef = ref(db, "users/" + store.getters.getUserId + "/tasks");
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        let filteredTasks = [];
        Object.values(data).forEach((element) => {
          if (
            element.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            element.description
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            filteredTasks.push(element);
          }
        });
        state.tasks = filteredTasks;
        commit("setTasks", filteredTasks);
      });
    },
  },
};
export default tasks;
