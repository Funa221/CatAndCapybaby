<template>
  <div class="xl:p-6 xxl:p-0">
    <!-- 切換按鈕 -->
    <div class="mt-5 lg:mt-0">
      {{ isDarkMode ? '暗色模式' : '亮色模式' }}
    </div>
    <div class="flex justify-center">
      <Switch v-model="isDarkMode"
        class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        :class="isDarkMode ? 'bg-gray-900' : 'bg-gray-300'">
        <span aria-hidden="true"
          class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
          :class="isDarkMode ? 'translate-x-9' : 'translate-x-0'"></span>
      </Switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Switch } from '@headlessui/vue';

const isDarkMode = ref(false);

// 暗色模式切換邏輯
const toggleDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark'); // 啟用暗色模式
    localStorage.setItem('theme', 'dark'); // 保存用戶選擇
  } else {
    document.documentElement.classList.remove('dark'); // 啟用亮色模式
    localStorage.setItem('theme', 'light'); // 保存用戶選擇
  }
};

// 初始化
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDarkMode.value = true;
  }
  toggleDarkMode(); // 確保初始化同步樣式
});

// 監聽 isDarkMode 的變化
watch(isDarkMode, toggleDarkMode);
</script>


<style></style>
