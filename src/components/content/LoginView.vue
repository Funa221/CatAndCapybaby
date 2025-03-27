<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
// ICON
import { IconEye, IconEyeOff } from '@tabler/icons-vue';

// Reactive State
const isEmailEntered = ref(false);
const isPasswordEntered = ref(false);

const isPasswordVisible = ref<boolean>(false);

const formData = ref<{ email: string, password: string }>({
    email: '',
    password: ''
});

const schema = yup.object({
    email: yup.string().email('電子信箱格式不正確').required('電子信箱為必填項'),
    password: yup.string().min(8, '密碼至少需要8個字符').required('密碼為必填項'),
});

// Border Color Helper
const borderColorClass = (error: any, isEntered: any, value: any) => {
    return [
        'block w-full rounded-md border-0 py-1.5 pl-2 pe-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:outline-none',
        error ? 'ring-red-500' : (isEntered && value !== '') ? 'ring-green-500' : 'ring-gray-300'
    ];
};

const CheckPassword = (visible: boolean) => {
    isPasswordVisible.value = visible;
}

const loginSubmit = async () => {
    console.log('formData', formData.value);
};
</script>

<template>
    <!-- 內容寫裡面 -->
    <section class="min-h-[77vh] flex justify-center items-center">

        <div class="rounded-[15px] bg-[#dfe4e8] text-[#303030] p-5 m-5">
            <!--  -->
            <div class="flex justify-center p-3">
                <img class="h-1/2 w-1/2" src="../../assets/Image/zoo/吱吱.gif" alt="">
            </div>

            <Form @submit="loginSubmit" :validation-schema="schema" v-slot="{ errors }">

                <!-- Email Field -->
                <div class="sm:col-span-12 mb-6">
                    <label class="block text-sm font-medium leading-6 text-gray-900">電子信箱</label>
                    <div class="relative">
                        <Field type="text" name="email" placeholder="請輸入電子信箱" v-model="formData.email"
                            @input="isEmailEntered = true" class="bg-[#f0f0f0]"
                            :class="borderColorClass(errors.email, isEmailEntered, formData.email)" />
                        <div class="absolute top-full left-0 w-full">
                            <ErrorMessage name="email" class="text-red-500 text-sm" />
                        </div>
                    </div>
                </div>

                <!-- Password Field -->
                <div class="sm:col-span-12 mb-6">
                    <label class="block text-sm font-medium leading-6 text-gray-900">密碼</label>
                    <div class="relative">
                        <Field :type="isPasswordVisible ? 'text' : 'password'" name="password" placeholder="請輸入密碼"
                            autocomplete="off" v-model="formData.password" @input="isPasswordEntered = true;"
                            class="bg-[#f0f0f0]"
                            :class="borderColorClass(errors.password, isPasswordEntered, formData.password)" />

                        <!-- Icon 位置 -->
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700">
                            <IconEye v-if="isPasswordVisible" @click="CheckPassword(false)" stroke="2"
                                class="cursor-pointer" />
                            <IconEyeOff v-else @click="CheckPassword(true)" stroke="2" class="cursor-pointer" />
                        </div>

                        <div class="absolute top-full left-0 w-full">
                            <ErrorMessage name="password" class="text-red-500 text-sm" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-center items-center p-3 ">
                    <button type="submit" class="w-40 p-2 text-center rounded-[10px] bg-[#f5f5f5]">
                        登入
                    </button>
                </div>
            </Form>
        </div>

    </section>
</template>

<style scoped></style>
