<template>
  <div>
    <h2 v-if="task._id" class="text-center mb-4">Edit Task</h2>
    <h2 v-else class="text-center mb-4">Create Task</h2>
    <form @submit.prevent="submitTask" class="border p-4 rounded bg-light">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input 
          v-model="task.title" 
          type="text" 
          id="title" 
          class="form-control" 
          placeholder="Enter task title" 
          required 
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea 
          v-model="task.description" 
          id="description" 
          class="form-control" 
          placeholder="Enter task description"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100">Save</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: {
    initialTask: {
      type: Object,
      default: () => ({ title: "", description: "", done: false }),
    },
  },
  data() {
    return {
      task: { ...this.initialTask },
    };
  },
  watch: {
    initialTask(newTask) {
      // Watch for changes in initialTask and update task accordingly
      this.task = { ...newTask };
    },
  },
  methods: {
    async submitTask() {
      try {
        if (this.task._id) {
          await api.put(`/${this.task._id}`, this.task);
        } else {
          await api.post("/", this.task);
        }
        this.$emit("task-saved"); // Notify parent to refresh tasks
      } catch (error) {
        console.error("Error saving task:", error);
      }
    },
  },
};
</script>
