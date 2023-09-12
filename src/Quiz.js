// Quiz.js
import React, { useState } from 'react';
import './Quiz.css'; // Import your CSS file with styles
import { data } from './Utils/utils'; // Import your JSON data

function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuestion = data[questionIndex];

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      // Correct answer
      setUserAnswer('correct');
      setScore(score + 1);
    } else {
      // Incorrect answer
      setUserAnswer('incorrect');
    }
  };

  const nextQuestion = () => {
    if (questionIndex < data.length - 1) {
      // Move to the next question
      setQuestionIndex(questionIndex + 1);
      setUserAnswer(null); // Reset user's answer
    } else {
      // Quiz completed; handle this case
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">Question {questionIndex + 1} / {data.length}</div>
        <div className="quiz-score">Score: {score}</div>
      </div>
      <Question
        question={currentQuestion}
        userAnswer={userAnswer}
        onAnswerClick={handleAnswerClick}
      />
      <button
        className={`next-button ${userAnswer ? '' : 'hidden'}`}
        onClick={nextQuestion}
      >
        Next Question
      </button>
    </div>
  );
}

function Question({ question, userAnswer, onAnswerClick }) {
  return (
    <div className="question">
      <h2>{decodeURIComponent(question.question)}</h2>
      <div className="options">
        {question.incorrect_answers.map((answer, index) => (
          <button
            key={index}
            className={`option-button ${
              userAnswer === 'correct'
                ? 'correct'
                : userAnswer === 'incorrect' && question.correct_answer === answer
                ? 'correct'
                : ''
            }`}
            onClick={() => onAnswerClick(answer)}
            disabled={userAnswer !== null}
          >
            {decodeURIComponent(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
