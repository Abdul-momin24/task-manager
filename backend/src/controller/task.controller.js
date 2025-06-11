import {
    taskService,
    findAllTasks,
    findTaskById,
    updateTaskById,
    deleteTaskById,
  } from "../service/taskService.service.js";
  import wrapAsync from "../utils/wrapAsync.js";
  
  export const createTask = wrapAsync(async (req, res) => {
    const { title, description, status, dueDate, priority } = req.body;
  
    if (!title || !description || !status || !dueDate || !priority) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (title, description, status, dueDate, priority) are required.",
      });
    }
  
    const task = await taskService(title, description, status, dueDate, priority);
  
    res.status(201).json({
      success: true,
      task,
    });
  });
  
  export const getAllTasks = wrapAsync(async (req, res) => {
    const tasks = await findAllTasks();

  
    res.status(200).json({
      success: true,
      tasks,
    });
  });
  
  export const getTaskById = wrapAsync(async (req, res) => {
    const task = await findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
  
    res.status(200).json({
      success: true,
      task,
    });
  });
  
  
  export const updateTask = wrapAsync(async (req, res) => {
    const updatedTask = await updateTaskById(req.params.id, req.body);
  
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
  
    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  });
  
  export const deleteTask = wrapAsync(async (req, res) => {
    const deletedTask = await deleteTaskById(req.params.id);
  
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
  
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  });
  