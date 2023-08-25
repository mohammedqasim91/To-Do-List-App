<script setup>
import { useTaskStore } from "@/stores/task";
import supabase from "../lib/supabase";
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
    <div class="todo-container">

      <h1 class="todo-title">To Do List</h1>

      <div class="todo-form-container">

        <input class="todo-input" placeholder="insert a task" v-model="task"/>
        
        <button class="todo-button" @click="insertTask">Add</button>
        
      </div>
      
     
      <ul class="todo-task-list">
        <li v-for="taskItem in tasks" :key="taskItem.id" class="todo-task-item">
          
          <span class="todo-task-title">{{ taskItem.title }}</span>
          <span class="todo-task-id">{{ taskItem.id }}</span>

          <div class="todo-task-buttons">

            <button class="todo-task-button" @click="deleteTask(taskItem.id)">
              <select>delete</select>
           
            </button>

            <button class="todo-task-button" @click="changeTask(taskItem.id)">
             <select>edit</select>

            </button>

          </div>
          
          <div class="todo-task-edit">
            <input class="todo-input" placeholder="edit a task" v-model="task"/>
            <button class="todo-button" @click="insertTask">edit</button>
          </div>
        </li>
      </ul>
      
    
    </div>
</template>


<style>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.todo-form-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.todo-input {
  width: 200px;
  height: 30px;
  margin-right: 10px;
}

.todo-button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-task-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.todo-task-title {
  flex-grow: 1;
  margin-right: 10px;
}

.todo-task-buttons {
  display: flex;
}

.todo-task-button {
  padding: 5px;
  background-color:green;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.todo-task-edit {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

@media (max-width: 600px) {
  .todo-input,
  .todo-button {
    width: 100%;
  }
}
</style>