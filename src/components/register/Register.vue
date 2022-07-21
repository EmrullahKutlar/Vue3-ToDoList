<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="card d-flex justify-content-center p-3">
                <FormKit type="form" id="Register" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
                    @submit="submitRegister" :actions="false">
                    <h3 class="text-center fs-2 fw-bold form-Header">Register</h3>
                    <FormKit type="text" name="displayName" label="Your name" placeholder="Emrullah Kutlar"
                        validation="required" />
                    <FormKit type="text" name="email" label="Your email" placeholder="E-mail@example.com"
                        validation="required|email" />
                    <div class="double">
                        <FormKit type="password" name="password" label="Password" validation="required|length:6"
                            placeholder="Your Password" />
                        <FormKit type="password" name="password_confirm" label="Confirm password"
                            placeholder="Confirm Password" validation="required|confirm" />
                    </div>

                    <FormKit type="submit" label="Register" />
                </FormKit>
                <p>
                    Do you already have an account?
                    <span role="button" class="form-Header fs-6" @click="$router.push('/login')">
                        Login
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const submitted = ref(false)
        const store = useStore()

        const submitRegister = async (formValue) => {
            // Let's pretend this is an ajax request:
            await new Promise((r) => setTimeout(r, 1000))
            store.dispatch('register', formValue)
            submitted.value = true
        }
        return {
            submitted,
            submitRegister
        }
    }

}


</script>
<style scoped>
.card {
    border-radius: 1.25rem !important;
    max-width: 400px !important;
    min-width: 300px
}
</style>