import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controller/task.controller.js";

const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);

// Create a new task
router.post("/", createTask);

// Get a single task by ID
router.get("/:id", getTaskById);

// Update a task by ID
router.put("/:id", updateTask);

// Delete a task by ID
router.delete("/:id", deleteTask);

export default router;
