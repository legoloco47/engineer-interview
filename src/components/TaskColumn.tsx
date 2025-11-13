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
    <div className='h-full w-full border border-blue-500'>
        <h2 className='p-2 text-2xl text-center'>{column.title}</h2>
        <div className='h-full w-full border border-green-500 gap-4 flex flex-col p-4'>
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