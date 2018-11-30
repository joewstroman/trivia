import * as React from 'react';
import { connect } from "react-redux";
import { history } from "../App";

interface IQuizJson {
    response_code: number;
    results: IQuizItem[];
}

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
    addToScore: () => void
    registerAnswer: (answer:[boolean, string]) => void
    score: number;
}

class QuizComponent extends React.Component<IQuizProps, IQuizState> {
    public constructor(props:IQuizProps) {
        super(props);
        this.state = { questions: [], currentQuestion: null };
    }

    public async componentWillMount() {
        if (!__QUIZ_JSON) {
            __QUIZ_JSON = await (await __GET_QUESTIONS()).json();
        }

        if (__QUIZ_JSON.response_code === 0) {
            this.setState({ ...this.state, ...{ questions: __QUIZ_JSON.results, currentQuestion: 0 }});
        } else {
            alert(`Response from ${__API_URL} is ${__QUIZ_JSON.response_code}`)
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
            <div>
                <div>{parseText(this.getItem(index).category)}</div>
                <div>{parseText(this.getItem(index).question)}</div>
                <div>{(this.state.currentQuestion) ? this.state.currentQuestion + 1 : 1} / {this.state.questions.length}</div>
                <div>{this.renderButton('True')}{this.renderButton('False')}</div>
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

const __GET_QUESTIONS = async () => {
    if (__QUIZ_API_PROMISE) {
        return __QUIZ_API_PROMISE;
    }

    return __QUIZ_API_PROMISE = query(__API_URL);
}

const __API_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
let __QUIZ_API_PROMISE:Promise<Response>;
let __QUIZ_JSON:IQuizJson;
__QUIZ_API_PROMISE = __GET_QUESTIONS();



const Quiz = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizComponent)

export { Quiz };

