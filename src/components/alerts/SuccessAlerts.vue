<script setup lang="ts">
import { useSuccessAlertStore } from '@/stores/successAlert';
import { computed } from 'vue';

const successAlertStore = useSuccessAlertStore();
const successTips = computed(() => successAlertStore.tips);
</script>

<template>
  <div class="SuccessAlerts fixed w-[80%] lg:w-[20%] top-[280px] left-1/2 -translate-x-1/2 z-[999]">
    <transition-group name="list" tag="ul">
      <div id="alert-additional-content-2"
        class="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400 dark:border-green-800"
        role="alert" v-for="item in successTips" :key="item.id">
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <h3 class="text-xl font-bold">成功</h3>
        </div>
        <div class="mt-2 mb-4 text-md text-center">{{ item.msg }}</div>
      </div>
    </transition-group>
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
