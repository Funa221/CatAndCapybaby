<script setup>
import MabinogiContent from '../contentmore/mabinogi/MabinogiContentView.vue'
import RoundNumView from '../contentmore/mabinogi/RoundNumView.vue'
import RoundItemsView from '../contentmore/mabinogi/RoundItemsView.vue'
import RoundEchstone from '../contentmore/mabinogi/RoundEchstone.vue'
import { useStore } from '../../stores/stores.ts'

import { reactive } from 'vue';

const SideItems = reactive([
    {
        name: "轉蛋試抽",
        route: "",
    },
    {
        name: "回音覺醒",
        route: "",
    },
    {
        name: "隨機數字",
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

            <!-- 左內容顯示 -->
            <div
                class="md:grid md:col-span-2 md:col-start-2 md:row-start-1 flex justify-between md:justify-center items-center md:h-[200px] m-3 gap-5">
                <button
                    class="bg-[#ffffff] hover:bg-[#cbd1cb] text-[#403426] text-center rounded-[20px] p-3 text-[16px] lg:text-[18px] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)]"
                    v-for="(item, index) in SideItems" :key="SideItems" @click="openSideBarNum(index + 1)">
                    {{ item.name }}
                </button>
            </div>

            <!-- 右邊內容顯示 -->
            <div class="grid col-span-12 md:col-span-6 bg-[#ffffff] text-center rounded-[20px]">
                <RoundItemsView v-if="SideBar.SelectedPage == 1">
                </RoundItemsView>
                <RoundEchstone v-if="SideBar.SelectedPage == 2">
                </RoundEchstone>
                <RoundNumView v-if="SideBar.SelectedPage == 3">
                </RoundNumView>
                <MabinogiContent v-if="SideBar.SelectedPage == 0">
                </MabinogiContent>
            </div>

        </div>


    </section>
</template>

<style scoped></style>
