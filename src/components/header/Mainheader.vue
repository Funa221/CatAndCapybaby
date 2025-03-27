<script setup>
import { useStore } from '../../stores/stores';

import { reactive, watch } from 'vue';

const SideBar = useStore();

const openMenu = () => {
    SideBar.isMenuOpen = !SideBar.isMenuOpen;
};

const isMenuX = () => {
    SideBar.isMenuOpen = false;
};

const MenuItems = reactive([
    {
        page: 1,
        name: "Home",
        route: "home",
    },
    {
        page: 2,
        name: "About",
        route: "about",
    },
    {
        page: 3,
        name: "Mabinogi",
        route: "mabinogi",
    },
    {
        page: 4,
        name: "Login",
        route: "login",
    },
]);

// 開關菜單取消滑動
watch(() => SideBar.isMenuOpen, (newVal) => {
    document.body.classList.toggle('overflow-hidden', newVal);
    document.body.classList.toggle('overflow-auto', !newVal);
});

</script>

<template>
    <header class="lg:h-[80px] h-[50px] w-full text-[#787878] border-b border-[#e8eaed] grid grid-cols-12 bg-slate-50 z-[995]">
        <!-- logo -->
        <div class="grid col-span-4 justify-center items-center">
            <a class="flex justify-center items-center hover:text-[#125627] p-3">

            </a>
        </div>

        <!-- nav web-->
        <div class="grid col-span-6 col-start-6 justify-end items-center">
            <!--  -->
            <button class="lg:hidden flex justify-center items-center hover:text-[#125627] p-3" @click="openMenu()">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </button>
            <!--  -->
            <ul class="hidden lg:flex gap-x-6">
                <li class="hover:text-[#125627]" v-for="Items in MenuItems" :key="Items">
                    <router-link :to="Items.route">{{ Items.name }}</router-link>
                </li>
            </ul>
        </div>
    </header>

    <!-- nav app -->
    <div class="fixed top-0 left-0 h-full w-full flex justify-center items-center lg:hidden z-[999]"
        v-show="SideBar.isMenuOpen">
        <div class="absolute top-0 left-0 h-full w-full bg-slate-50 backdrop-blur-md bg-opacity-75"></div>
        <!-- X -->
        <button class="absolute top-2 right-8 hover:text-[#125627] text-[#5f5f5f] p-3" @click="openMenu()">
            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>

        <!--  -->
        <ul class="text-center z-10">
            <li class="p-2" v-for="Items in MenuItems" :key="Items">
                <router-link class="hover:text-[#125627] text-[#5f5f5f] text-[18px] font-bold p-2" :to="Items.route"
                    @click.native="isMenuX">{{ Items.name }}</router-link>
            </li>
            <li class="hover:text-[#125627] mt-3"></li>
        </ul>

    </div>

</template>

<style scoped></style>
