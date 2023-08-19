<script setup>
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/task";
import { ref } from 'vue';


const userStore = useUserStore();
const taskStore = useTaskStore();

const email = ref("");
const password = ref ("");


const signInUser = async (email, password) => {

  
    const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) 
  console.log("Error: ",error);
  else 
  ("Data: ", console.log(data))
};

const signOutUser = async (email, password) => {


  const { error } = await supabase.auth.signOut()

if (error) 
console.log("Error: ",error);
else 
("Data: ", console.log(data))
};


</script>

<template>
  <h1> To do List</h1>
  <h2 v-if="userStore.user">Current User : {{ userStore.user.user.email }}</h2>

  <input placeholder="Write your email" v-model="email">
  <br>
  <input placeholder="Write your password" v-model="password">
  <br>
  <button @click="userStore.createNewUser(email,password)">Create New User</button>
  <br>

  <button @click="signInUser(email,password)">Sign In</button>
  <br>
  <button @click="signOutUser">Sign Out</button>

  <button @click="taskStore.fetchTasks()">Fetch Tasks</button>

  <ul>
    <li v_for="task in taskStore.tasks">
      {{ task.title }} - {{ task.is_complete }}
    </li>
  </ul>

</template>
