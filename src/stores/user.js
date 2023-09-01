import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";
import router from "../router";

export const useUserStore = defineStore("userStore", () => {
 const  user = ref();

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error)
     { window.alert(error)
     }
  
    else {
      console.log("Data: ", data);
      user.value = data;
      console.log("info user: ", user.value);
      router.push({ name: "login" });
    }
  };
  

  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) { window.alert(error);
     }
    user.value = data;
    console.log("user signed in :", user.value);
    console.log(error);
    router.push({ name: "todo" });
  };

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      window.alert("Error: " + error.message);
    } else {
      user.value = {};
      router.push({ name: "home" });
    }
  };


 
  return { user, createNewUser, signInUser, signOutUser }
})