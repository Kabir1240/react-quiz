import { useEffect, useReducer } from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // status can be: 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
  error: "",
}

function  reducer(state, action) {
  switch(action.type){
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state, 
        status: 'error', 
        error: action.payload
      }
    case 'start':
      return { 
        ...state, 
        status: 'active', 
        secondsRemaining: state.secondsRemaining = state.questions.length * SECS_PER_QUESTION }
    case 'newAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state, 
        answer: action.payload,
        points: 
          question.correctOption === action.payload ? 
          state.points + question.points : 
          state.points
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'finish':
      return { 
        ...state, 
        status: 'finished', 
        answer: null,
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case 'restart':
      return { 
        ...initialState, 
        questions: state.questions, 
        highscore: state.highscore, 
        status: 'ready' }
    case 'timer':
      return { ...state, secondsRemaining: state.secondsRemaining - 1 }
    default:
      throw new Error("Action not Recognized")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    error,
  } = state
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
    .then((res) => res.json())
    .then((data) => dispatch({type: "dataReceived", payload: data}))
    .catch((error) => dispatch({type: "DataFailed", payload: error.message}))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        { status === 'loading' && <Loader /> }
        { status === 'error' && <Error message={error} /> }
        { status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> }
        { status === 'active' && (
          <>
            <Progress 
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              points={points}
              maxPoints={maxPoints} />
            <Question 
              question={questions.at(index)} 
              dispatch={dispatch} 
              answer={answer} />
          </>
          )}
        { status === 'finished' && (
          <FinishScreen 
            dispatch={dispatch}
            points={points} 
            maxPoints={maxPoints}
            highscore={highscore} />
          )}
        <Footer>
          <NextButton 
            dispatch={dispatch} 
            answer={answer} 
            index={index} 
            numQuestions={numQuestions} />
          
          <Timer 
            dispatch={dispatch} 
            secondsRemaining={secondsRemaining} />
        </Footer>
      </Main>
    </div>
  );
}

export default App;
