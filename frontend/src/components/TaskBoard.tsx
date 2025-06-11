import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  taskUrlget,
  taskUrlCreate,
  taskUrlUpdate,
  taskUrldelete,
} from "./../api/task.api.js";
import SearchBar from "./SearchBar";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import TaskStats from "./TaskStats";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  dueDate?: string;
  createdAt: string;
}

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    taskUrlget()
      .then((res) => {
        const data = res.data; // axios auto-parses the response
  
        const mapped = data.tasks.map((task: any) => ({
          id: task._id || task.id,
          title: task.title,
          description: task.description,
          priority: task.priority || "medium",
          status: task.status,
          dueDate: task.dueDate,
          createdAt: task.createdAt || new Date().toISOString(),
        }));
  
        setTasks(mapped);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      });
  }, []);

  const addTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    try {
      const res = await taskUrlCreate(
        taskData.title,
        taskData.description,
        taskData.status,
        taskData.dueDate,
        taskData.priority
      );
  
      const task = res.data?.task;
  
      if (task) {
        setTasks((prev) => [
          ...prev,
          {
            id: task._id || Date.now().toString(),
            title: task.title,
            description: task.description,
            priority: task.priority ?? "medium",
            status: task.status,
            dueDate: task.dueDate,
            createdAt: task.createdAt ?? new Date().toISOString(),
          },
        ]);
      } else {
        console.warn("Task not returned from server.");
      }
  
      setIsFormOpen(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };
  

  const updateTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return;
    try {
      const res = await taskUrlUpdate(editingTask.id, { ...taskData });
      const data = res.data;
  
      if (data) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id ? { ...task, ...taskData } : task
          )
        );
      }
      setEditingTask(null);
      setIsFormOpen(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };
  
  const deleteTask = async (taskId: string) => {
    try {
      await taskUrldelete(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };
  
  const changeTaskStatus = async (taskId: string, newStatus: Task["status"]) => {
    try {
      const res = await taskUrlUpdate(taskId, { status: newStatus });
      const data = res.data;
  
      if (data) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (err) {
      console.error("Failed to change task status:", err);
    }
  };
  

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <TaskStats tasks={tasks} />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Button onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? updateTask : addTask}
          onCancel={closeForm}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center p-4 bg-secondary rounded-lg">
            To Do ({todoTasks.length})
          </h2>
          {todoTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditForm}
              onDelete={deleteTask}
              onStatusChange={changeTaskStatus}
            />
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center p-4 bg-secondary rounded-lg">
            In Progress ({inProgressTasks.length})
          </h2>
          {inProgressTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditForm}
              onDelete={deleteTask}
              onStatusChange={changeTaskStatus}
            />
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center p-4 bg-secondary rounded-lg">
            Completed ({completedTasks.length})
          </h2>
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditForm}
              onDelete={deleteTask}
              onStatusChange={changeTaskStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
