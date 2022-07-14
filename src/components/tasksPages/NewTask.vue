<template>
  <div class="modal fade" id="newTask" tabindex="-1" aria-labelledby="newTaskLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newTaskLabel">Add New Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="d-flex flex-column" @submit.prevent="onSubmit()">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Task Title *</label>
              <input type="text" class="form-control" aria-describedby="emailHelp" v-model="taskDetails.title" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Task Description *</label>
              <textarea class="form-control" aria-label="With textarea" v-model="taskDetails.description"></textarea>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" v-model="taskDetails.isDone" id="isDoneChecked" />
              <label class="form-check-label" for="isDoneChecked">
                Is Done?
              </label>
            </div>

            <div class="mb-3">
              <label class="form-check-label" for="isDoneChecked"> Tags </label>
              <Multiselect v-model="taskDetails.tags" :options="tagsOptions" :close-on-select="true" :searchable="true"
                :create-option="false" placeholder="Tags" :object="true" mode="tags" />
            </div>

            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref,inject } from "vue";
import { addTask } from "@/firebase";
import Multiselect from "@vueform/multiselect";
export default {
  components: {
    Multiselect,
  },
  setup() {
     const toast = inject("WKToast");

    const taskDetails = reactive({
      title: "",
      description: "",
      isDone: false,
      tags: [],
    });
    const tagsOptions = ref([
      { key: "Project", value: "Project", label: "Project" },
      { key: "Personal", value: "Personal", label: "Personal" },
      { key: "Urgent", value: "Urgent", label: "Urgent" },
      { key: "List", value: "List", label: "List" },
    ]);
    const onSubmit = async () => {
      if (taskDetails.title.length > 0 && taskDetails.description.length > 0) {
        var tagMap = taskDetails.tags.reduce(function (map, obj) {
          map[obj.key] = obj.value;
          return map;
        }, {});
        taskDetails.tags = tagMap;  // array to map for list correctly handling
        addTask({ ...taskDetails }).then(() => {
          toast("Task Added Successfully");
        }).catch(error => {
          toast(error,{
        className: 'wk-alert'
        });
        });
        taskDetails.title = "";
        taskDetails.description = "";
        taskDetails.isDone = false;
        taskDetails.tags = [];
      } else {
        toast("Please Fill All The Fields",{
        className: 'wk-alert'
        });
        taskDetails.tags = [];
      }
    };

    return {
      onSubmit,
      taskDetails,
      tagsOptions,
    };
  },
};
</script>

<style>
</style>
