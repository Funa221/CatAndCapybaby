import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
    state: () => ({
        SelectedPage: sessionStorage.getItem("SelectedPage") || 1,// 給分頁顯示用,Mabinogi
        isMenuOpen: false, //選單開啟，預設關閉
        isItemOpen: false, //選單開啟，預設關閉
        isEchstoneOpen: false, //選單開啟，預設關閉

        adminLang: 'tw', // 管理員語言
        showNav: true, // 是否顯示導航
        ipIsAdmin: false, // 是否為管理員 IP
    }),
    actions: {
      setSelectedPage(value: number) {
        this.SelectedPage = value;
        sessionStorage.setItem('SelectedPage', value.toString());
      },

      toggleNav(show: any) {
        this.showNav = show;
      },
    },
    persist: true // pinia Plugin 持久化
});
