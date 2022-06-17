<template>
  <div
        class="tab-pane fade show active d-flex flex-wrap justify-content-center"
        id="pills-all"
        role="tabpanel"
      >
        <div class="card mb-4 me-3" v-for="i in 10" :key="i">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                name=""
                id=""
                class="check-box"
                @click="checked = !checked"
                :checked="checked"
              />
              <h5 class="card-title" :class="{ completed: checked }">
                Special title treatment
              </h5>

              <div class="dropdown">
                
                  <i class="bi bi-three-dots-vertical card-dots"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"></i>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Edit</a></li>
                  <li><a class="dropdown-item" href="#">Delete</a></li>
                </ul>
              </div>
            </div>
            <hr />
            <div class="card-bottom" @click="checked = !checked">
              <p class="card-text" :class="{ completed: checked }">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <div class="tags d-flex justify-content-center">
                <p class="tag-project me-3" :class="{ completed: checked }">
                  Project
                </p>
                <p class="tag-personal me-3" :class="{ completed: checked }">
                  Personal
                </p>
                <p class="tag-urgent me-3" :class="{ completed: checked }">
                  Urgent
                </p>
                <p class="tag-list me-3" :class="{ completed: checked }">
                  List
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import {ref} from 'vue';
export default {
setup() {
  const checked=ref(false)
  return{
    checked
  }
},
}
</script>

<style>

</style>