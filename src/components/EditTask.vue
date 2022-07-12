<template>
  <div
    class="modal fade"
    id="editTask"
    tabindex="-1"
    aria-labelledby="newTaskLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newTaskLabel">Edit Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="d-flex flex-column" >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Task Title</label
              >
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                v-model="Task.title"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Task Description</label
              >
              <textarea
                class="form-control"
                aria-label="With textarea"
                v-model="Task.description"
              ></textarea>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="isDoneChecked"
                :checked="Task.isDone"
                v-model="Task.isDone"
              />
              <label class="form-check-label" for="isDoneChecked">
                Is Done?
              </label>
            </div>
            <div class="mb-3">
              <label class="form-check-label" for="isDoneChecked"> Tags </label>
              <Multiselect
                v-model="Task.tags"
                :options="tagsOptions"
                :close-on-select="true"
                :searchable="true"
                :create-option="false"
                placeholder="Tags"
                :object="true"
                mode="tags"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="onSubmit()"
            >
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
import { editTask } from "@/firebase";
import Multiselect from "@vueform/multiselect";

export default {
  props: ["task"],
  components: {
    Multiselect,
  },

  setup(props) {
    const Task = computed(() => props.task);
    const changedTask= ref({});
    changedTask.value = Task.value;
    
    const onSubmit = () => {
      console.log(changedTask.value);
      console.log(Task.value);
      console.log("submit calıstı");
      var tagMap = Task.value.tags.reduce(function (map, obj) {
        map[obj.key] = obj.value;
        return map;
      }, {});
      Task.tags = tagMap; // array to map for list them correctly
      console.log(Task.value);
      editTask(Task);
    };

    const tagsOptions = ref([
      { key: "Project", value: "Project", label: "Project" },
      { key: "Personal", value: "Personal", label: "Personal" },
      { key: "Urgent", value: "Urgent", label: "Urgent" },
      { key: "List", value: "List", label: "List" },
    ]);
    const deneme=ref()
    return {
      Task,
      tagsOptions,
      onSubmit,
      deneme
    };
  },
};
</script>

<style></style>
