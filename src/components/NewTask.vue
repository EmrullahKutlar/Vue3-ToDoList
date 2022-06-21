<template>
  <div
    class="modal fade"
    id="newTask"
    tabindex="-1"
    aria-labelledby="newTaskLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newTaskLabel">Add New Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="d-flex flex-column" @submit.prevent="onSubmit()">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Task Title</label
              >
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                v-model="taskDetails.title"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Task Description</label
              >
              <textarea
                class="form-control"
                aria-label="With textarea"
                v-model="taskDetails.description"
              ></textarea>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="taskDetails.isDone"
                id="isDoneChecked"
              />
              <label class="form-check-label" for="isDoneChecked">
                Is Done?
              </label>
            </div>
            <button type="submit" class="btn btn-primary"  data-bs-dismiss="modal"
            aria-label="Close">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import {addTask} from "@/firebase";

export default {
  setup() {
    const taskDetails = reactive({
      title: "",
      description: "",
      isDone: false,
    });

    const onSubmit = async () => {
      if(taskDetails.title.length >0 && taskDetails.description.length >0){
        addTask({...taskDetails})
      taskDetails.title = "";
      taskDetails.description = "";
      taskDetails.isDone = false;
      }
      else{
        alert("Please fill all the fields");
      }
    };
    
    return {
      onSubmit,
      taskDetails,
    };
  },
};
</script>

<style></style>
