
import TaskBoard from "@/components/TaskBoard";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Task Manager</h1>
        <p className="text-muted-foreground">Organize and track your tasks efficiently</p>
      </div>
      <TaskBoard />
    </div>
  );
};

export default Index;
