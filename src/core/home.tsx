import * as React from 'react';
// import { connect } from "react-redux";
import { history } from '../App';

const goToQuiz = () => {
    history.push('/quiz');
}

const Home = () => {
    return <div>
        <h2>Welcome to the Trivia Challenge!</h2>
    <   div onClick={goToQuiz}>Begin</div>
    </div>
}

export { Home };