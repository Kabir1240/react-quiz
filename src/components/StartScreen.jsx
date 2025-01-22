import useQuiz from "../hooks/useQuiz"

export default function StartScreen() {
    const { startQuiz, numQuestions } = useQuiz();

    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} questions to test your react mastery</h3>
            <button className="btn btn-ui" onClick={startQuiz}>Let's Start</button>
        </div>
    )
}
