import { ColumnConfig, Task } from "../ChallengeComponent";
import { mockColumnConfig, mockTasks } from "../data/mockData";

export interface TaskServiceInterface {
    fetchTasks(): Promise<Task[]>;
    fetchColumns(): Promise<ColumnConfig[]>;
}

export class TaskService implements TaskServiceInterface {
    async fetchTasks(): Promise<Task[]> {
      // In production, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockTasks;
    }
    
    async fetchColumns(): Promise<ColumnConfig[]> {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockColumnConfig;
    }
  }