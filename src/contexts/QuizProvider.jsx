import { createContext, useEffect, useReducer } from "react"

const SECS_PER_QUESTION = 1;

const QuizContext = createContext();

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

function reducer(state, action) {
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
          highscore: state.points > state.highscore ? state.points : state.highscore,
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

function QuizProvider( {children }) {
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

    const question = questions.at(index);
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

    useEffect(() => {
        fetch('http://localhost:8000/questions')
        .then((res) => res.json())
        .then((data) => dispatch({type: "dataReceived", payload: data}))
        .catch((error) => dispatch({type: "DataFailed", payload: error.message}))
    }, [])

    const startQuiz = () => {
        dispatch({ type: 'start' })
    }

    const newAnswer = (answerIndex) => {
        dispatch({ type: 'newAnswer', payload: answerIndex })
    }

    const restartQuiz = () => {
        dispatch({ type: "restart" })
    }
    
    const nextQuestion = () => {
        dispatch({type: 'nextQuestion' })
    }

    const tick = () => {
        dispatch({ type: 'timer' })
    }

    const finishQuiz = () => {
        console.log("hello");
        dispatch({type: 'finish' })
    }


    return (
        <QuizContext.Provider value={{
            question,
            questions,
            numQuestions,
            maxPoints,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            error,
            startQuiz,
            newAnswer,
            restartQuiz,
            nextQuestion,
            tick,
            finishQuiz,
        }}>
            { children }
        </QuizContext.Provider>
    )
}


export { QuizContext, QuizProvider }