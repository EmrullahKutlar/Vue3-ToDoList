<template>
  <div class="container d-flex justify-content-center mt-3">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all"
          type="button" role="tab" aria-controls="pills-all" aria-selected="true" @click="activeTab = 'AllTasks'">
          All Tasks
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-active-tab" data-bs-toggle="pill" data-bs-target="#pills-active"
          type="button" role="tab" aria-controls="pills-active" aria-selected="false"
          @click="activeTab = 'ActiveTasks'">
          Active
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link me-3" id="pills-doned-tab" data-bs-toggle="pill" data-bs-target="#pills-doned"
          type="button" role="tab" aria-controls="pills-doned" aria-selected="false" @click="activeTab = 'DonedTasks'">
          Doned
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#newTask">New
          Task</button>
      </li>
    </ul>
  </div>
  <div class="container d-flex justify-content-center mt-3">
    <Transition  name="fade" mode="out-in">
      <div class="tab-content" id="pills-tabContent" :key="activeTab">
        <component :is="activeTab" />
      </div>
    </Transition>
  </div>
  <new-task />
</template>

<script>
import AllTasks from "../tasksPages/AllTasks.vue"
import ActiveTasks from "../tasksPages/ActiveTasks.vue"
import DonedTasks from "../tasksPages/DonedTasks.vue"
import { ref } from "vue";
import NewTask from '../tasksPages/NewTask.vue';
export default {
  components: {
    AllTasks,
    ActiveTasks,
    DonedTasks,
    NewTask,
  },
  setup() {
    const activeTab = ref("AllTasks");
    return {
      activeTab
    };
  },
};
</script>

<style>
</style>
