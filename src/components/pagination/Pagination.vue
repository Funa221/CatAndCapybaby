<script lang="ts">
import { computed, ref } from "vue";

export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 20,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
    modelValue: {
      type: Number,
      default: 1, // Current page
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const currentPage = ref(props.modelValue);

    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / props.itemsPerPage);
    });

    const visiblePages = computed(() => {
      const half = Math.floor(props.maxVisiblePages / 2);
      let start = currentPage.value - half;
      let end = currentPage.value + half;
      if (start < 1) {
        start = 1;
        end = Math.min(props.maxVisiblePages, totalPages.value);
      }
      if (end > totalPages.value) {
        start = Math.max(totalPages.value - props.maxVisiblePages + 1, 1);
        end = totalPages.value;
      }
      return Array.from({ length: end - start + 1 }, (_, i) => i + start);
    });

    const changePage = (page: any) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        emit("update:modelValue", page);
      }
    };

    return {
      currentPage,
      totalPages,
      visiblePages,
      changePage,
    };
  },
};
</script>

<template>
  <div class="flex justify-center mt-4" v-if="totalPages > 1">
    <!-- Previous Button -->
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
      class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      :class="{ 'bg-gray-500 text-white': currentPage === 1 }">
      <span class="sr-only">Previous</span>
      <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
      </svg>
    </button>

    <!-- Page Buttons -->
    <button v-for="page in visiblePages" :key="page" @click="changePage(page)" :class="{
      'bg-blue-500 dark:bg-slate-600 text-white': currentPage === page,
      'bg-white border-gray-300': currentPage !== page,
      'hover:bg-gray-100 hover:text-gray-700': currentPage !== page
    }"
      class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      {{ page }}
    </button>

    <!-- Next Button -->
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      :class="{ 'bg-gray-500 text-white': currentPage === totalPages }">
      <span class="sr-only">Next</span>
      <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
      </svg>
    </button>
  </div>
</template>
