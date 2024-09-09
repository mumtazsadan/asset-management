<template>
  <v-main :style="{ backgroundColor: '#E5E7EB' }" style="height: 100vh">
    <v-container style="height: auto">
      <div class="pt-6 pb-3 px-6">
        <v-icon class="mb-1 mdi mdi-account-outline mdi-24px"></v-icon>
        <span class="ml-2 text-h5">My Profile</span>
      </div>
      <v-container>
        <v-card flat class="px-6 py-6 mx-auto" rounded="sm" ref="form">
          <div class="my-2">
            <v-icon class="mdi mdi-account-outline mdi-24px mb-1"></v-icon>
            <span class="ml-4 text-h7 font-weight-bold align-center mt-2">User Info.</span>
            <div class="justtify-space-between justify-center">
              <div class="d-flex my-5 mx-auto flex-wrap w-75">
                <div class="flex justify-end w-33">
                  <span class="flex text-h8 align-center font-weight-regular mx-10" required
                    >Firstname</span
                  >
                </div>
                <v-text-field
                  class="flex my-auto justify-space-between"
                  v-model="firstname"
                  label="Firstname"
                  variant="outlined"
                  hide-details
                  density="compact"
                  :rules="[() => !!firstname || 'This field is required']"
                  :error-messages="firsterror"
                  required
                ></v-text-field>
              </div>
              <div class="d-flex my-5 justify-space-between mx-auto w-75">
                <div class="flex justify-end w-33">
                  <span class="flex text-h8 mx-10 align-center font-weight-regular">Lastname</span>
                </div>
                <v-text-field
                  class="flex my-auto justify-center"
                  v-model="lastname"
                  label="Lastname"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :rules="[() => !!lastname || 'This field is required']"
                  :error-messages="lasterror"
                  required
                ></v-text-field>
              </div>
              <div class="d-flex my-5 justify-space-between mx-auto w-75">
                <div class="flex justify-end w-33">
                  <span class="flex text-h8 mx-10 align-center font-weight-regular">Title</span>
                </div>
                <v-text-field
                  class="flex my-auto justify-center"
                  label="Title"
                  variant="outlined"
                  density="compact"
                  hide-details
                ></v-text-field>
              </div>
              <div class="d-flex my-5 justify-space-between mx-auto w-75">
                <div class="flex w-33 justify-end">
                  <span class="flex mx-10 text-h8 align-center font-weight-regular">Phone</span>
                </div>
                <v-text-field
                  class="flex my-auto justify-center"
                  label="Phone"
                  variant="outlined"
                  density="compact"
                  hide-details
                ></v-text-field>
              </div>
              <div class="d-flex my-5 justify-space-between mx-auto w-75">
                <div class="flex w-33 justify-end">
                  <span class="flex mx-10 text-h8 align-center font-weight-regular">Email</span>
                </div>
                <v-text-field
                  class="flex my-auto justify-center"
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :rules="[() => !!email || 'This field is required']"
                  :error-messages="emailerror"
                  required
                ></v-text-field>
              </div>
              <div class="d-flex my-5 justify-space-between mx-auto w-75">
                <div class="flex w-33 justify-end">
                  <span class="flex text-h8 align-center font-weight-regular mx-10"
                    >Confirm Email</span
                  >
                </div>
                <v-text-field
                  class="flex my-auto justify-center"
                  v-model="confirmEmail"
                  label="Confirm Email"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :rules="[() => !!confirmEmail || 'This field is required']"
                  :error-messages="confirmerror"
                  required
                ></v-text-field>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="my-2">
            <v-icon class="mdi mdi-image mdi-24px mb-1"></v-icon>
            <span class="ml-4 text-h7 font-weight-bold align-center mt-2">User Photo.</span>
            <div class="">
              <span class="flex ml-8 my-2"
                >Upload a photo to set yourself apart form the crowd.</span
              >
              <v-card-text class="flex justify-center">
                <v-form style="width: 300px" @submit.prevent="handlingUploadFile(data)">
                  <div>
                    <p style="color: red">{{ fileError }}</p>
                  </div>
                  <v-file-input
                    label="File Input Image"
                    variant="filled"
                    prepend-icon="mdi-camera"
                    @change="handlingChange"
                  ></v-file-input>
                  <v-btn
                    type="submit"
                    :disabled="fileError || !formInput"
                    block
                    class="my-2"
                    color="black"
                    size="large"
                    variant="tonal"
                    >Upload File</v-btn
                  >
                </v-form>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const confirmEmail = ref('')

const form = computed(() => {
  return {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    confirmEmail: confirmEmail.value
  }
})

watch(firstname, lastname, email, confirmEmail, () => {
  firsterror.value = ''
  lasterror.value = ''
  emailerror.value = ''
  confirmerror.value = ''
})

const firsterror = computed(() => {
  return firstname.value ? '' : 'This field is required'
})

const lasterror = computed(() => {
  return lastname.value ? '' : 'This field is required'
})

const emailerror = computed(() => {
  return email.value ? '' : 'This field is required'
})

const confirmerror = computed(() => {
  return confirmEmail.value ? '' : 'This field is required'
})

//router

//upload image

const formInput = ref(null)
const fileError = ref(null)

const types = ['image/png', 'image/jpg', 'image/jpeg']

defineProps({
  data: {
    type: Object,
    required: false
  },
  isUpdate: {
    type: Boolean,
    default: false
  }
})
</script>
