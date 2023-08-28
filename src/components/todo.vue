<script setup>
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
    task.value = "";
  }
}
const signOut = async () => {
  await userStore.signOutUser();
  router.push('/');
}

onMounted(fetchTasks);

</script>

<template>

  <div class="todo-container">
  
    <h1 class="todo-title">To Do List</h1>

    <div class="todo-form-container">
      <input class="todo-input" placeholder="Insert a task" v-model="task" />
      <button class="todo-button" @click="insertTask">Add</button>
    </div>

    <ul class="todo-task-list">
      <li v-for="taskItem in tasks" :key="taskItem.id" class="todo-task-item">

        <div v-if="taskItem.editing">
          <div class="todo-task-edit">
            <input class="todo-input" placeholder="Edit a task" v-model="taskItem.title" />
            <br>
            <button class="todo-icon-button save-button" @click="changeTask(taskItem)">Save</button>
          </div>
        </div>

        <div v-else>
          <p class="todo-task-title">{{ taskItem.id }}-{{ taskItem.title }}</p>
          <div class="todo-task-buttons">
            <button class="todo-icon-button delete-button" @click="deleteTask(taskItem.id)"></button>
            <br>
            <button class="todo-icon-button edit-button" @click="taskItem.editing = true"></button>
          </div>
        </div>

      </li>
    </ul>
    <div class="'sign-out'">
      <button class="sign-out-btn" @click="signOut">Sign Out</button>
    </div>
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

.todo-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: 5px;
}

.delete-button {
  background-image: url("../assets/delete.png");
  background-size: cover;
}

.edit-button {
  background-image: url("../assets/edit.png");
  background-size: cover;
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

  .todo-task-item {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .todo-task-title {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .todo-task-buttons {
    flex-direction: row;
    justify-content: flex-start;
  }

  .todo-icon-button {
    margin-left: 0;
    margin-right: 5px;
  }
}
</style>