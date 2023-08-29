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
      <div>
        <img class="brand-logo" src="@/assets/Mohammed-logo.png" alt="logo">
      </div>

      <div class="btn">
        <button class="sign-out-btn" @click="signOut">Sign Out</button>
        <router-link :to="{ path: `/login` }" class="login-link">Log In</router-link>
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
}
 
.brand-logo {
  height: 100px;
}

.login-link,
.sign-out-btn {
  padding: 5px 20px;
  background-color: #3897f0;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  text-decoration: none;
}

</style>