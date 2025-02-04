import useQuiz from "../hooks/useQuiz";

export default function Options() {
    const { question, answer, newAnswer } = useQuiz();
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${answer === index ? "answer" : ""}
                        ${hasAnswered ? 
                            question.correctOption === index ? 
                            "correct" : 
                            "wrong" :
                        ""}`}
                    key={option} 
                    onClick={() => newAnswer(index)}
                    disabled={hasAnswered} >
                        {option}
                </button>
            ))}
        </div>
    )
}
