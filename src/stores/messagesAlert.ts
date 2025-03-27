import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    isMessages: false, // 控制讀取狀態
    count: 0,          // 提示的計數器
    tips: [] as { msg: string; id: string }[], // 儲存讀取提示的陣列
    messageTitle: '',  // 標題
  }),
  actions: {
    setMessages(status: boolean, title = '') {
      this.isMessages = status;
      this.messageTitle = title;
    },
    addMessageAlert(msg: string) {
      this.count++;
      const tip = {
        msg,
        id: `${this.count}MessagesTip`,
      };
      this.tips.unshift(tip);
    },
    removeMessageAlert() {
      this.tips.shift(); // 刪除最早的提示
    },
    showMessages(payload: string | { msg: string; title?: string }) {
      const msg = typeof payload === 'string' ? payload : payload.msg;
      const title = typeof payload === 'string' ? this.messageTitle : payload.title || '';
      this.setMessages(true, title);
      if (msg) {
        this.addMessageAlert(msg);
      }
    },
    hideMessages() {
      this.setMessages(false, '');
      this.removeMessageAlert();
    },
  },
  getters: {
    allTips: (state) => state.tips,
    gettersMessageTitle: (state) => state.messageTitle,
    gettersisMessages: (state) => state.isMessages,
  },
});
