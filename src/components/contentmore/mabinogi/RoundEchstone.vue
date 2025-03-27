<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/stores/stores';

// 動態導入所有 JSON 檔案
const jsonModules = import.meta.glob('../../../assets/JSON/*.json');

const ItemsText = ref<any>('先點圖片！再點按我！'); //獎品文字
const ItemsProbability = ref<number>(); // 獎品機率
const Itemslevel = ref<string>(''); // 獎品等級
const isHighestLevel = ref<boolean>(false); // 是否是最高等級
const count = ref<number>(0); // 點擊次數
const ItemsContent = ref<any>([]);
const prizeHistory = ref<any>([]); // 陣列，點擊紀錄
const currentPrizes = ref<{ level: string; name: string; probability: number }[]>([]);
const totalProbability = ref<number>();
const useAdvancedItem = ref<boolean>(false); // 使用高級物品
const usePremiumItem = ref<boolean>(false); // 使用優質物品
const useStatus = useStore();

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

// 【獨立處理等級】動態加載 JSON 檔案
const RangloadPrizes = async (fileName: any) => {
  const path = `../../../assets/JSON/${fileName}.json`;
  if (jsonModules[path]) {
    try {
      const module = await jsonModules[path]() as { default: { level: string; name: string; probability: number }[] };
      const prizes = module.default;
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


// 設置當前獎品列表
const selectdraw = async (selection: string) => {
  currentPrizes.value = await loadPrizes(selection);
  totalProbability.value = calculateTotalProbability();
  console.log(`總機率: ${totalProbability.value.toFixed(4)}`);
};
// 計算總機率
const calculateTotalProbability = () => {
  return currentPrizes.value.reduce((sum, prize) => sum + prize.probability, 0);
};

const draw = async () => {

  // 是否使用高、優物品
  const adjustedPrizes = adjustProbabilities(currentPrizes.value);
  // 處理過後的機率進行抽取
  const selectedPrize = selectPrize(adjustedPrizes);

  if (selectedPrize) {

    // 拿取等級分類
    const levelType = determineLevelType(selectedPrize.level);
    // json表
    const levels = await RangloadPrizes('回音石個數等級機率');
    // 兩者丟進去，抽出來的等級
    const selectedLevel = getLevelByType(levels, levelType);

    ItemsText.value = selectedPrize.name;
    ItemsProbability.value = selectedPrize.adjustedProbability;
    Itemslevel.value = selectedLevel;
    isHighestLevel.value = checkIfHighestLevel(selectedPrize.level, selectedLevel);

    prizeHistory.value.unshift({
      level: selectedLevel,
      name: selectedPrize.name,
      probability: selectedPrize.adjustedProbability,
      isHighestLevel: isHighestLevel.value
    });
    count.value++; // 點擊次數增加
  };
}

// 調整機率
const adjustProbabilities = (prizes: { level: string; name: string; probability: number }[]) => {
  return prizes.map(prize => {
    let adjustedProbability = prize.probability;
    if (useAdvancedItem.value) {
      adjustedProbability *= 1.15;
    } else if (usePremiumItem.value) {
      adjustedProbability *= 1.20;
    }
    return { ...prize, adjustedProbability };
  });
};

// 選擇獎品
const selectPrize = (prizes: { level: string; name: string; adjustedProbability: number }[]) => {
  let cumulativeProbability = 0;
  const random = Math.random() * 100;
  for (const prize of prizes) {
    cumulativeProbability += prize.adjustedProbability;
    if (random < cumulativeProbability) {
      return prize;
    }
  }
  return null;
};

// 判斷等級類型
const determineLevelType = (levelRange: string) => {
  if (levelRange.includes('1~20')) return 'NumTwenty';
  if (levelRange.includes('1~10')) return 'NumTen';
  if (levelRange.includes('1~6')) return 'NumSix';
  if (levelRange.includes('1~5')) return 'NumFive';
  if (levelRange.includes('1~3')) return 'NumThree';
  if (levelRange.includes('1')) return 'NumOne';
  return null;
};

// 根據類型選擇等級
const getLevelByType = (levels: any, type: any) => {
  const levelData = levels.find((level: any) => level.type === type);
  return levelData ? getRandomItem(levelData.levels).level : null;
};

// 根據機率隨機選擇一個項目
const getRandomItem = (items: any) => {
  const totalProbability = items.reduce((sum: number, item: any) => sum + item.probability, 0);
  let randomValue = Math.random() * totalProbability;
  for (let item of items) {
    randomValue -= item.probability;
    if (randomValue <= 0) {
      return item;
    }
  }
  return null;
};

// 判斷是否為最高等級
const checkIfHighestLevel = (levelRange: string, selectedLevel: string) => {
  const maxLevel = levelRange.split('~').pop();
  return selectedLevel === maxLevel;
};

// 清空紀錄
const clearlog = () => {
  prizeHistory.value.length = 0;
  count.value = 0;
  ItemsText.value = '清除記錄了！';
  Itemslevel.value = '';
};

const openItemsContent = () => {
  useStatus.isEchstoneOpen = !useStatus.isEchstoneOpen;
};

// 開關菜單取消滑動
watch(() => useStatus.isEchstoneOpen, (newVal) => {
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
  <section class="flex flex-wrap justify-center gap-2 mt-5">
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('BlusEch')">
      <img class="w-[50px] h-[50px]" src="@/assets/image/echostone/BlusEch.png" alt="">
    </div>
    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('RedEch')">
      <img class="w-[50px] h-[50px]" src="@/assets/image/echostone/RedEch.png" alt="">
    </div>

    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('YellowEch')">
      <img class="w-[50px] h-[50px]" src="@/assets/image/echostone/YellowEch.png" alt="">
    </div>

    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('SilverEch')">
      <img class="w-[50px] h-[50px]" src="@/assets/image/echostone/SilverEch.png" alt="">
    </div>

    <div class="w-1/4 lg:w-1/6 flex justify-center items-center rounded-[10px] hover:bg-[#f4f4f4]"
      @click="selectdraw('darkEch')">
      <img class="w-[50px] h-[50px]" src="@/assets/image/echostone/darkEch.png" alt="">
    </div>


    <!-- 選擇是否使用高級或優質物品 -->
    <!-- <div class="text-[14px] flex justify-center items-center">
      <label>
        <input type="checkbox" v-model="useAdvancedItem" /> 高級
      </label>
      <label>
        <input type="checkbox" v-model="usePremiumItem" /> 優質
      </label>
    </div> -->
  </section>


  <!-- 抽獎 -->
  <section class="flex justify-center items-center p-3 ">
    <div class="w-[100%]">

      <div class="p-3 text-[16px] lg:text-[20px]" :class="isHighestLevel ? 'rainbow font-bold' : ''">
        <!-- 抽取物 -->
        <span>
          {{ ItemsText }}
          <span v-if="Itemslevel" class="text-[#fa3636] font-bold">
            {{ Itemslevel }} </span>
          <span v-if="Itemslevel"> 等級</span>
        </span>
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
        <span class="md:text-[14px] text-[12px]  text-[#898989]">
          {{ totalProbability?.toFixed(2) }}
        </span>

        <div class="flex justify-evenly items-center">
          <button
            class="p-1 bg-[#a5c7e9] hover:bg-[#9cb3cb] shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)] rounded-[10px] text-[16px] text-[#2e2a3f] w-[17%] lg:w-[13%]"
            @click="clearlog()">清除</button>
        </div>

        <table class="table-auto w-full border-collapse border-[#123456] mt-2">

          <thead>
            <tr class="text-[#222222]">
              <th class="border border-slate-300 w-1/2">名稱</th>
              <th class="border border-slate-300 w-1/6">等級</th>
            </tr>
          </thead>

          <!--  -->
          <tr class=" text-[#555555]" v-for="(prizeItems, index) in prizeHistory" :key="index">
            <!-- 獎品名稱 -->
            <td :class="{
              'rainbow font-bold': prizeItems.isHighestLevel,
            }" class="border border-slate-300">{{ prizeItems.name }}
            </td>
            <!-- 獎品等級 -->
            <td :class="{
              'rainbow': prizeItems.isHighestLevel,
            }" class="border border-slate-300  p-1">{{
        prizeItems.level
              }}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>


  <!-- 抽獎項目內容 -->
  <section class=" p-3 fixed  top-0 left-0 h-full w-full bg-[#00000095]" v-show="useStatus.isEchstoneOpen">

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
            <tr class="text-[#555555] text-[13px] md:text-[16px]" v-for="(ContentItems, index) in ItemsContent"
              :key="index">
              <td class="border border-slate-300 p-1">{{ ContentItems.level }}</td>
              <td class="border border-slate-300">{{ ContentItems.name }}</td>
              <td class="border border-slate-300">{{ ContentItems.probability }}</td>
            </tr>
          </table>
        </div>
        <div v-else>
          <div>尚未選擇回音石</div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped></style>
