import { produce } from "immer";
import { type ActionProps, Actions, type Task } from "../types";

export const reducer = (
  baseState: Task[],
  action: ActionProps,
): Task[] => {
  switch (action.type) {
    case Actions.ADD_TASK: {
      const drafts: Task[] = produce(
        baseState,
        (x: Task): Task => x,
      );

      return [...drafts, {
        id: Date.now(),
        title: action.title as string,
        isDone: false,
      }];
    }

    case Actions.TOGGLE_TASK: {
      return produce(baseState, (draft) => {
        const task = draft.find(({ id }) => id === action.id) as Task;
        task.isDone = !task.isDone;
      });
    }

    case Actions.REMOVE_TASK: {
      return produce(baseState, (draft) => {
        const taskIndex = draft.findIndex(({ id }) => id === action.id);
        draft.splice(taskIndex, 1);
      });
    }
  }

  return baseState;
};
