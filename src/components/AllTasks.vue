<template>
  <div
    class="tab-pane fade show active d-flex flex-wrap justify-content-center"
    id="pills-all"
    role="tabpanel"
  >
    <div
      class="alert alert-warning w-100"
      role="alert"
      v-if="allTasks.length <= 0"
    >
      There is no tasks yet.
    </div>
    <div
      class="card mb-4 me-3"
      v-else
      v-for="(item, index) in allTasks"
      :key="index"
    >
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
          <h5 class="card-title d-flex justify-content-between">
            <span class="title-color" :class="{ completed: item.isDone }"
              >({{ index + 1 }}) - {{ item.title }}</span
            >
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
import { db, makeDone2 } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
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

    const makeDone = (task) => {
      makeDone2(task);
    };

    onMounted(() => {
      getAllTasks();
    });

    return {
      checked,
      allTasks,
      makeDone,
    };
  },
};
</script>

<style></style>
