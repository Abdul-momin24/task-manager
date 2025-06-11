import Task from "../models/task.model.js";

export const taskService = async (title, description, status, dueDate, priority) => {
  try {
    const newTask = new Task({ title, description, status, dueDate, priority });
    return await newTask.save();
  } catch (err) {
    console.error("Error in taskService:", err);
    throw new Error("Failed to create task: " + (err.message || err));
  }
};

export const findAllTasks = async () => {
  try {
    return await Task.find({});
  } catch (err) {
    console.error("Error in findAllTasks:", err);
    throw new Error("Failed to fetch tasks: " + (err.message || err));
  }
};

export const findTaskById = async (id) => {
  try {
    return await Task.findById(id);
  } catch (err) {
    console.error("Error in findTaskById:", err);
    throw new Error("Failed to fetch task by ID: " + (err.message || err));
  }
};

export const updateTaskById = async (id, data) => {
  try {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    console.error("Error in updateTaskById:", err);
    throw new Error("Failed to update task: " + (err.message || err));
  }
};

export const deleteTaskById = async (id) => {
  try {
    return await Task.findByIdAndDelete(id);
  } catch (err) {
    console.error("Error in deleteTaskById:", err);
    throw new Error("Failed to delete task: " + (err.message || err));
  }
};
