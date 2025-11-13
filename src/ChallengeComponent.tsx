import TaskBoard from "./components/TaskBoard";
import { TaskService } from "./services/taskService";
import { useTaskBoard } from "./hooks/useTaskBoard";

export function ChallengeComponent({ 
  taskService = new TaskService() 
}: { 
  taskService?: TaskService 
} = {}) {
  const { tasks, columns, isLoading, moveTask, createTask } = useTaskBoard(taskService);

  return (
      <div id='task-board-parent-container' className='flex flex-col h-screen overflow-hidden w-full'>
        <h1 id="task-board-title" className='text-3xl font-bold p-4 flex-shrink-0'>Welcome To The Every.io Code Challenge</h1>
        <div id="task-board-wrapper" className='border border-black shadow-lg rounded-[40px] flex-1 min-h-0 w-full p-6 mb-8'>
          <TaskBoard isLoading={isLoading} columns={columns} tasks={tasks} onMoveTask={moveTask} onCreateTask={createTask}/>
        </div>
      </div>
  );
}
