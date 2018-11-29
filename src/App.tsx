import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from "react-redux";
import { Route, Router } from 'react-router';
import { createStore } from "redux";
import './App.css';
import { Home } from "./core/home";
import { Quiz } from "./core/quiz";

interface IAppState {
  value: number;
}

interface IAction {
  type: string;
}

const history = createBrowserHistory();

const defaultState= { value: 0 }

const reducer = (state:IAppState = defaultState, action:IAction) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, ...{value: state.value + 1}};
    case "DECREMENT":
      return { ...state, ...{value: state.value - 1}};
    default:
      return state;
  }
};

const store = createStore(reducer);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact={true} path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/quiz" component={Quiz} />
            {/* <Route path="/results" component={Connecter(Results)} */}
            {/* <div onClick={history.goBack}>Back</div> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
export { history }