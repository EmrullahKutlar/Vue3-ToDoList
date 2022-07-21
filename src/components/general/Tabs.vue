<template>
  <div>
      <div class="container d-flex justify-content-center mt-3">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all"
              type="button" role="tab" aria-controls="pills-all" aria-selected="true" @click="setQuery('all')">
              ALL
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-active-tab" data-bs-toggle="pill" data-bs-target="#pills-active"
              type="button" role="tab" aria-controls="pills-active" aria-selected="false" @click="setQuery('active')">
              ACTIVE
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link me-3" id="pills-doned-tab" data-bs-toggle="pill" data-bs-target="#pills-doned"
              type="button" role="tab" aria-controls="pills-doned" aria-selected="false" @click="setQuery('doned')">
              DONE
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="btn btn-outline-success" type="button" data-bs-toggle="modal"
              data-bs-target="#newTask">NEW</button>
          </li>
        </ul>
      </div>
      <div class="container  d-flex justify-content-center mt-2">
        <div class="row col-12 d-flex justify-content-center">
          <div class="col-12 col-sm-12 col-md-6 col-lg-4">
            <div class="input-group mb-3 ">
              <input type="text" placeholder="Search" v-model="searchValue" class="form-control" @keyup="search(searchValue)">
              <div class="input-group-append"><button class="btn btn-primary btn-search"><i class="bi bi-search"></i></button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="container d-flex justify-content-center mt-3">
        <Transition name="fade" mode="out-in">
          <div class="tab-content" id="pills-tabContent" :key="query">
            <AllTasks :param="query" />
          </div>
        </Transition>
      </div>
  </div>

  <new-task />
</template>

<script>
import AllTasks from "../tasksPages/Tasks.vue"
import { ref } from "vue";
import NewTask from '../tasksPages/NewTask.vue';
import { useStore } from 'vuex';
export default {
  components: {
    AllTasks,
    NewTask,
  },
  setup() {
    const store = useStore();
    const query = ref("all");
    const setQuery = (param) => {
      query.value = param;
    };
    const searchValue = ref("");
    const search = (value) => {
     store.dispatch("searchTasks", value);
    };
    return {
      setQuery,
      search,
      query,
      searchValue
    };
  },
};
</script>

<style>
</style>
