<template>
  <div class="modal fade" id="forgotPassword" tabindex="-1" aria-labelledby="forgotPasswordLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="forgotPasswordLabel">Forgot Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card d-flex justify-content-center p-4">
        <FormKit type="form" id="forgotPass" :form-class="submitted ? 'hide' : 'show'" submit-label="forgotPass"
          @submit="sumbitPassForgot" :actions="false">
          <FormKit type="text" name="email" label="Your email" placeholder="jane@example.com"
            validation="required|email" />

          <FormKit type="submit" label="Send Email" />
        </FormKit>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
setup() {
    const store = useStore()
    const submitted = ref(false)
    const sumbitPassForgot = async (forgotPassForm) => {
      // Let's pretend this is an ajax request:
      await new Promise((r) => setTimeout(r, 1000))
      console.log(forgotPassForm);
      store.dispatch('sendPasswordReset', forgotPassForm)
      submitted.value = true
    }
    return {
      submitted,
      sumbitPassForgot
    }
  }
}
</script>

<style>

</style>