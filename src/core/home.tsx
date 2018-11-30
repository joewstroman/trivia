import * as React from 'react';
import { history } from '../App';

const goToQuiz = () => {
    history.push('/quiz');
}

const Home = () => {
    return <div style={{}}>
        <h3>Welcome to the Trivia Challenge!</h3>
        <div style={{margin: "75px 0px"}}>You will be presented with 10 True or False questions.</div>
        <div style={{margin: "75px 0px"}}>Can you Score 100%?</div>
        <button style={{margin: "10px 0px"}} onClick={goToQuiz}>Begin</button>
    </div>
}

export { Home };
