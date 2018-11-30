import * as React from 'react';
import { connect } from "react-redux";
import { history } from "../App";


const results = ({ score, answers}: any) => {
    return (
        <div>
            <div>You Scored</div>
            <div>{score} / {answers.length}</div>
            {answers.map(renderQuestion)}
            <div onClick={restart}>Play Again?</div>
        </div>
    )
}

const renderQuestion = (answers:[boolean, string]) => {
    return <div>{answers[0].toString()} {answers[1]}</div>
}

const restart = () => {
    history.push('/home');
}

const mapStateToProps = ({score, answers}: any) => {
    return { score, answers };
}

const Results = connect(mapStateToProps)(results);

export { Results };