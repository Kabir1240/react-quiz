import { useContext } from "react";
import { QuizContext } from "../contexts/QuizProvider";

export default function useQuiz(){
    const context = useContext(QuizContext);
    if(context === undefined) throw new Error("You cannot use this context outside of the QuizProvider");
    return context;
}
