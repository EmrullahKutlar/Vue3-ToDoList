<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="col-12 header d-flex justify-content-center">
                    <h3 class="form-Header mt-4"> Account Settings</h3>
                </div>
                <div class="col-12  d-flex justify-content-center   mt-3">
                    <div class="w-100 card p-5">
                        <div class="d-flex justify-content-center">
                            <ul class="nav nav-pills mb-4" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active " id="pills-general-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-general" type="button" role="tab" aria-controls="pills-general"
                                        aria-selected="true">General</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-password-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-password" type="button" role="tab"
                                        aria-controls="pills-password" aria-selected="false">Password</button>
                                </li>

                            </ul>
                        </div>
                        <hr>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-general" role="tabpanel"
                                aria-labelledby="pills-general-tab">
                                <div class="d-flex justify-content-end">
                                    <i type="button" class="bi bi-pencil-square fs-3 form-Header"
                                        @click="disabled = !disabled"></i>
                                </div>
                                <div class="card d-flex justify-content-center p-3">
                                    <FormKit type="form" id="registration-example"
                                        :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
                                        @submit="updateGeneral" :actions="false" >
                                        <FormKit type="text" name="name" label="Your name" :disabled="disabled"
                                            :placeholder="user.displayName" validation="" />

                                        <FormKit type="text" name="email" label="Your email" :placeholder="user.email"
                                            validation="email" :disabled="disabled" />
                                        <FormKit type="submit" label="Save" :disabled="disabled" />
                                    </FormKit>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-password" role="tabpanel"
                                aria-labelledby="pills-password-tab">
                                <div class="card d-flex justify-content-center p-3">
                                    <FormKit type="form" id="Register" :form-class="submitted ? 'hide' : 'show'"
                                        submit-label="Register" @submit="updatePassword" :actions="false">
                                        
                                        <div class="double">
                                            <FormKit type="password" name="password" label="New Password"
                                                validation="required|length:6" placeholder="New Password" />
                                            <FormKit type="password" name="password_confirm" label="Confirm Password"
                                                placeholder="Confirm Password" validation="required|confirm" />
                                        </div>

                                        <FormKit type="submit" label="Save" />
                                    </FormKit>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const user = ref(null)
        const submitted = ref(false)
        const disabled = ref(true);
        user.value = store.getters.getUser;
        const updateGeneral = async (formValue) => {
            // Let's pretend this is an ajax request:
            await new Promise((r) => setTimeout(r, 1000))
            submitted.value = true
            store.dispatch('updateProfile', formValue)
        }
        const updatePassword = async (formValue) => {
            // Let's pretend this is an ajax request:
            await new Promise((r) => setTimeout(r, 1000))
            submitted.value = true
             store.dispatch('changePassword', formValue)
           
        }

        onMounted(() => {
        })
        return {
            user,
            submitted,
            disabled,
            updateGeneral,
            updatePassword
        }
    }
}
</script>

<style scoped>
.card {
    border-radius: 1.25rem !important;
    max-width: 500px !important;
}

.nav-link.active,
.nav-pills .show>.nav-link {
    color: #fff;
    background-color: #1ea8e7;
}
</style>