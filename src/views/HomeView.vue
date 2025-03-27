<script setup>
import { onBeforeMount } from "vue"
import { useRouter, useRoute } from "vue-router"
import Main from '../components/Main.vue'

const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  if (route.path === "/") {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <Main />
</template>

<style scoped></style>
