<template>
  <div class="container-fuild">
    <nav class="navbar d-flex">
      <div class="space" v-if="!$store.getters.isAuthenticated"></div>
      <div class="d-flex justify-content-center">
        <i class="bi bi-check2-square"></i>
        <router-link class="navbar-brand" to="/" >To Do List</router-link>
      </div>
      <div class="user-content" v-if="$store.getters.isAuthenticated">
        <div class="dropdown ">
          <button class="btn user-btn btn-light dropdown-toggle " type="button" id="userDropdown"
            data-bs-toggle="dropdown" aria-expanded="false">
           <i class="bi bi-person-fill me-2 fs-5"></i>
           <span class="profile-text">{{userName}}</span> 
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown"> 
            <li ><button class="dropdown-item "  @click="$router.push('/account')"> <i class="bi bi-sliders2 me-2"></i>Settings</button></li>
            <li ><button class="dropdown-item text-danger" @click="logout" > <i class="bi bi-box-arrow-left me-2"></i>Logout</button></li>
          </ul>
        </div>
      </div>
      <div class="space" v-if="!$store.getters.isAuthenticated"></div>
    </nav>
  </div>
</template>

<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const userName=computed(()=>{
      return useStore().getters.getUserName
    })
    const store = useStore()
    const logout = () => {
      store.dispatch('logout')
    }
    return {
      logout,userName
    }

  }
}
</script>

<style scoped>
.user-btn{
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 430px) {
  .profile-text{
display: none;
}
}

</style>