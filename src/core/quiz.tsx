import * as React from 'react';
import { connect } from "react-redux";
// import { history } from '../App';


// Immediately invokes asynchronous api call when imported
const QUIZ_API_CALL = fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'); 

class QuizComponent extends React.Component<{}, {}> {
    // name the imports
    public constructor(props: any) {
        super(props);
        this.state = { questions: [] };
    }

    public async componentWillMount() {
        const json = await (await QUIZ_API_CALL).json();
        this.setState({ ...this.state, ...{ questions: json.results }});
    }

    public render() {
    return (
        <div>
            <div>QUIZ!</div>
        </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        addToScore: () => dispatch({ type: 'ADD_TO_SCORE'})
    };
}

const Quiz = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizComponent)

export { Quiz };