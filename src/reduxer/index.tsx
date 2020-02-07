import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type S = any;

interface ReduxerGlobal extends NodeJS.Global {
  store: S;
}
declare const global: ReduxerGlobal;

// Provider component
export class Provider extends React.Component<{ store: S }> {
  UNSAFE_componentWillMount(): void {
    global.store = this.props.store;
  }

  render(): React.ReactNode {
    return this.props.children;
  }
}

interface StoreType {
  getState: S;
  dispatch: (action: Function) => void;
  subscribe: (listener: () => void) => Function[];
}

// Create store object to manage global store
export const createStore = (reducer: Function, initialState: S): StoreType => {
  let currentState: S = initialState;
  const listeners: Function[] = [];

  // return current state tree
  const getState = (): S => currentState;

  // Dispatch an action
  const dispatch = (action: Function): void => {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };

  // adds listeners that will be called any time an action is dispatch
  const subscribe = (listener: () => void): Function[] => [
    ...listeners,
    listener
  ];

  return { getState, dispatch, subscribe };
};

// Connect props and actions to component
export const connect = (
  mapStateToProps: Function,
  mapDispatchToProps: Function
): Function => (Component: React.ComponentClass): Function => {
  return class extends React.Component {
    render(): JSX.Element {
      return (
        <Component
          {...mapStateToProps(global.store.getState())}
          {...mapDispatchToProps(global.store.dispatch)}
          {...this.props}
        />
      );
    }

    handleChange = (): void => {
      this.forceUpdate();
    };

    componentDidMount(): void {
      global.store.subscribe(this.handleChange);
    }
  };
};
