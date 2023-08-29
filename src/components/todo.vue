<script setup>
import NavBar from "@/components/NavBar.vue"
import { useTaskStore } from "@/stores/task";
import supabase from "../lib/supabase";
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router'; 

const taskStore = useTaskStore();
const task = ref("");
const tasks = ref([]);
const userStore = useUserStore();
const router = useRouter();

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
const changeTask = async (taskItem) => {
  await taskStore.changeTask(taskItem.id, taskItem.title); // Update the task in the taskStore
  const { data, error } = await supabase 
    .from('tasks')
    .update({ title: taskItem.title })  
    .match({ id: taskItem.id }); // Update the task in the Supabase database

  if (error) {
    console.log(error);
  } else {
    await fetchTasks(); // Fetch the updated tasks after the change
    task.value = ""; // Clear the input field
  }
}


onMounted(fetchTasks);

</script>

<template>
<NavBar />
  <div class="todo-container">
  
    <h1 class="todo-title">To Do List</h1>

    <div class="todo-form-container">
      <input class="todo-input" placeholder="Insert a task" v-model="task" />
      <button class="todo-button" @click="insertTask">Add</button>
    </div>

    <ul class="todo-task-list">
      <li v-for="taskItem in tasks" :key="taskItem.id" class="todo-task-item">

        <div v-if="taskItem.editing" class="todo-task-edit">
            <input class="todo-input todo-input-edit" placeholder="Edit a task" v-model="taskItem.title" />
            
            <button class="todo-icon-button save-button" @click="changeTask(taskItem)">
              
            </button>
        </div>

        <div v-else>
          <p class="todo-task-title">{{ taskItem.id }}-{{ taskItem.title }}</p>
          <div class="todo-task-buttons">

            <button class="todo-icon-button delete-button" @click="deleteTask(taskItem.id)"></button>
            
            <button class="todo-icon-button edit-button" @click="taskItem.editing = true"></button>
          </div>
        </div>
      </li>
    </ul>


  </div>
</template>


<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}


.todo-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.todo-input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
}

.todo-button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  width: 100%;
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
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-task-title {
  font-size: 16px;
  margin: 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
  margin-right: 10px;
}

.todo-task-buttons {
  display: flex;
}

.todo-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: opacity 0.2s ease-in-out;
}

.todo-icon-button:hover {
  opacity: 0.7;
}

.save-button {
  background-image: url("../assets/sav.png");
  background-size: cover;
}

.delete-button {
  background-image: url("../assets/delete.png");
  background-size: cover;
}

.edit-button {
  background-image: url("../assets/edit.png");
  background-size: cover;
}


.sign-out {
  margin-top: 20px;
}

.sign-out-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.sign-out-btn:hover {
  background-color: #c82333;
}

@media (max-width: 600px) {
  .todo-input,
  .todo-button,
  .todo-input-edit {
    width: 100%;
  }

  .todo-task-item {
    flex-wrap: wrap;
  }

  .todo-task-title {
    margin-right: 10px;
  }


.sign-out {
    margin-top: 10px;
  }
}

</style>