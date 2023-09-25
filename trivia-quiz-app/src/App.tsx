import { MouseEvent, useState } from 'react'

import { fetchQuizQuestions } from './services/Api';
//components
import QuestionCard from './components/QuestionCard'
import Confetti from 'react-confetti';
// types
import { difficulty, questionState } from './services/Api';

export type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

import './App.sass'

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<questionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      // user answer
      const answer = e.currentTarget.value;

      // checking correctanswers
      const correct  = questions[number].correct_answer === answer;

      // adding score if true
      if (correct) setScore(score => score + 1);

      // save answer to array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prevState => [...prevState, answerObject])
    }
  }

  const nextQuestion = () => {
      // move onto next question
      const nextQuestion = number + 1

      if(nextQuestion === TOTAL_QUESTIONS){
          setGameOver(true);
      } else {
        setNumber(nextQuestion)
      }
  }

  return (
    <>
     <div className='App'>
        {/* { // pridat confetti compontn } */}
        {userAnswers.length === TOTAL_QUESTIONS ? (<Confetti />) : null}
        <div className='quiz-container'>
          {!gameOver ? <p className='score'>Score: {score}</p> : null}
          <h1>Trivia Web App Quiz</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start-quiz-button' onClick={startTrivia}>Start Quiz</button>
          ) : null}
          {loading && <p>Loading Questions...</p>}

          {!loading && !gameOver && (
            <QuestionCard 
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
          )}
          <div className='next-container'>
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 
              ? (
                <button className='next-question' onClick={nextQuestion}>→</button>
              ) : null
            }
          </div>
        </div>
     </div>
    </>
  )
}

export default App
