<template>
  <div class="container-fuild">
    <nav class="navbar d-flex">
      <div class="space"></div>
      <div class="d-flex justify-content-center">
        <i class="bi bi-check2-square"></i>
        <a class="navbar-brand">To Do List</a>
      </div>
      <div class="user-content" v-if="$store.state.isAuthenticated">
        <button class="btn btn-danger" @click="logout"> logout</button>
      </div>
      <div class="space" v-if="!$store.state.isAuthenticated"></div>
    </nav>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const logout = () => {
      store.dispatch('logout')
    }
    return {
      logout
    }

  }
}
</script>

<style>
</style>