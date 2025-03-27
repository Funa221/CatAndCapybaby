<script setup lang="ts">
import { useLoadingAlertStore } from '@/stores/loadingAlert';
import { computed } from 'vue';

const LoadingAlertStore = useLoadingAlertStore();
const isLoading = computed(() => LoadingAlertStore.isLoading);
</script>

<template>
  <div v-if="isLoading"
    class="LoadingAlerts fixed top-0 left-0 bg-[#0000005e] h-full w-full z-[997] flex items-center justify-center">
    <div
      class="p-4 w-[80%] lg:w-[20%] text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-400">
      <div class="flex items-center justify-center">
        <svg class="w-6 h-6 me-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 18a8.5 8.5 0 1 1 8.5-8.5A8.5 8.5 0 0 1 10 18Z" />
        </svg>
        <h3 class="text-xl font-bold">Loading...</h3>
      </div>
      <div class="mt-2 text-center text-md text-gray-500 dark:text-gray-400">正在讀取中...</div>
    </div>
  </div>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
