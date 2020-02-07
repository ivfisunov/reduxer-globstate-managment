import { ADD_TODO } from '../actions/types';
import { AddTodoAction } from '../types';

export const reducer = (
  state: string[] = [],
  action: AddTodoAction
): string[] => {
  switch (action.type) {
    case ADD_TODO:
      state.push(action.payload);
      return state;
    default:
      return state;
  }
};
