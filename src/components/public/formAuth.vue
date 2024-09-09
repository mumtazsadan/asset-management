<template>
  <div>
    <div class="mx-auto my-6 text-center text-h3 font-weight-bold">
      {{ isLogin ? 'Login' : 'Register' }}
    </div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-form v-model="formInput" @submit.prevent="handleSubmit">
        <v-alert
          v-if="isError"
          type="error"
          title="Error"
          :text="message"
          variant="tonal"
        ></v-alert>
        <div v-if="!isLogin">
          <div class="text-subtitle-1 text-medium-emphasis">Name</div>
          <v-text-field
            density="compact"
            placeholder="Username"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            v-model="user.name"
            :rules="nameRules"
          ></v-text-field>
        </div>
        <div class="text-subtitle-1 text-medium-emphasis">Username</div>
        <v-text-field
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="nameRules"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Password</div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :rules="[passwordRules.required, passwordRules.min]"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn type="submit" class="mb-8" size="large" variant="tonal" block :disabled="!formInput">
          {{ isLogin ? 'Login' : 'Register' }}
        </v-btn>
      </v-form>

      <v-card-text class="text-center" v-if="isLogin">
        <router-link
          class="text-decoration-none"
          :to="{ name: 'Register' }"
          rel="noopener noreferrer"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>

      <v-card-text class="text-center" v-else>
        <router-link class="text-decoration-none" :to="{ name: 'Login' }" rel="noopener noreferrer">
          Login now <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useAuthStores } from '../../stores/authStores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isLogin = ref(true)
// store
// const authStore = useAuthStores()

// state
// const { formInput, user, isError, message } = storeToRefs(authStore)

const formInput = ref({
  name: '',
  email: '',
  password: ''
})

//validation
const nameRules = [
  (value) => {
    if (value) return true
    return 'Nama harus diisi'
  }
]

const handleSubmit = () => {
  router.push({ path: '/dashboard' })
}

// const handleSubmit = async () => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/users/login', {
//       username: username.value,
//       password: password.value
//     })
//     localStorage.setItem('token', response.data.token)
//     router.push('/dashboard')
//   } catch (error) {
//     if (error.response && error.response.data) {
//       errorMessage.value = error.response.data.message
//     } else {
//       errorMessage.value = 'An error occurred. Please try again.'
//     }
//   }
// }

const emailRules = [
  (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail harus valid'
]

const passwordRules = {
  required: (value) => !!value || 'Password harus diisi',
  min: (value) => value.length >= 6 || 'Password minimal 6 karakter'
}

//action
// const { authUser } = authStore

const visible = ref(false)

defineProps({
  isLogin: {
    type: Boolean,
    default: true
  }
})

//rules
// :rules="emailRules"
// :rules="[passwordRules.required, passwordRules.min]"
// :rules="nameRules"

//logic login
// <v-form v-model="formInput" @submit.prevent="isLogin ? authUser(true) : authUser()">

//email
// v-model="user.email"

//password
// v-model="user.password"
</script>
