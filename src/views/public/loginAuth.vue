<template>
  <formAuth :isLogin="isLogin" />
</template>

<script setup>
import formAuth from '../../components/public/formAuth.vue'

const isLogin = true
</script>
