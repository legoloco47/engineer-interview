import { TaskStatus } from '../types';

// This will make it really easy to add new statuses to the flow. Especially ones that have more complex flow.
const STATUS_FLOW: Record<TaskStatus, { prev: TaskStatus | null; next: TaskStatus | null }> = {
  TODO: { prev: null, next: "IN_PROGRESS" },
  IN_PROGRESS: { prev: "TODO", next: "DONE" },
  DONE: { prev: "IN_PROGRESS", next: null },
};

export function getNextStatus(current: TaskStatus): TaskStatus | null {
  return STATUS_FLOW[current].next;
}

export function getPrevStatus(current: TaskStatus): TaskStatus | null {
  return STATUS_FLOW[current].prev;
}