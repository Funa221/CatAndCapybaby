<script setup lang="ts">
import { ref } from 'vue';
const roundNum1 = ref<string>('這裡會隨機出現1~13數字');

function pushbutton() {
    var randomNumber = (Math.floor(Math.random() * 13) + 1).toString();
    roundNum1.value = randomNumber;
};

</script>

<template>
    <!-- 內容寫裡面 -->
    <section class="flex justify-center items-center p-3">
        <div class="w-[100%]">
            <div class="p-3">
                {{ roundNum1 }}
            </div>
            <button
                class="text-center p-2 w-[20%] lg:w-[13%] rounded-[13px] bg-[#f3c0c0] hover:bg-[#dab8b8] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)] text-[#2e2a3f]"
                @click="pushbutton()">按我</button>
        </div>
    </section>
</template>

<style scoped></style>
