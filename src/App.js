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

// custom hooks
import useQuiz from './hooks/useQuiz';

function App() {
  const { secondsRemaining, status, error } = useQuiz();

  return (
    <div className='app'>
      <Header />
      <Main>
        { status === 'loading' && <Loader /> }
        { status === 'error' && <Error message={error} /> }
        { status === 'ready' && <StartScreen /> }
        { status === 'active' && (
          <>
            <Progress />
            <Question />
          </>
          )}
        { status === 'finished' && (
          <FinishScreen />
          )}
        <Footer>
          <NextButton />
          
          { secondsRemaining >= 0 && status === 'active' && <Timer /> }
        </Footer>
      </Main>
    </div>
  );
}

export default App;
