<template>
  <div>
    <h2 class="text-center mb-4">Task List</h2>
    <ul class="list-group">
      <li 
        class="list-group-item d-flex justify-content-between align-items-center mb-2"
        v-for="task in tasks"
        :key="task._id"
      >
        <div>
          <strong>{{ task.title }}</strong> <br />
          <span>{{ task.description }}</span>
        </div>
        <div>
          <button class="btn btn-warning btn-sm me-2" @click="$emit('edit-task', task)">Edit</button>
          <button class="btn btn-danger btn-sm" @click="deleteTask(task._id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteTask(id) {
      try {
        await api.delete(`/${id}`); // Sends DELETE request to backend
        this.$emit("task-saved"); // Notifies parent to refresh tasks
      } catch (error) {
        console.error("Error deleting task:", error); // Logs any error
      }
    },
  },
};
</script>
