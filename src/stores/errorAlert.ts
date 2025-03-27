import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ErrorTip {
  msg: string;
  id: string;
}

export const useErrorAlertStore = defineStore('errorAlert', {
  state: () => ({
    count: 0, // 計數器，用於生成唯一 ID
    tips: ref<ErrorTip[]>([]), // 錯誤提示列表
    isPopping: false, // 是否正在移除提示
  }),
  actions: {
    /**
     * 新增錯誤提示
     * @param msg 錯誤訊息
     */
    addErrorAlert(msg: string) {
      this.count++;
      const tip: ErrorTip = {
        msg,
        id: `${this.count}ErrorTip`,
      };
      this.tips.unshift(tip);

      // 設定兩秒後移除提示
      setTimeout(() => {
        this.removeErrorAlert();
      }, 2000);
    },

    /**
     * 移除錯誤提示
     */
    removeErrorAlert() {
      if (!this.isPopping && this.tips.length > 0) {
        this.isPopping = true;
        this.tips.pop();
        this.isPopping = false;
      }
    },
  },
  getters: {
    /**
     * 獲取提示列表
     * @returns 提示列表
     */
    getTips(): ErrorTip[] {
      return this.tips;
    },
  },
});
