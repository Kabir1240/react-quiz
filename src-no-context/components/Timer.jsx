import { useEffect } from "react"

export default function Timer({ dispatch, secondsRemaining }) {
    useEffect(() => {
        if(secondsRemaining <= 0) return dispatch({ type: 'finish' })
        const id = setInterval(() => dispatch({ type: 'timer' }), 1000)
        return () => clearInterval(id);
    }, [secondsRemaining, dispatch])

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60

    return (
        <>
            {secondsRemaining > 0 && (
                <div className="timer">
                    {`${minutes < 10 ? '0' : ""}${minutes}:${seconds < 10 ? '0' : ""}${seconds}`}
                </div>
            )}
        </>
    )
}
