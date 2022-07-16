<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from './components/general/Header.vue';
import Tabs from './components/general/Tabs.vue'
export default {
  components: { Header, Tabs  },

}
</script>

<style>

</style>