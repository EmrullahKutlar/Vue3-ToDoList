<template>
  <div
    class="tab-pane fade show active d-flex flex-wrap justify-content-center"
    id="pills-all"
    role="tabpanel"
  >
    <div class="card mb-4 me-3" v-for="item in allTasks" :key="item">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <input
            type="checkbox"
            name=""
            id=""
            class="check-box"
            @click="makeDone(item)"
            :checked="item.isDone"
          />
          <h5 class="card-title" :class="{ completed: item.isDone }">
            {{ item.title }}
          </h5>

          <div class="dropdown">
            <i
              class="bi bi-three-dots-vertical card-dots"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Edit</a></li>
              <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="card-bottom" @click="makeDone(item)">
          <p class="card-text" :class="{ completed: item.isDone }">
            {{ item.description }}
          </p>
          <div class="tags d-flex justify-content-center">
            <p class="tag-project me-3" :class="{ completed: item.isDone }">
              Project
            </p>
            <p class="tag-personal me-3" :class="{ completed: item.isDone }">
              Personal
            </p>
            <p class="tag-urgent me-3" :class="{ completed: item.isDone }">
              Urgent
            </p>
            <p class="tag-list me-3" :class="{ completed: item.isDone }">
              List
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  setup() {
    const checked = ref(false);
    const allTasks = ref([]);

    const getAllTasks = () => {
      onSnapshot(collection(db, "tasks"), (querySnapshot) => {
        let tasks = [];
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            ...doc.data(),
          };
          tasks.push(todo);
        });
        allTasks.value = tasks;
      });
    };

    const makeDone =  (task) => {
      var selectedTask =doc(db, "tasks", task.id);
      updateDoc(selectedTask, {
        isDone: !task.isDone,
      });
    };

    onMounted(() => {
      getAllTasks();
    });

    return {
      checked,
      allTasks,
      makeDone
    };
  },
};
</script>

<style></style>
