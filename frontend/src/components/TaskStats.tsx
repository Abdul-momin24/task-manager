
import { Task } from "./TaskBoard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
  const todoTasks = tasks.filter(task => task.status === "todo").length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: totalTasks, color: "text-foreground" },
    { label: "To Do", value: todoTasks, color: "text-blue-600" },
    { label: "In Progress", value: inProgressTasks, color: "text-yellow-600" },
    { label: "Completed", value: completedTasks, color: "text-green-600" },
    { label: "Completion Rate", value: `${completionRate}%`, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskStats;
