<script setup>

import { useUserStore } from "@/stores/user";

import { ref } from 'vue';
import router from '@/router'
const userStore = useUserStore();

const email = ref("");
const password = ref("");
</script>

<template>
    <h1>Sign In</h1>
   
  <input placeholder=" Email" v-model="email">
  <br>
  <br>
  <input placeholder=" Password" v-model="password">
  <br>
  <br>
  <button @click="userStore.signInUser(email, password)"> Sign In </button>

    <br>


  
</template>
