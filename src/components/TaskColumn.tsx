import React from 'react'
import { ColumnConfig, Task } from '../ChallengeComponent'
import TaskCard from './TaskCard';

type TaskColumnProps = {
    column: ColumnConfig;
    tasks: Task[];
    onMoveLeft: (taskId: string) => void;
    onMoveRight: (taskId: string) => void;
    canMoveLeft: boolean;
    canMoveRight: boolean;
}

function TaskColumn({ column, tasks, onMoveLeft, onMoveRight, canMoveLeft, canMoveRight }: TaskColumnProps) {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-[12px] border border-gray-300 bg-white shadow-lg px-8 py-6">
        <h2 className='p-2 text-2xl text-center font-medium'>{column.title}</h2>
        <div className='h-full w-full gap-4 flex flex-col p-4'>
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