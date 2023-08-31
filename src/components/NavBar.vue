<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const signOut = async () => {
  await userStore.signOutUser(); // Sign out the user from the userStore
  router.push('/'); // Redirect the user to the home page
}
</script>

<template>
    <nav>
      <div class="navbar-left">
        <img class="brand-logo" src="@/assets/s-l1600.png" alt="Mohammed Logo">
      </div>

      <div class="navbar-right">
        <button class="sign-out-btn" @click="signOut">Sign Out</button>
        <router-link :to="{ path: `/login` }" class="login-link">Sign In</router-link>
      </div>
    </nav>
  
</template>

<style scoped>

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6b3b3;
  padding: 15px;
  justify-content: space-around;
  box-shadow: 0px 0px 09px 0px black;
}
 
.brand-logo {
  height: 90px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.login-link {
  text-decoration: none;
  color:white; 
  font-size: 20px;
  font-family: Arial, sans-serif;
  padding: 10px;
  border-radius: 5px;
  background-color: #3897f0;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: none;
  box-shadow: 0px 0px 09px 0px white;
}
.sign-out-btn {
  text-decoration: none;
  color: white;
  font-size: 20px;
  padding: 8px;
  border-radius: 5px;
  background-color: #3897f0;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 09px 0px white;
}


.login-link:hover {
  background-color: #1877f2;
}
.sign-out-btn:hover {
  background-color: #1877f2;
}


@media (max-width: 600px) {
  nav {
    flex-direction: column;
    padding: 10px;
  }

  .navbar-left,
  .navbar-right {
    margin-bottom: 10px;
  }

  .brand-logo {
    height: 60px;
    margin-bottom: 10px;
  }
}

</style>