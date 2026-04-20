export type Task = {
  title: string;
  isDone: boolean;
  id: number;
};

export type TaskProps = {
  taskData: Task;
  handler: (action: ActionProps) => void;
};

export type ActionProps = { type: number; id?: number; title?: string };

export enum Actions {
  ADD_TASK,
  TOGGLE_TASK,
  REMOVE_TASK,
}