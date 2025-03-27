<script setup>
import { useStore } from '../../stores/stores.ts'

import { reactive } from 'vue';

import MemberListView from '../contentmore/member/MemberListView.vue'

const SideItem = reactive([
    {
        name: "個人資訊",
        route: "",
    },
    {
        name: "好友名單",
        route: "",
    },
    {
        name: "訊息通知",
        route: "",
    },
    {
        name: "聊天室",
        route: "",
    },
]);

const SideBar = useStore();

// 點選左邊分頁時給數字進行顯示
const openSideBarNum = (index) => {
    SideBar.setSelectedPage(index);
};

</script>

<template>
    <!-- 內容寫裡面 -->
    <section class="min-h-[77vh]">

        <div class="text-[22px] md:grid grid-cols-12 ps-5 pe-5 md:p-5">


            <!-- 左邊內容顯示 -->
            <div class="grid col-span-12 md:col-span-6 md:col-start-4 bg-[#ffffff] text-center rounded-[20px]">
                <MemberListView v-if="SideBar.SelectedPage == 1">
                </MemberListView>
            </div>

            <!-- 右內容顯示 -->
            <div
                class="md:grid md:col-span-2 flex justify-between md:justify-center items-center md:h-[200px] m-3 gap-5">
                <button
                    class="bg-[#ffffff] hover:bg-[#cbd1cb] text-[#403426] text-center rounded-[20px] p-3 text-[16px] lg:text-[18px] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)]"
                    v-for="(item, index) in SideItems" :key="(SideItems)" @click="openSideBarNum(index + 1)">
                    {{ item.name }}
                </button>
            </div>

        </div>

    </section>

</template>

<style scoped></style>
