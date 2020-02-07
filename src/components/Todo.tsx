import React, { ChangeEvent } from 'react';
import { connect } from '../reduxer';
import { addTodo } from '../actions';
import { AddTodoAction } from '../types';

const mapStateToProps = (state: string[]): { todos: string[] } => {
  return {
    todos: state
  };
};

const mapDispatchToProps = (dispatch: Function): { addTodo: Function } => {
  return {
    addTodo: (text: string): AddTodoAction => dispatch(addTodo(text))
  };
};

interface TodoProps {
  title: string;
  todos: string[];
  addTodo: (text: string) => AddTodoAction;
}

interface TodoState {
  todoText: string;
}

class Todo extends React.Component<TodoProps, TodoState> {
  state: TodoState = {
    todoText: ''
  };

  updateText = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    e.preventDefault();
    this.setState({ todoText: value });
  };

  handleAddTodo = (): void => {
    if (this.state.todoText.length !== 0) {
      this.props.addTodo(this.state.todoText);
      this.setState({ todoText: '' });
    }
  };

  render(): React.ReactNode {
    return (
      <div>
        <label>{this.props.title}</label>
        <div>
          <input
            value={this.state.todoText}
            placeholder="Todo name"
            onChange={this.updateText}
          />
          <button onClick={this.handleAddTodo}>Add TODO</button>
          <ul>
            {this.props.todos.map((todo: string, id: number) => (
              <li key={id}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
