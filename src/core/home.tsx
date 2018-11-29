import * as React from 'react';
// import { connect } from "react-redux";
import { history } from '../App';


const Home = () => {
    return <div>
        <h2>Welcome to the Trivia Challenge!</h2>
    <   div onClick={history.goBack}>Begin</div>
    </div>
}

// const mapStateToProps = () => {
//     return {};
// }

// const mapDispatchToProps = (dispatch:any) => {
//     return {
//         startQuiz: () => dispatch({ type: 'START_QUIZ'})
//     };
// }

// const connectedHome = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(home)

export { Home };