
import { Task } from "./TaskBoard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Calendar, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getNextStatus = (currentStatus: Task["status"]): Task["status"] | null => {
    switch (currentStatus) {
      case "todo": return "in-progress";
      case "in-progress": return "completed";
      case "completed": return "todo";
      default: return null;
    }
  };

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "todo": return "Start";
      case "in-progress": return "Complete";
      case "completed": return "Reopen";
      default: return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
          <Badge variant={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.description}
          </p>
        )}

        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Created: {formatDate(task.createdAt)}
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Due: {formatDate(task.dueDate)}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {nextStatus && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(task.id, nextStatus)}
              className="flex-1"
            >
              {getStatusLabel(task.status)}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(task)}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(task.id)}
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
