import React from 'react';
import { Provider, createStore } from '../reduxer';
import { reducer } from '../reducer';
import Todo from './Todo';

const store = createStore(reducer, []);

class App extends React.Component {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <h1>Hi there</h1>
        <Todo />
      </Provider>
    );
  }
}

export default App;
