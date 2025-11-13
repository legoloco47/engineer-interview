import { ColumnConfig, Task } from "../ChallengeComponent";

export const mockTasks: Task[] = [
  { id: "1", title: "Mow the Lawn", status: "TODO" },
  { id: "2", title: "Pull weeds", status: "IN_PROGRESS" },
  { id: "3", title: "Rake the leaves", status: "DONE" },
];

export const mockColumnConfig: ColumnConfig[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];