import TaskBoard from "./components/TaskBoard";
import { useEffect, useState } from "react";
import { mockColumnConfig, mockTasks } from "./test/mockData";

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

export function ChallengeComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([]);

  function moveTask(taskId: string, direction: MoveTaskDirection) {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;
    let newStatus: TaskStatus;
    if (direction === "LEFT") {
      newStatus = task.status === "TODO" ? "TODO" : task.status === "IN_PROGRESS" ? "TODO" : "DONE";
    } else if (direction === "RIGHT") {
      newStatus = task.status === "TODO" ? "IN_PROGRESS" : task.status === "IN_PROGRESS" ? "DONE" : "DONE";
    }
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: newStatus } : task));


    // Potential future todo:  use the enum value to get the new status so we do not have to hard code it

  }

  useEffect(() => {
    // make this an api call to get the tasks.
    // For now, have a timeout of 1 second to simulate the api call.
    setTimeout(() => {
      setTasks(mockTasks as Task[]);
      setColumns(mockColumnConfig as ColumnConfig[]);
    }, 1000);
  }, []);

  return (

      <div id='task-board-parent-container' className='flex flex-col h-screen overflow-hidden w-full border border-red-500'>
        <h1 id="task-board-title" className='text-3xl font-bold p-4'>Welcome To The Every.io Code Challenge</h1>
        <TaskBoard columns={columns} tasks={tasks} onMoveTask={moveTask}/>
      </div>
  );
}
