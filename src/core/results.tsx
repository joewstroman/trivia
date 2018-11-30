import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from "react-redux";
import { history } from "../App";


const results = ({ score, answers}: any) => {
    return (
        <div>
            <div>You Scored</div>
            <div style={{marginBottom: "10px"}}>{score} / {answers.length}</div>
            {answers.map(renderQuestion)}
            <button style={{marginBottom: "10px"}} onClick={restart}>Play Again?</button>
        </div>
    )
}

const renderIcon = (correct:boolean) => {
    const icon = (correct) ? faCheck : faTimes;
    return <FontAwesomeIcon icon={icon} />
}
const renderQuestion = (answers:[boolean, string]) => {
    return <div key={answers[1]} style={{textAlign: 'left', margin: '15px 0px'}}>
    {renderIcon(answers[0])}
    <span style={{marginLeft: '8px'}}>{answers[1]}</span>
    </div>
}

const restart = () => {
    history.push('/home');
}

const mapStateToProps = ({score, answers}: any) => {
    return { score, answers };
}

const Results = connect(mapStateToProps)(results);

export { Results };