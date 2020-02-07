import * as actions from './types';
import { AddTodoAction } from '../types';

export const addTodo = (todo: string): AddTodoAction => ({
  type: actions.ADD_TODO,
  payload: todo
});
