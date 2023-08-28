<script setup>

import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import router from '@/router'

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const showPassword = ref(false);
</script>

<template>
  <div class="home-container">

    <h1 class="home-title">Sign In</h1>

    <div class="home-form-container">

      <input class="home-input" placeholder=" Email" v-model="email">
      
      <div class="password-input-container">
        <input class="home-input" placeholder="Password" v-model="password" :type="showPassword ? 'text' : 'password'">
        <label class="password-label">
          
          <input type="checkbox" v-model="showPassword">
          Show Password
        </label>
      </div>
      <br>
      <br>
      <button @click="userStore.signInUser(email, password)" class="sign-in-btn">Sign In</button>
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

.sign-in-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .home-input {
    width: 100%;
  }
}

</style>
