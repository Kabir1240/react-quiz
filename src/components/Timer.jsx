import { useEffect } from "react"
import useQuiz from "../hooks/useQuiz";

export default function Timer() {
    const { tick, finishQuiz, secondsRemaining } = useQuiz();
    
    useEffect(() => {
        if(secondsRemaining === 0) {
            finishQuiz();
            return;
        }
        const id = setInterval(tick, 1000)
        return () => clearInterval(id);
    }, [secondsRemaining, finishQuiz, tick])

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60

    return (
        <div className="timer">
            {`${minutes < 10 ? '0' : ""}${minutes}:${seconds < 10 ? '0' : ""}${seconds}`}
        </div>
    )
}
