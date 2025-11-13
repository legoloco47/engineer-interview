import React from 'react'
import { ColumnConfig, MoveTaskDirection, Task } from '../ChallengeComponent'
import TaskColumn, { TaskColumnLoading } from './TaskColumn'
import TaskCreator from './TaskCreator';

type TaskBoardProps = {
    isLoading: boolean;
    columns: ColumnConfig[];
    tasks: Task[];
    onMoveTask: (taskId: string, direction: MoveTaskDirection) => void;
    onCreateTask: (taskTitle: string) => void;
}

function TaskBoard({ isLoading, columns, tasks, onMoveTask, onCreateTask }: TaskBoardProps) {
    return (
      <div id="task-board-container" className="h-full w-full overflow-x-auto overflow-y-hidden flex flex-col">
        <div className="flex flex-1 min-h-0 w-full flex-row justify-around gap-6 px-4 py-4">
          {isLoading ? (<TaskColumnLoading />) : (
            columns?.map((column, index) => (
            <div
              key={column.id}
              className="flex flex-col flex-1 max-w-[420px] min-w-[320px] h-full"
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
          )))}
        </div>
        <TaskCreator onCreateTask={onCreateTask} />
      </div>
    )
}

export default TaskBoard