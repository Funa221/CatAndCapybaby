import { defineStore } from 'pinia';
import { ref } from 'vue';

interface LoadingTip {
  msg: string;
  id: string;
}

export const useLoadingAlertStore = defineStore('loading', {
  state: () => ({
    isLoading: false, // 控制讀取狀態
    count: 0, // 計數器，用於生成唯一 ID
    tips: ref<LoadingTip[]>([]), // 儲存讀取提示的陣列
  }),
  actions: {
    SET_LOADING(status: boolean) {
      this.isLoading = status;
    },
    /**
     * 新增提示
     * @param msg Loading訊息
     */
    addLoadingAlert(msg: string) {
      this.count++;
      const tip: LoadingTip = {
        msg,
        id: `${this.count}LoadingTip`,
      };
      this.tips.unshift(tip);
    },

    /**
     * 移除提示
     */
    removeLoadingAlert() {
      this.tips.shift(); // 刪除最早的提示
    },
  },
  getters: {
    /**
     * 獲取提示列表
     * @returns 提示列表
     */
    getTips(): LoadingTip[] {
      return this.tips;
    },
  },
});

