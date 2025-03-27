<script setup lang="ts">
import { ref } from 'vue';
const roundNum1 = ref<string>('');


</script>

<template>
    <!-- 內容寫裡面 -->
    <section class="flex justify-center items-center p-3">
        <div class="w-[100%]">
            <div class="p-3">
                名稱：{{ roundNum1 }}
            </div>
        </div>
    </section>
</template>

<style scoped></style>
