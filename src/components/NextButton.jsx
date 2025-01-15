export default function NextButton({ dispatch, answer, index, numQuestions }) {
    if(answer === null) return null
    return (
        <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion' })}>
            {index === numQuestions - 1 ? "Finish!": "Next"}
        </button>
    )
}
