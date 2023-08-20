<script setup>
import { useTaskStore } from "@/stores/task";
import supabase from "../lib/supabase"
import { ref, onMounted } from 'vue';

const taskStore = useTaskStore();
const task = ref("");
const tasks = ref([]);

const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    console.log(error);
  } else {
    tasks.value = data;
  }
  console.log("tasks: ", tasks.value);
}

const insertTask = async () => {
  await taskStore.insertTask(task.value);
  await fetchTasks();
  task.value = "";
}

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
  await fetchTasks();
  task.value = "";
}
const changeTask = async (id) => {
    await taskStore.changeTask(id);
    await fetchTasks();
    task.value = "";
}
onMounted(fetchTasks);
</script>


<template>
  <h1>To Do List</h1>

  <input placeholder="insert a task" v-model="task"/>
  <button @click="insertTask">Add</button>

  <ul>
    <li v-for="taskItem in tasks" :key="taskItem.id">{{ taskItem.title  }}
        <span>{{ taskItem.id }}</span> 
        <button @click="deleteTask(taskItem.id)">
        <img src="../assets/delete1.png" alt="delete-img">
        </button>

        <button @click="changeTask(taskItem.id)">
        <img src="../assets/edit1.png" alt="edit-img">
        </button>

        <input placeholder="edit a task" v-model="task"/>
        <button @click="insertTask">edit</button>
    </li>
  </ul>
</template>


<style>
img {
    width: 10px;
    height: 10px;
    }

</style>
