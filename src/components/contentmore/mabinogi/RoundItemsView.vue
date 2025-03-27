<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '@/stores/stores';

// 動態導入所有 JSON 檔案
const jsonModules = import.meta.glob('../../../assets/JSON/*.json');

const selectedPrize = ref<any>('先點圖片！再點按我！');
const Probability = ref<number>();//機率
const Itemslevel = ref<string>('');//獎品等級
const count = ref<number>(0);//點擊次數
const ItemsContent = ref<any>([]);
const prizeHistory = ref<any>([]);//陣列，點擊紀錄
const currentPrizes = ref<{ level: string; name: string; probability: number }[]>([]);
const totalProbabilityByLevel = ref({});
const useStatus = useStore();

const currentPage = ref(1); //PAGE
const itemsPerPage = ref(20);
const maxVisiblePages = ref(5);

const paginatedPrizeHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return prizeHistory.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(prizeHistory.value.length / itemsPerPage.value);
});

const changePage = (page: number) => {
  currentPage.value = page;
};

const visiblePages = computed(() => {
  const half = Math.floor(maxVisiblePages.value / 2);
  let start = currentPage.value - half;
  let end = currentPage.value + half;

  if (start < 1) {
    start = 1;
    end = Math.min(maxVisiblePages.value, totalPages.value);
  }
  if (end > totalPages.value) {
    start = Math.max(totalPages.value - maxVisiblePages.value + 1, 1);
    end = totalPages.value;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
});


// 紀錄獎數量
const SlotteryCount = computed(() => {
  return prizeHistory.value.filter((prize: { level: string; }) => prize.level === 'S').length;
});
const AlotteryCount = computed(() => {
  return prizeHistory.value.filter((prize: { level: string; }) => prize.level === 'A').length;
});
const BlotteryCount = computed(() => {
  return prizeHistory.value.filter((prize: { level: string; }) => prize.level === 'B').length;
});
const ClotteryCount = computed(() => {
  return prizeHistory.value.filter((prize: { level: string; }) => prize.level === 'C').length;
});

// 動態加載 JSON 檔案
const loadPrizes = async (fileName: any) => {
  const path = `../../../assets/JSON/${fileName}.json`;
  if (jsonModules[path]) {
    try {
      const module = await jsonModules[path]() as { default: { level: string; name: string; probability: number }[] };
      const prizes = module.default;
      ItemsContent.value = prizes;
      return prizes;
    } catch (error) {
      console.error(`Error loading JSON file ${fileName}.json:`, error);
      return [];
    }
  } else {
    console.error(`JSON file ${fileName}.json not found`);
    return [];
  }
};

// 根據用戶選擇動態設置當前獎品列表
const selectdraw = async (selection: any) => {
  currentPrizes.value = await loadPrizes(selection);

  selectedPrize.value = selection;

  // 計算各個等級加起來的總機率
  const probabilityByLevel = <any>{};
  for (let prize of currentPrizes.value) {
    if (!probabilityByLevel[prize.level]) {
      probabilityByLevel[prize.level] = 0;
    }
    // 將每個機率四捨五入到四位小數，並轉換為字串輸出
    probabilityByLevel[prize.level] += Number(prize.probability.toFixed(4));
  }
  // 將結果轉換為四位小數的字串
  for (let level in probabilityByLevel) {
    probabilityByLevel[level] = probabilityByLevel[level].toFixed(4);
  }
  totalProbabilityByLevel.value = probabilityByLevel;

  // 總機率
  const totalProbability = calculateTotalProbability();
  console.log(`總機率: ${totalProbability.toFixed(4)}`);

};

// 抽獎設定
const draw = () => {
  let cumulativeProbability = 0;
  const random = Math.random() * 100;//因為機率是百分比形式
  for (let prize of currentPrizes.value) {
    cumulativeProbability += prize.probability;
    if (random < cumulativeProbability) {
      selectedPrize.value = prize.name;
      Probability.value = prize.probability;
      Itemslevel.value = prize.level;
      prizeHistory.value.unshift({
        level: prize.level,
        name: prize.name,
        probability: prize.probability
      });
      count.value++; //點擊次數增加
      // 將抽中的獎品添加到歷史記錄中,
      // .push加在後面,則.unshift是在前面增加
      break;
    }
  }
};

// 清空紀錄
const clearlog = () => {
  prizeHistory.value.length = 0; //歷史紀錄陣列清空
  currentPage.value = 1; // 重設頁碼
  count.value = 0;
  selectedPrize.value = '清除記錄了！';
};

// 抽獎內容機率加總
const calculateTotalProbability = () => {
  let totalProbability = 0;
  for (let prize of currentPrizes.value) {
    totalProbability += prize.probability;
  }
  return totalProbability;
};

const openItemsContent = () => {
  useStatus.isItemOpen = !useStatus.isItemOpen;
};

// 開關菜單取消滑動
watch(() => useStatus.isItemOpen, (newVal) => {
  document.body.classList.toggle('overflow-hidden', newVal);
  document.body.classList.toggle('overflow-auto', !newVal);
});

</script>

<style>
@keyframes rainbow-flicker {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.rainbow {
  background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 400% 400%;
  background-clip: text;
  color: transparent;
  animation: rainbow-flicker 5s ease infinite;
}
</style>

<template>
  <!-- 選擇 -->
  <section class="flex flex-wrap justify-center gap-2 p-2">
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('城市校園箱子')">
      <img src="@/assets/image/box/城市校園箱子.png" alt="">
    </div>
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('RoyalSociety')">
      <img src="@/assets/image/box/RoyalSociety.png" alt="">
    </div> -->
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('GiveMeBackMyBeautifulBox')">
      <img src="@/assets/image/box/GiveMeBackMyBeautifulBox.png" alt="">
    </div>
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('被遺忘的墳墓-一般')">
      <img src="@/assets/image/box/被遺忘的墳墓.png" alt="">
    </div> -->
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('WorldWanderer')">
      <img src="@/assets/image/box/WorldWanderer.png" alt="">
    </div>
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('ButterflyFairy')">
      <img src="@/assets/image/box/ButterflyFairy.png" alt="">
    </div>
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('HeavenlySanctuary')">
      <img src="@/assets/image/box/HeavenlySanctuary.png" alt="">
    </div> -->
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('貴族假期箱子')">
      <img src="@/assets/image/box/貴族假期.png" alt="">
    </div> -->
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('霓虹暗忍箱子')">
      <img src="@/assets/image/box/霓虹暗忍.png" alt="">
    </div> -->
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('GodOfSunAndMoon')">
      <img src="@/assets/image/box/GodOfSunAndMoon.png" alt="">
    </div>
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('BlueOcean')">
      <img src="@/assets/image/box/BlueOcean.png" alt="">
    </div> -->
    <!-- <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('偶像星辰箱子')">
      <img src="@/assets/image/box/偶像星辰.png" alt="">
    </div> -->
  </section>


  <!-- 抽獎 -->
  <section class="flex justify-center items-center p-3 ">
    <div class="w-[100%]">
      <div class="p-3 text-[16px] lg:text-[20px]">
        <span :class="Itemslevel === 'S' ? 'rainbow font-bold' : ''">{{ selectedPrize }}</span>
      </div>

      <div class="flex justify-center gap-4">
        <button
          class="text-center text-[18px] lg:text-[20px] p-2 w-[20%] lg:w-[13%] rounded-[13px] bg-[#f3c0c0] hover:bg-[#dab8b8] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)] text-[#2e2a3f]"
          @click="draw()">按我</button>

        <button
          class="text-center text-[18px] lg:text-[20px] p-2 w-[20%] lg:w-[13%] rounded-[13px] bg-[#c0f3ce] hover:bg-[#b8dac1] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)] text-[#2e2a3f]"
          @click="openItemsContent()">內容</button>
      </div>

      <div class="p-3 text-[16px]">
        點擊次數：{{ count }}
      </div>

      <hr class="text-[#cad4e0]">

      <!-- 歷史紀錄 -->
      <div class="p-3 md:text-[16px] text-[14px]">

        <!-- Object.entries(totalProbabilityByLevel) -->
        <span class="md:text-[14px] text-[12px]  text-[#898989]" v-for="(probability, level) in totalProbabilityByLevel"
          :key="level">
          {{ level }}：{{ probability }}％&nbsp;&nbsp;
        </span>

        <div class="flex justify-evenly items-center">
          <div class="text-[#F23005]">
            S獎：{{ SlotteryCount }}</div>
          <div class="text-[#ea67f4]">
            A獎：{{ AlotteryCount }}</div>
          <div class="text-[#54b16e]">
            B獎：{{ BlotteryCount }}</div>
          <div class="text-[#867d7d]">
            C獎：{{ ClotteryCount }}</div>
          <button
            class="p-1 bg-[#a5c7e9] hover:bg-[#9cb3cb] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)] rounded-[10px] text-[16px] text-[#2e2a3f] w-[17%] lg:w-[13%]"
            @click="clearlog()">清除</button>
        </div>

        <table class="table-auto w-full border-collapse border-[#123456] mt-2">

          <thead>
            <tr class="text-[#222222]">
              <th class="border border-slate-300 w-1/6">等級</th>
              <th class="border border-slate-300 w-1/2">名稱</th>
              <th class="border border-slate-300 w-1/6">機率</th>
            </tr>
          </thead>

          <!--  -->
          <tbody>
            <tr v-for="(prizeItems, index) in paginatedPrizeHistory" :key="index">
              <td
                :class="{ 'rainbow': prizeItems.level === 'S', 'text-[#ea67f4]': prizeItems.level === 'A', 'text-[#54b16e]': prizeItems.level === 'B', 'text-[#867d7d]': prizeItems.level === 'C' }"
                class="border border-slate-300 p-1">{{ prizeItems.level }}</td>
              <td
                :class="{ 'rainbow font-bold': prizeItems.level === 'S', 'text-[#ea67f4]': prizeItems.level === 'A', 'text-[#54b16e]': prizeItems.level === 'B', 'text-[#867d7d]': prizeItems.level === 'C' }"
                class="border border-slate-300">{{ prizeItems.name }}</td>
              <td class="border border-slate-300">{{ prizeItems.probability.toFixed(4) }}</td>
            </tr>
          </tbody>
        </table>
      </div>


      <div class="flex justify-center mt-4" v-if="totalPages > 1">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-3 py-1 mx-1 rounded bg-gray-200" :class="{ 'bg-gray-500 text-white': currentPage !== 1 }">
          &lt;
        </button>
        <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
          :class="{ 'bg-blue-500 text-white': currentPage === page, 'bg-gray-200': currentPage !== page }"
          class="px-3 py-1 mx-1 rounded">
          {{ page }}
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-3 py-1 mx-1 rounded bg-gray-200" :class="{ 'bg-gray-500 text-white': currentPage !== totalPages }">
          &gt;
        </button>
      </div>
    </div>
  </section>

  <!-- 抽獎項目內容 -->
  <section class="p-3 fixed top-0 left-0 h-full w-full bg-[#00000095]" v-show="useStatus.isItemOpen">

    <!-- 視窗容器 -->
    <div class="relative flex justify-center items-center h-[95%] w-full">

      <!-- X 按鈕 -->
      <button
        class="absolute top-[5%] right-[10%] lg:right-[20%] hover:text-[#125627] text-[#5f5f5f] bg-white rounded-full p-2"
        @click="openItemsContent()">
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="w-[80%] lg:w-[50%] max-h-[70%] overflow-y-auto bg-white rounded-[25px] p-3">
        <div v-if="ItemsContent.length > 0">
          <table class="table-auto w-full border-collapse border-[#123456] mt-2">
            <thead>
              <tr class="text-[#222222] text-[16px] md:text-[18px]">
                <th class="border border-slate-300 w-1/6">等級</th>
                <th class="border border-slate-300 w-1/2">名稱</th>
                <th class="border border-slate-300 w-1/6">機率</th>
              </tr>
            </thead>
            <tr class=" text-[#555555] text-[13px] md:text-[16px]" v-for="(ContentItems, index) in ItemsContent"
              :key="index">
              <!-- 獎品等級 -->
              <td class="border border-slate-300  p-1">{{ ContentItems.level }}</td>
              <!-- 獎品名稱 -->
              <td class="border border-slate-300">{{ ContentItems.name }}
              </td>
              <!-- 獎品機率 -->
              <td class="border border-slate-300">{{ ContentItems.probability.toFixed(4) }}</td>
            </tr>
          </table>
        </div>

        <div v-else>
          <div>尚未選擇轉蛋箱子</div>
        </div>

      </div>
    </div>

  </section>

</template>

<style scoped></style>
