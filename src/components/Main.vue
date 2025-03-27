<script setup>
import { RouterView } from "vue-router";
import Mainheader from './header/Mainheader.vue';
import Mainfooter from './footer/Mainfooter.vue';
import ErrorAlerts from './alerts/ErrorAlerts.vue';
import SuccessAlerts from "./alerts/SuccessAlerts.vue";
import LoadingAlerts from "./alerts/LoadingAlerts.vue";
import MessagesAlerts from "./alerts/MessagesAlerts.vue";
</script>

<template>
  <!-- 可任意更改背景顏色，也可放置圖片。 -->
  <div class="relative min-h-[100dvh] bg-slate-100">
    <Mainheader />
    <RouterView />
    <Mainfooter />
  </div>

  <!-- 自訂警報視窗 -->
  <ErrorAlerts />
  <SuccessAlerts />
  <LoadingAlerts />
  <MessagesAlerts />

</template>

<style scoped></style>
