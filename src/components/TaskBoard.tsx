import React from 'react'
import { ColumnConfig, MoveTaskDirection, Task } from '../ChallengeComponent'
import TaskColumn from './TaskColumn'

type TaskBoardProps = {
    columns: ColumnConfig[];
    tasks: Task[];
    onMoveTask: (taskId: string, direction: MoveTaskDirection) => void;
}

function TaskBoard({ columns, tasks, onMoveTask }: TaskBoardProps) {
    return (
      <div className="h-full w-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full w-full flex-row justify-around gap-6 px-4 py-4">
          {columns.map((column, index) => (
            <div
              key={column.id}
              className="flex flex-col flex-1 max-w-[420px] min-w-[320px]"
            >
              <TaskColumn
                column={column}
                tasks={tasks.filter(task => task.status === column.id)}
                onMoveLeft={(taskId) => onMoveTask(taskId, 'LEFT')}
                onMoveRight={(taskId) => onMoveTask(taskId, 'RIGHT')}
                canMoveLeft={index > 0}
                canMoveRight={index < columns.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
  

export default TaskBoard