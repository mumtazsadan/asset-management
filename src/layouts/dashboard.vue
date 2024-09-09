<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
    <!-- sidebar -->
    <sidebar v-model="drawer" />
    <!-- navbar -->
    <navbar @open="drawerFunc" />
    <!-- main -->
    <RouterView />
  </v-layout>
</template>
<script setup>
import sidebar from '../components/sidebar.vue'
import navbar from '../components/navbar.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const drawer = ref(true)

const drawerFunc = () => {
  drawer.value = !drawer.value
}
</script>
