<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Task Manager</h1>
    <div class="row">
      <div class="col-md-6">
        <!-- Listen for task-saved to trigger refreshTasks -->
        <TaskList :tasks="tasks" @edit-task="loadTaskForEdit" @task-saved="refreshTasks" />
      </div>
      <div class="col-md-6">
        <TaskForm :initialTask="selectedTask" @task-saved="refreshTasks" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TaskList from "./components/TaskList.vue";
import TaskForm from "./components/TaskForm.vue";
import api from "./services/api";

export default {
  components: { TaskList, TaskForm },
  setup() {
    const tasks = ref([]);
    const selectedTask = ref(null);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await api.get("/");
        tasks.value = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Refresh tasks and clear selected task
    const refreshTasks = () => {
      selectedTask.value = null;
      fetchTasks(); // Refreshes task list after deletion or save
    };

    const loadTaskForEdit = (task) => {
      selectedTask.value = { ...task };
    };

    // Fetch tasks initially when component mounts
    fetchTasks();

    return {
      tasks,
      selectedTask,
      refreshTasks,
      loadTaskForEdit,
    };
  },
};
</script>
