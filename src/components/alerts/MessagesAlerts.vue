<script setup lang="ts">
import { useMessagesStore } from '@/stores/messagesAlert';
import { computed } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const MessagesStore = useMessagesStore();
const isMessages = computed<boolean>(() => MessagesStore.gettersisMessages);
const Tips = computed<{ msg: string; id: string; }[]>(() => MessagesStore.allTips);
const messageTitle = computed<string>(() => MessagesStore.gettersMessageTitle);

const closeMessage = () => {
  MessagesStore.hideMessages();
}

</script>

<template>
  <div class="MessagesAlerts">

    <!-- modal -->
    <TransitionRoot appear :show="isMessages">
      <Dialog @close="closeMessage" class="relative z-50">
        <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-100 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25"></div>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full min-w-[80%] lg:min-w-[400px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                <!-- title -->
                <DialogTitle as="h3" class="text-lg text-center font-medium leading-6 text-gray-900 p-2 mb-2">
                  <h3 class="text-xl font-bold">{{ messageTitle }}</h3>
                </DialogTitle>

                <!-- body -->
                <div class="text-center text-md text-gray-500 p-4 mb-6">
                  <p v-for="tip in Tips" :key="tip.id" v-html="tip.msg"></p>
                </div>

                <!-- footer -->
                <div class="flex justify-center mb-2">
                  <button type="button" @click="closeMessage"
                    class="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded">
                    關閉
                  </button>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>

      </Dialog>
    </TransitionRoot>

  </div>
</template>

<style></style>
