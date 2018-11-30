import * as React from 'react';
import { connect } from "react-redux";
import { history } from "../App";

interface IQuizItem {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface IQuizState {
    questions: IQuizItem[];
    currentQuestion: number | null;
}

interface IQuizProps {
    addToScore: () => void;
    clear: () => void;
    registerAnswer: (answer:[boolean, string]) => void;
}

class QuizComponent extends React.Component<IQuizProps, IQuizState> {

    public constructor(props:IQuizProps) {
        super(props);
        this.state = { questions: [], currentQuestion: null };
    }

    public async componentDidMount() {
        // Fetch new quiz data which will be cached
        __GET_QUESTIONS(false);
    }

    public async componentWillMount() {
        // Clear the app state whenever a new quiz begins
        this.props.clear();

        // Make a request to the global function to grab cached quiz data
        const json = await (await __GET_QUESTIONS()).json();

        if (json.response_code === 0) {
            this.setState({ ...this.state, ...{ questions: json.results, currentQuestion: 0 }});
        } else {
            alert(`Response from ${__API_URL} is ${json.response_code}`)
        }
    }

    public render() {
        return (this.state.currentQuestion !== null) ? this.renderQuizItem(this.state.currentQuestion) : <div>Loading</div>
    }

    private getItem(index:number) {
        return this.state.questions[index];
    }

    private registerAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
        if (this.state.currentQuestion !== null) {
            
            const answer = e.currentTarget.innerText;
            const item = this.getItem(this.state.currentQuestion);
            const correctAnswer = item.correct_answer;
            const answerIsCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
            
            if (answerIsCorrect) {
                this.props.addToScore();
            }

            this.props.registerAnswer([answerIsCorrect, parseText(item.question)]);

            if (this.state.currentQuestion === this.state.questions.length - 1) {
                history.push('/results');

            }

            this.setState( {...this.state, currentQuestion: this.state.currentQuestion + 1});
        }
    }

    private renderButton(text:string) {
        return <button onClick={this.registerAnswer}>{text}</button>
    }


    private renderQuizItem(index:number) {
        return (
            <div className="quiz">
                <h3>{parseText(this.getItem(index).category)}</h3>
                <div className="question">{parseText(this.getItem(index).question)}</div>
                <div style={{margin: "15px 0px"}}>{(this.state.currentQuestion) ? this.state.currentQuestion + 1 : 1} / {this.state.questions.length}</div>
                <div style={{margin: "15px 0px"}}>{this.renderButton('True')}{this.renderButton('False')}</div>
            </div>
        );
    }
}

const domParser = new DOMParser();

const parseText = (textWithSpecialChars:string) => {
    const normalString = domParser.parseFromString(textWithSpecialChars, 'text/html').body.textContent;
    return (normalString) ? normalString : "";
}

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        addToScore: () => dispatch({ type: 'ADD_TO_SCORE'}),
        clear: () => dispatch({ type: 'CLEAR'}),
        registerAnswer: (answer:[boolean, string]) => dispatch({ type: 'REGISTER_ANSWER', answer}) 
    };
}

const query = async (url:string) => {
    const promise = fetch(url);
    promise.catch((e) => alert(e));
    return promise;
}


// Fetch data without blocking, for fastest possible load
// and process the call when the component mounts
const __API_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
const __GET_QUESTIONS = async (cache = true) => {
    if (cache && __QUIZ_API_PROMISE) {
        return __QUIZ_API_PROMISE;
    }

    return __QUIZ_API_PROMISE = query(__API_URL);
}

let __QUIZ_API_PROMISE:Promise<Response>;
__QUIZ_API_PROMISE = __GET_QUESTIONS();


// Connect component to Redux Store
const Quiz = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizComponent)

export { Quiz };

