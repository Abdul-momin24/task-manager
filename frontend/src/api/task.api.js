import axiosInstance from "../utils/axiosInstance";

// Fetch all tasks
export const taskUrlget = async () => {
  return await axiosInstance.get("/task");
};

// Create a new task
export const taskUrlCreate = async (title, description, status, dueDate, priority) => {
  return await axiosInstance.post("/task", {
    title,
    description,
    status,
    dueDate,
    priority,
  });
};

// Update an existing task
export const taskUrlUpdate = async (id, updatedData) => {
  return await axiosInstance.put(`/task/${id}`, updatedData);
};

// Delete a task
export const taskUrldelete = async (id) => {
  return await axiosInstance.delete(`/task/${id}`);
};
