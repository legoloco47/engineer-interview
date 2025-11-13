import React from 'react'
import { Task } from '../ChallengeComponent';

type TaskCardProps = {
    task: Task;
    onMoveLeft: (taskId: string) => void;
    onMoveRight: (taskId: string) => void;
    canMoveLeft: boolean;
    canMoveRight: boolean;
}

function TaskCard({ task, onMoveLeft, onMoveRight, canMoveLeft, canMoveRight }: TaskCardProps) {
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg w-full gap-4">
        
        <button
          type="button"
          onClick={() => onMoveLeft(task.id)}
          disabled={!canMoveLeft}
          aria-label={`Move "${task.title}" left`}
          className={`w-10 h-10 rounded-md flex items-center justify-center text-white 
            ${canMoveLeft ? "bg-red-500 hover:bg-red-600 cursor-pointer" : "bg-red-300 cursor-not-allowed opacity-50"}
          `}
        >
          ←
        </button>
  
        <span className="flex-1 text-center text-lg">
          {task.title}
        </span>
  
        <button
          type="button"
          onClick={() => onMoveRight(task.id)}
          disabled={!canMoveRight}
          aria-label={`Move "${task.title}" right`}
          className={`w-10 h-10 rounded-md flex items-center justify-center text-white
            ${canMoveRight ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-green-300 cursor-not-allowed opacity-50"}
          `}
        >
          →
        </button>
  
      </div>
    );
  }

export default TaskCard;