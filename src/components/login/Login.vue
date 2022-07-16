<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="card d-flex justify-content-center p-3">
        <FormKit type="form" id="Login" :form-class="submitted ? 'hide' : 'show'" submit-label="Login"
          @submit="submitHandler" :actions="false">
          <h3 class="text-center fs-2 fw-bold form-Header">Login</h3>
          <FormKit type="text" name="email" label="Your email" placeholder="jane@example.com"
            validation="required|email" />
          <FormKit type="password" name="password" label="Password" validation="required|length:6"
            placeholder="Your password" />

          <FormKit type="submit" label="Login" />
        </FormKit>
        <p role="button" class="fs-6 text-danger">
          Forgot password?
        </p>
        <p>
          Dont have an account?
          <span role="button" class="form-Header fs-6" @click="$router.push('/register')">
            Register
          </span>
        </p>
      </div>
    </div>
  </div>

</template>

<script >
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const submitted = ref(false)
    const submitHandler = async (loginForm) => {
      // Let's pretend this is an ajax request:
      await new Promise((r) => setTimeout(r, 1000))
      console.log(loginForm);
      store.dispatch('login', loginForm)
      submitted.value = true
    }
    return {
      submitted,
      submitHandler
    }
  }

}
</script>

<style>
</style>