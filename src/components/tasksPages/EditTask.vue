<template>
  <div class="modal fade" id="editTask" tabindex="-1" aria-labelledby="newTaskLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newTaskLabel">Edit Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="d-flex flex-column">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Task Title</label>
              <input type="text" class="form-control" aria-describedby="emailHelp" v-model="Task.title" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Task Description</label>
              <textarea class="form-control" aria-label="With textarea" v-model="Task.description"></textarea>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="isDoneChecked" :checked="Task.isDone"
                v-model="Task.isDone" />
              <label class="form-check-label" for="isDoneChecked">
                Is Done?
              </label>
            </div>
            <div class="mb-3">
              <label class="form-check-label" for="isDoneChecked"> Tags </label>
              <Multiselect v-model="Task.tags" :options="tagsOptions" :close-on-select="true" :searchable="true"
                :create-option="false" placeholder="Tags" :object="true" mode="tags" />
            </div>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"
              @click.prevent="onSubmit()">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Multiselect from "@vueform/multiselect";
import { useStore } from "vuex";

export default {
  props: ["task","param"],
  components: {
    Multiselect,
  },

  setup(props) {
    const Task = computed(() => props.task);
    const paramater = computed(() => props.param);
    const store = useStore();


    const onSubmit = () => {
      var tagMap = Task.value.tags.reduce(function (map, obj) {
        map[obj.key] = obj.value;
        return map;
      }, {});
      // array to map for list them correctly
      var newTask = {
        id: Task.value.id,
        title: Task.value.title,
        description: Task.value.description,
        isDone: Task.value.isDone,
        tags: tagMap,
      }
      // we cant change the value of computed variable so we need to create a new one
        store.dispatch("updateTasks", newTask);
        store.dispatch("getTasks", paramater);

    };

    const tagsOptions = ref([
      { key: "Project", value: "Project", label: "Project" },
      { key: "Personal", value: "Personal", label: "Personal" },
      { key: "Urgent", value: "Urgent", label: "Urgent" },
      { key: "List", value: "List", label: "List" },
    ]);
    return {
      Task,
      tagsOptions,
      onSubmit,
    };
  },
};
</script>

<style>
</style>
