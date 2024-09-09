<template>
  <div class="d-flex justify-center align-center text-center" style="height: 90vh">
    <div class="">
      <img :src="notfound" style="width: 40vh" />
      <h1>Page not found</h1>
      <v-btn color="variant" class="capitalize" block @click="back">Back</v-btn>
    </div>
  </div>
</template>
<script setup>
import notfound from '../../assets/foto/notfound.svg'
import { useRouter } from 'vue-router'
const router = useRouter()

const back = () => {
  router.back()
}
</script>
