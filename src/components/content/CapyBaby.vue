<script setup>
import router from '../../router';


const toPage = (page) => {
    router.push({ name: page });
};

</script>

<template>
    <!-- 內容寫裡面 -->
    <section class="min-h-[77vh]">

        <div class="grid grid-cols-12 p-3">

            <div
                class="lg:col-span-6 col-span-12 p-5 text-[20px] text-center flex justify-center items-center text-[#123456]">
                <div class="">
                    <p>探索生活的無限可能，一杯咖啡、一本書，一刻美好的寧静。</p><br />
                    <p>與我們一同體驗這個美妙的世界吧，每個瞬間都值得珍惜。</p><br />
                    <div class="text-sm text-blue-500">#生活的美好 #無限可能</div>
                    
                    <div class="lg:col-span-6 col-span-12 p-5 flex justify-center items-center text-[18px]">
                        <!-- mabinogi -->
                        <button
                            class="bg-gradient-to-t rounded-[15px] p-2 from-[#ffbe4e] hover:from-[#ffab1a] to-[#ffffff] hover:to-[#ffffff] text-[#675034]"
                            @click="toPage('mabinogi')">Mabinogi</button>
                        <!-- about -->
                        <button
                            class="bg-gradient-to-t rounded-[15px] p-2 from-[#ffbe4e] hover:from-[#ffab1a] to-[#ffffff] hover:to-[#ffffff] text-[#675034] ms-5"
                            @click="toPage('about')">About me</button>
                    </div>

                </div>
            </div>
            <div class="lg:col-span-6 col-span-12 p-5 text-center flex justify-center items-center">
                <div class="md:h-[80%] md:w-[80%] h-[90%] w-[90%]">
                    <img class="w-full h-full object-contain" src="@/assets/Image/zoo/IMG_7346.jpg" alt="">
                </div>
            </div>

        </div>

    </section>
</template>

<style scoped></style>
