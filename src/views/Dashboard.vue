<script setup>
import {ref, reactive,onBeforeMount} from 'vue'
import { useAuthStore } from '../stores/authStore';
import router from '../router/index';

const authStore = useAuthStore()
onBeforeMount(() => {
    authStore.currentUser = (localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : null;

    if(!authStore.currentUser) router.push('/login')
})
const logoutUser = () => {
    authStore.logoutUser()
    router.push('/login')
}
</script>
<template>
    <div class="bg-gray-100 flex items-center justify-center h-screen">
        <div class="text-center">
            <!-- User Name -->
            <h1 class="text-3xl font-semibold mb-4">Hello, {{authStore?.currentUser?.email}}</h1>
    
            <!-- Logout Button -->
            <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out" @click="logoutUser()">Logout</button>
        </div>
    </div>
</template>