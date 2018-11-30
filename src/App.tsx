import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from "react-redux";
import { Route, Router } from 'react-router';
import { createStore } from "redux";
import './App.css';
import { Home } from "./core/home";
import { Quiz } from "./core/quiz";
import { Results } from "./core/results";

interface IAppState {
  score: number;
  answers: Array<[boolean, string]>;
}

interface IAction {
  type: string;
  answer: [boolean, string]; 
}

const history = createBrowserHistory();

const defaultState = { score: 0, answers: [] }

const reducer = (state:IAppState = defaultState, action:IAction) => {
  switch (action.type) {
    case "ADD_TO_SCORE":
      return { ...state, score: state.score + 1 };
    case "REGISTER_ANSWER":
      return { ...state, answers: state.answers.concat([action.answer]) };
    case "CLEAR":
      return defaultState;
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
          <div className="App">
            <Route exact={true} path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/results" component={Results} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
export { history }