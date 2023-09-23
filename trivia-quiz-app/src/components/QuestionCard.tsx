import { FC, MouseEvent } from "react";
import { answerObject } from "../App";

type questionProps = {
    question: string;
    answers: string[];
    callback: (e: MouseEvent<HTMLButtonElement>) => void;
    userAnswer: answerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const questionCard: FC<questionProps> = ({question, answers, callback, userAnswer, questionNr, totalQuestions}) => {
    return (
        <div>
            <p className="number">Question: {questionNr} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <div>   
                {answers.map(answer => (
                    <div key={answer}>
                        <button disabled={!!userAnswer} onClick={callback} value={answer}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>

                ))}
            </div>
        </div>
    )   
}

export default questionCard