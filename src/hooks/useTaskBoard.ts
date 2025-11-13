import { useState, useCallback, useEffect } from 'react';
import { Task, MoveTaskDirection, ColumnConfig } from '../types';
import { getNextStatus, getPrevStatus } from '../utils/taskStatusTransitions';
import { TaskServiceInterface } from '../services/taskService';

export function useTaskBoard(taskService: TaskServiceInterface) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const moveTask = useCallback((taskId: string, direction: MoveTaskDirection) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newStatus = direction === "LEFT" 
      ? getPrevStatus(task.status)
      : getNextStatus(task.status);
    
    if (!newStatus) return;
    
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  }, [tasks]);

  const createTask = useCallback((title: string) => {
    setTasks(prev => [...prev, { 
      id: crypto.randomUUID(), 
      title, 
      status: "TODO" 
    }]);
  }, []);

  useEffect(() => {
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

  return { tasks, columns, moveTask, createTask, isLoading };
}