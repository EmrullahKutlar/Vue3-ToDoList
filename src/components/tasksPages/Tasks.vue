<template>
  <div class="tab-pane fade show active d-flex flex-wrap justify-content-center" :id="'pills-' + paramater"
    role="tabpanel">
    <div class="alert alert-warning w-100" role="alert" v-if="allTasks.length <= 0">
      There is no tasks yet.
    </div>
    <div class="card mb-4 ms-3 me-3" v-else v-for="(item, index) in allTasks" :key="index">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <input type="checkbox" name="" id="" class="check-box" @click="makeDoneTask(item)" :checked="item.isDone" />
          <h5 class="card-title d-flex justify-content-between">
            <span class="title-color" :class="{ completed: item.isDone }">({{ index + 1 }}) - {{ item.title }}</span>
          </h5>

          <div class="dropdown">
            <i class="bi bi-three-dots-vertical card-dots" id="dropdownMenuButton1" data-bs-toggle="dropdown"
              aria-expanded="false"></i>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editTask"
                  @click="editTask(item)">Edit</a>
              </li>
              <li>
                <a class="dropdown-item" @click="deleteItem(item)">Delete</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="card-bottom" @click="makeDoneTask(item)">
          <p class="card-text" :class="{ completed: item.isDone }">
            {{ item.description }}
          </p>
          <div class="tags d-flex justify-content-center">
            <p class="tag-project me-3" v-if="item.tags.Project" :class="{ completed: item.isDone }">
              Project
            </p>
            <p class="tag-personal me-3" v-if="item.tags.Personal" :class="{ completed: item.isDone }">
              Personal
            </p>
            <p class="tag-urgent me-3" v-if="item.tags.Urgent" :class="{ completed: item.isDone }">
              Urgent
            </p>
            <p class="tag-list me-3" v-if="item.tags.List" :class="{ completed: item.isDone }">
              List
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <edit-task :task="selectedTask"></edit-task>
</template>

<script>
import { ref, onMounted, computed ,inject} from "vue";
import { db, makeDone, deleteTask } from "@/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import EditTask from "./EditTask.vue";
export default {
  components: {
    EditTask,
  },
  props: ["param"],

  setup(props) {
    const paramater = computed(() => props.param);
    const checked = ref(false);
    const allTasks = ref([]);
    const selectedTask = ref({});
     const toast = inject("WKToast");

    const getAllTasks = () => {
      //set the query to get tasks for the correct tabs
      onSnapshot(query(collection(db, "tasks"), paramater.value == "all" ? where("title", "!=", null) : paramater.value == "doned" ? where("isDone", "==", true) : where("isDone", "==", false)), (querySnapshot) => {
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
    const editTask = (e) => {
      const tagArry = ref([]);
      for (const [key, value] of Object.entries(e.tags)) {
        tagArry.value.push({ key, value, label: key });
      } //for multiselect component to work. Changing obj to array
      selectedTask.value = e;
      selectedTask.value.tags = tagArry.value
      getAllTasks(); // bcs of keep the tags map like in the begining 
    };

    const makeDoneTask = (task) => {
      makeDone(task);
    };

    const deleteItem = (task) => {
      deleteTask(task).then(() => {
        toast("Task Successfully Deleted" );
      }).catch(error => {
         toast(error ,{
        className: 'wk-alert'
        });
      });;
    };

    onMounted(() => {
      getAllTasks();
    });

    return {
      checked,
      allTasks,
      selectedTask,
      makeDoneTask,
      deleteItem,
      editTask,
      paramater
    };
  },
};
</script>

<style>
</style>
