import TaskBoard from "./components/TaskBoard";
import { useEffect, useState } from "react";
import { mockColumnConfig, mockTasks } from "./data/mockData";
import { TaskService } from "./services/taskService";

// To extend the task status (eg blocked), add it to the TaskStatus type.
// helen: also think more because "Blocked" will probably have extra logic associated with it.

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

export type ColumnConfig = {
  id: TaskStatus;
  title: string;
};

export type MoveTaskDirection = "LEFT" | "RIGHT";

export function ChallengeComponent({ 
  taskService = new TaskService() 
}: { 
  taskService?: TaskService 
} = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function moveTask(taskId: string, direction: MoveTaskDirection) {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;
    let newStatus: TaskStatus = task.status;
    if (direction === "LEFT") {
      switch (task.status) {
        case "IN_PROGRESS":
          newStatus = "TODO";
          break;
        case "DONE":
          newStatus = "IN_PROGRESS";
          break;
        default:
          break;
      }
    } else if (direction === "RIGHT") {
      switch (task.status) {
        case "TODO":
          newStatus = "IN_PROGRESS";
          break;
        case "IN_PROGRESS":
          newStatus = "DONE";
          break;
        default:
          break;
      }
    }

    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  }

  function createTask(taskTitle: string) {
    setTasks(prev => [...prev, { id: Date.now().toString(), title: taskTitle, status: "TODO" }]);
  }

  useEffect(() => {
    // For now, have a timeout of 1 second to simulate an api FETCH call.
    async function loadData() {
      const [fetchedTasks, fetchedColumns] = await Promise.all([
        taskService.fetchTasks(),
        taskService.fetchColumns(),
      ]);
      
      setTasks(fetchedTasks);
      setColumns(fetchedColumns);
      setIsLoading(false);
    }
    
    loadData();
  }, []);

  return (
      <div id='task-board-parent-container' className='flex flex-col h-screen overflow-hidden w-full'>
        <h1 id="task-board-title" className='text-3xl font-bold p-4 flex-shrink-0'>Welcome To The Every.io Code Challenge</h1>
        <div id="task-board-wrapper" className='border border-black shadow-lg rounded-[40px] flex-1 min-h-0 w-full p-6 mb-8'>
          <TaskBoard isLoading={isLoading} columns={columns} tasks={tasks} onMoveTask={moveTask} onCreateTask={createTask}/>
        </div>
      </div>
  );
}
