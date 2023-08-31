<script setup>
import Footer from "@/components/Footer.vue"
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
    tasks.value = data.map(task => ({ ...task, completed: false }));
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
    .update({ title: taskItem.title, completed: taskItem.completed })  
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

    <form class="todo-form-container" @submit.prevent="insertTask">
        
      <div class="left-todo">
        
        <h1 class="todo-title">todo Task</h1>
        <input class="todo-input" placeholder="Insert a Task" v-model="task" />
        <button class="todo-button" type="submit">Add Your List</button>
      
      </div>

      <div class="right-todo">
        <ul class="todo-task-list">
        <li v-for="taskItem in tasks" :key="taskItem.id" class="todo-task-item">
          <div v-if="taskItem.editing" class="todo-task-edit">
            <input class="todo-input todo-input-edit" placeholder="Edit a task" v-model="taskItem.title" />
            <button class="todo-icon-button save-button" @click="changeTask(taskItem)"></button>
          </div>
          <div v-else>
            <div>
                <input type="checkbox" v-model="taskItem.completed" @change="changeTask(taskItem)">
                <label :for="'task-' + taskItem.id" :class="{'completed-task': taskItem.completed}">{{ taskItem.title }}</label>
              </div>
            <div class="todo-task-buttons">
              <button class="todo-icon-button delete-button" @click="deleteTask(taskItem.id)"></button>
              <button class="todo-icon-button edit-button" @click="taskItem.editing = true"></button>
            </div>
          </div>
        </li>
      </ul>
      </div>
      
    </form>
  </div>
  <Footer />
</template>


<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #999;
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 66vh;
  box-shadow: 0px 0px 09px 0px black;
}


.todo-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6b3b3;
  height: 460px;
  width: 680px;
  border-radius: 4px;
  box-shadow: 0px 0px 09px 0px black;
}

.left-todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  background-color: #b62e2e;
  height: 200px;
  width: 250px;
  border-radius: 20px;
}
.todo-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
}

.todo-input {
  text-align: center;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

.todo-button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 207px;
}

.right-todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
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
border: none;
cursor: pointer;
width: 30px;
height: 30px;
margin-left: 10px;
transition: opacity 0.2s ease-in-out;
}

.todo-icon-button:hover {
  opacity: 0.7;
}

.save-button {
  background-image: url("../assets/update.png");
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
  .todo-form-container {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .left-todo {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    height: auto;
  }

  .right-todo {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .todo-container {
    height: 40vh ;
    padding: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
  .todo-form-container {
    flex-direction: column;
  }

  .left-todo,
  .right-todo {
    height: auto;
  }
}
</style>