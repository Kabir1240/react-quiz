export default function Progress({ index, numQuestions, answer, points, maxPoints }) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p><strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong>/ {maxPoints}</p>
        </header>
    )
}
