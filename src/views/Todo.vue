<script setup>
import { computed, ref } from 'vue';
import { useTodoStore } from '../stores/TodoStore';

const todoStore = useTodoStore()
const taskName = ref('')
const tasks = computed(() => todoStore.tasks);

const removeTask = (index) => {
    todoStore.removeTask(index);
};

const toggleTask = (index) => {
    todoStore.toggleTaskStatus(index);
};

const addTaskHandler = () => {
    todoStore.addTask(taskName.value)
    taskName.value = ""
}
</script>

<template>
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class=" bg-blue-50 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div class="mb-4">
                <h1 class="text-gray-500 text-lg">Todo List</h1>
                <form @submit.prevent="addTaskHandler()" method="post">
                    <div class="flex mt-4">
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" v-model="taskName" placeholder="Add Todo">
                        <button class="font-bold text-xs flex-no-shrink p-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Add</button>
                    </div>
                </form>
            </div>
            <div>
                <div class="flex mb-4 items-center" v-for="(task, index) in tasks" :key="task.name">
                    <p class="text-sm w-full " :class="[task.done ? 'line-through text-green-600' : 'text-gray-600']">{{ task.name }}</p>
                    <button class="font-bold text-xs flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-600" @click="toggleTask(index)" v-if="!task.done">Done</button>
                    <button class="font-bold text-xs flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-600 hover:bg-gray-600" @click="toggleTask(index)" v-if="task.done">Undone</button>
                    <button class="font-bold text-xs flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500" @click="removeTask(index)">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

