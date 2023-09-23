import { FC } from "react";

type questionProps = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
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
                    <div>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>

                ))}
            </div>
        </div>
    )   
}

export default questionCard