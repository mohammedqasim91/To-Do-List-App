<script setup>
import NavBar from "@/components/NavBar.vue"
import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import router from '@/router'

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const showPassword = ref(false);

</script>

<template>
  <NavBar />
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

        <button @click="userStore.signInUser(email, password)" class="sign-in-btn">Sign In</button>
      </div>
      
    </div>

  </div>


</template>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 84vh;
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
  background: #ffffff;
  padding: 24px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}

.home-input {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.password-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.password-label {
  font-size: 12px;
  color: #8e8e8e;
  cursor: pointer;
  user-select: none;
  margin-top: 8px;
}

.login-link {
padding: 10px 25px;
font-size: 14px;
background-color: #3897f0;
color: #ffffff;
border-radius: 4px;
cursor: pointer;
text-decoration: none;
margin: 10px;
}

.sign-in-btn {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #3897f0;
  color: #ffffff;

  border-radius: 4px;
  cursor: pointer;
}

.sign-in-btn:hover {
  background-color: #1877f2;
}


@media (max-width: 600px) {
  .home-input {
    width: 100%;
  }
}

</style>
