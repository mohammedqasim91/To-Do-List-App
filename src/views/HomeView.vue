<script setup>

import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import router from "../router";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
console.log(userStore.user)

</script>

<template>
  <div class="home-container">

    <h1 class="home-title">TODO App</h1>

    <p>This App helps you Create a list of Tasks, You can also edit or delete them.</p>
  
    <div class="home-form-container">
      
      <input class="home-input" placeholder=" Email" v-model="email">
      <br>
      <br>
      <input class="home-input" placeholder=" Password" v-model="password">
      <br>
      <br>
        <router-link :to="{ path: `/login` }" class="login-link">Log In</router-link>
      <br>
      <br>
      <button @click="userStore.createNewUser(email, password)" class="sign-up-btn">Sign Up</button>
      <br>
      

    </div>

  </div>

</template>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}


.home-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.home-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.home-input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  width: 300px;
  max-width: 100%;
}


.sing-up-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-link {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 8px;
}

@media (max-width: 480px) {
  .home-input {
    width: 100%;
  }
}

</style>
