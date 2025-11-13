import React from 'react'
import { ColumnConfig, Task } from '../types'
import TaskCard from './TaskCard';

type TaskColumnProps = {
    column: ColumnConfig;
    tasks: Task[];
    onMoveLeft: (taskId: string) => void;
    onMoveRight: (taskId: string) => void;
    canMoveLeft: boolean;
    canMoveRight: boolean;
}

export function TaskColumnLoading() {
    return (
      <div
        id="task-column-loading"
        aria-label="Task column loading"
        className="flex h-full w-full flex-col items-center rounded-[12px] border border-gray-300 bg-white shadow-lg px-2 py-6"
      >
        <div className="flex flex-row gap-4 w-full h-full px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                relative overflow-hidden
                flex w-full h-full rounded-lg border border-gray-300 bg-gray-200
              "
            >
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r from-transparent via-white/60 to-transparent
                  animate-[shimmer_1.4s_infinite]
                "
              />
            </div>
          ))}
        </div>
  
        <style>
          {`
            @keyframes shimmer {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}
        </style>
      </div>
    );
  }

function TaskColumn({ column, tasks, onMoveLeft, onMoveRight, canMoveLeft, canMoveRight }: TaskColumnProps) {
  return (
    <div id={`task-column-container task-column-${column.id}`} 
        aria-label={`Task column for ${column.title}`}
        className="flex h-full w-full flex-col items-center rounded-[12px] border border-gray-300 bg-white shadow-lg px-2 py-6"
    >
        <h2 className='p-2 text-2xl text-center font-medium flex-shrink-0'>{column.title}</h2>
        <div id={`task-column-tasks-container task-column-tasks-container-${column.id}`} aria-label={`Tasks in ${column.title}`} 
            className='min-h-0 flex-1 w-full gap-4 flex flex-col p-4 overflow-y-auto'>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onMoveLeft={onMoveLeft}
                    onMoveRight={onMoveRight}
                    canMoveLeft={canMoveLeft}
                    canMoveRight={canMoveRight}
                />
            ))}
        </div>
    </div>
  )
}

export default TaskColumn