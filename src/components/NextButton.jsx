import useQuiz from "../hooks/useQuiz"

export default function NextButton() {
    const { finishQuiz, nextQuestion, answer, index, numQuestions } = useQuiz();
    if(answer === null) return null
    
    const isLastQuestion = index === numQuestions - 1
    const handleNextButton = () => {
        isLastQuestion ? finishQuiz() : nextQuestion()
    }

    return (
        <button className="btn btn-ui" onClick={handleNextButton}>
            {isLastQuestion ? "Finish!": "Next"}
        </button>
    )
}
