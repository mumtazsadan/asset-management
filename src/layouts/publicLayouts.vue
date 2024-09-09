<template>
  <v-app>
    <!-- header -->
    <headerComp />
    <!-- main content -->
    <v-container style="min-height: 100vh" class="my-10">
      <RouterView />
    </v-container>
    <!-- footer -->
    <footerComp />
  </v-app>
</template>

<script setup>
import headerComp from '../components/public/headerComp.vue'
import footerComp from '../components/public/footerComp.vue'
</script>
