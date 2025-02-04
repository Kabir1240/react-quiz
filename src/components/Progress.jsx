import useQuiz from "../hooks/useQuiz"

export default function Progress() {
    const { index, numQuestions, answer, points, maxPoints } = useQuiz();
    
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p><strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong>/ {maxPoints}</p>
        </header>
    )
}
