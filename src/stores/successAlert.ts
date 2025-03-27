import { defineStore } from 'pinia';

export const useSuccessAlertStore = defineStore('successAlert', {
  state: () => ({
    count: 0,
    tips: [] as { msg: string; id: string }[], // 提示消息的類型定義
    isPopping: false,
  }),
  actions: {
    addSuccessAlert(msg: string) {
      this.count++;
      const tip = {
        msg,
        id: `${this.count}SuccessTip`,
      };
      this.tips.unshift(tip);

      setTimeout(() => {
        this.removeSuccessAlert();
      }, 2000);
    },

    removeSuccessAlert() {
      if (!this.isPopping && this.tips.length > 0) {
        this.isPopping = true;
        this.tips.pop();
        this.isPopping = false;
      }
    },
  },
  getters: {
    allTips: (state) => state.tips, // 獲取所有提示信息
  },
});
