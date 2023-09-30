import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue'
export const useTodoStore = defineStore('todo', () => {
    const tasks = ref([])
    const addTask = (task) => {
        tasks.value.push({
            name: task,
            done: false,
        })
    }
    const removeTask = (index) => {
        tasks.value.splice(index, 1)
    }

    const toggleTaskStatus = (index) => {
        tasks.value[index].done = !tasks.value[index].done;
    }

    return {
        tasks, addTask, removeTask, toggleTaskStatus
    }

});