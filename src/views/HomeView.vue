<script setup>
import Footer from "@/components/Footer.vue"
import NavBar from "@/components/NavBar.vue"
import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import router from "../router";


const userStore = useUserStore();

const email = ref("");
const password = ref("");

const showPassword = ref(false);

</script>

<template>
  <NavBar />
  <div class="home-container">
    <div class="home-title">
      <img src="../assets/ToDo-List-icon.png" alt="todo img">
    </div>

    <form class="home-form-container" @submit.prevent="userStore.createNewUser(email, password)">
      <p class="home-description">Welcome ToDo App, To Create an account</p>
      <input class="home-input" placeholder=" Email" v-model="email">

      <div class="password-input-container">
        <input class="home-input" placeholder="Password" v-model="password" :type="showPassword ? 'text' : 'password'">

        <label class="password-label">
            <input type="checkbox" v-model="showPassword">Show Password
            <button @click="userStore.createNewUser(email, password)" class="sign-up-btn">Sign Up</button>
        </label>
      </div>

      <div class="ToLgin">
        <p>or Already have an account ? </p>
        <router-link :to="{ path: `/login` }" class="login-link">Sign In</router-link>
      </div>
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
  height: 72vh;
  background-color: #999;
  box-shadow: 0px 0px 09px 0px black;
}

.home-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.home-description {
  font-size: 25px;
  color: unset;
}

.home-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6b3b3;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0px 0px 09px 0px black;
}

.home-input {
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 09px 0px black;
  border: none;
  outline: none;
  font-size: 16px;
  margin-bottom: 12px;
}

.password-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.password-label {
  font-size: 12px;
  color: unset;
  cursor: pointer;
  user-select: none;
  margin-right: -65px;
}

.login-link {
  padding: 10px 21px;
  font-size: 14px;
  background-color: #3897f0;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  margin: 5px;
}

.sign-up-btn {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #3897f0;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
  border: none;
}

.ToLgin {
  display: flex;
  align-items: center;
}
.login-link:hover {
  background-color: #2404da;
}
.sign-up-btn:hover {
  background-color: #2404da;
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