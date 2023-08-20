import { defineStore } from "pinia"
import supabase from "../lib/supabase"

import { ref } from "vue"

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  
  const insertTask = async (task) => {
    const { data: { user } } = await supabase.auth.getUser()
 
    let todo = {
      user_id :user.id,
      title: task,
      is_complete: false,
      inserted_at: new Date()
    };
    
    console.log("task: ", todo);

  
    const { error } = await supabase
      .from('tasks')
      .insert([todo])

    if (error) { console.log(error); }
  }

  const deleteTask = async (idToDelete) => {

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', idToDelete);

    if (error) { console.log(error); }
  }

  const changeTask = async (task) => {
    const { error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
    if (error) { console.log(error); }
  }
  return { tasks, insertTask, deleteTask, changeTask }
})