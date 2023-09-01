<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

</script>

<template>
  <nav>
    <div class="navbar-left">
      <img class="brand-logo" src="@/assets/s-l1600.png" alt="Mohammed Logo">
    </div>
    <div class="hello" v-if="userStore.user">{{ "Hello " + userStore.user.user.email }}</div>

    <div class="navbar-right" :class="{ 'show': showNavbar }">
      <ul class="navbar-menu">
        <li class="navbar-menu-item">
          <router-link class="navbar-menu-link" to="/">Home</router-link>
        </li>
        <li class="navbar-menu-item">
          <router-link :to="{ path: `/login` }" class="navbar-menu-link">Sign In</router-link>
        </li>
        <li class="navbar-menu-item">
          <a class="navbar-menu-link" href="#">Services</a>
        </li>
        <li class="navbar-menu-item">
          <a class="navbar-menu-link" href="#">About</a>
        </li>
      </ul>
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
  border: none;
}

.hello {
  font-size: 18px;
  font-weight: bolder;
  color: black;
  text-decoration: none;
  margin-top: 20px;
  margin-bottom: 20px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-menu-item {
  margin-right: 20px;
}

.navbar-menu-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.navbar-menu-link:hover {
  color: #ff6b6b;
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