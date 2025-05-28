<script setup>
import { reactive } from 'vue';


const FooterItem = reactive([
    {
        name: "instagram",
        route: "https://www.instagram.com/capybaby_cc?igsh=eW4wazRmaGR6ZWN4&utm_source=qr",
    },
    {
        name: "youtube",
        route: "https://www.youtube.com/@capybaby_cc",
    },
]);
</script>

<template>
    <footer
        class="h-[calc((100vh-74vh)/2)] w-full text-[#787878] border-t border-[#e8eaed] flex justify-center items-center bg-slate-50">

        <!-- nav -->
        <div class="flex justify-center items-center">
            <ul class="flex gap-x-6">
                <li class="hover:text-[#125627]" v-for="Items in FooterItem" :key="Items">
                    <a :href="Items.route" class="hover:text-[#125627]" target="_blank">{{ Items.name }}</a>
                </li>
            </ul>
        </div>

    </footer>
</template>

<style scoped></style>
