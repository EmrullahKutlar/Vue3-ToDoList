<template>
  <div class="container d-flex justify-content-center mt-3">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-all-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-all"
          type="button"
          role="tab"
          aria-controls="pills-all"
          aria-selected="true"
          @click="activeTab = 'AllTasks'"
        >
          All Tasks
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-active-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-active"
          type="button"
          role="tab"
          aria-controls="pills-active"
          aria-selected="false"
           @click="activeTab = 'ActiveTasks'"
        >
          Active
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link me-3"
          id="pills-doned-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-doned"
          type="button"
          role="tab"
          aria-controls="pills-doned"
          aria-selected="false"
          @click="activeTab = 'DonedTasks'"
        >
          Doned
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#newTask">New Task</button>
      </li>
    </ul>
  </div>
  <div class="container d-flex justify-content-center mt-3">
    <div class="tab-content" id="pills-tabContent">
        <transition name="fade" mode="out-in">
        <component :is="activeTab"/>
        </transition>
    </div>
  </div>
  <new-task/>
</template>

<script>
import AllTasks from "./AllTasks.vue"
import ActiveTasks from "./ActiveTasks.vue"
import DonedTasks from "./DonedTasks.vue"
import { ref } from "vue";
import NewTask from './NewTask.vue';
export default {
    components:{
        AllTasks,
        ActiveTasks,
        DonedTasks,
        NewTask
    },
  setup() {
    const activeTab=ref("AllTasks");
    return {
      activeTab
    };
  },
};
</script>

<style></style>
