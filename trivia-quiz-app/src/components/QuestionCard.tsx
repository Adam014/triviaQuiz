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
        <div className="quiz">
            <p className="number">Question: {questionNr} / {totalQuestions}</p>
            <p className="question" dangerouslySetInnerHTML={{__html: question}}></p>
            <div className="answers">   
                {answers.map(answer => (
                    <div key={answer} className="answer">
                        <button disabled={!!userAnswer} onClick={callback} value={answer} className="answer-button">
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>

                ))}
            </div>
        </div>
    )   
}

export default questionCard