
// To extend the task status (eg blocked), add it to the TaskStatus type.
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
