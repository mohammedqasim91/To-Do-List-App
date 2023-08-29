<script setup>
import Footer from "@/components/Footer.vue"
import NavBar from "@/components/NavBar.vue"
import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import router from "../router";


// ...

function navigateToLogin() {
  if (email.value && password.value) {
    router.push('/login');
  }
}
const userStore = useUserStore();

const email = ref("");
const password = ref("");

const showPassword = ref(false);

</script>

<template>
  <NavBar />
  <div class="home-container">

    <h1 class="home-title">TODO App</h1>

    <p class="home-description">This App helps you Create a list of Tasks, You can also edit or delete them.</p>

    <form class="home-form-container" @submit.prevent="userStore.createNewUser(email, password)">

      <input class="home-input" placeholder=" Email" v-model="email">
        
      <div class="password-input-container">
        <input class="home-input" placeholder="Password" v-model="password" :type="showPassword ? 'text' : 'password'">
        
        <label class="password-label">
          
          <input type="checkbox" v-model="showPassword">
          Show Password
        </label>
      </div>
        
        <button @click="navigateToLogin" class="login-link">Sign In</button>
        
        <button @click="userStore.createNewUser(email, password)" class="sign-up-btn">Sign Up</button>
        

    </form> 
    
  </div>
  <Footer />
</template>

<style scoped>

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  height: 75vh;
  background-color: #999;
}

.home-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #262626;
}

.home-description {
  font-size: 14px;
  margin-bottom: 24px;
  color: #757575;
}

.home-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: aqua;
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
.sign-up-btn {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #3897f0;
  color: #ffffff;

  border-radius: 4px;
  cursor: pointer;
}

.sign-up-btn:hover {
  background-color: #1877f2;
}



@media (max-width: 600px) {
  .home-input {
    width: 100%;
  }

  .home-form-container {
    padding: 16px;
  }
}
</style>