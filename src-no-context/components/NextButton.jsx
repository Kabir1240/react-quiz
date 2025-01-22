export default function NextButton({ dispatch, answer, index, numQuestions }) {
    if(answer === null) return null
    
    const isLastQuestion = index === numQuestions - 1
    const handleNextButton = () => {
        isLastQuestion ? dispatch({type: 'finish' }) : dispatch({type: 'nextQuestion' })
    }

    return (
        <button className="btn btn-ui" onClick={handleNextButton}>
            {isLastQuestion ? "Finish!": "Next"}
        </button>
    )
}
