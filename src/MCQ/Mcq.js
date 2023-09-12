import React, { useEffect, useState } from "react";
import "./Mcq.css";
import { data } from "../Utils/utils";
import ReactStars from "react-stars";
import LoadingBar from "react-top-loading-bar";
import ProgressBar from "@ramonak/react-progress-bar";
const Mcq = () => {
  const [progress, setProgress] = useState(0);
  const [choices, setChoices] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionCounter, setQuestionCounter] = useState(data[0]);
  const [correctAns, setCorrectAns] = useState("");
  const [incorrectAns, setIncorrectAns] = useState("");
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  useEffect(() => {
    var shuffledArray = [];
    var arr = questionCounter?.incorrect_answers.concat(
      questionCounter?.correct_answer
    );
    shuffledArray = decodeURIComponent(arr).split(",");
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setChoices(shuffledArray);
    if (questionNumber === 20) setQuestionNumber(0);
  }, [questionNumber, questionCounter]);
  const checkAnswer = (item) => {
    if (item === decodeURIComponent(questionCounter.correct_answer))
      {
        setScore(score+(1/20 * maxScore))
        setCorrectAns(item);
      }
    if (decodeURIComponent(questionCounter.incorrect_answers).includes(item)) {
      setMaxScore(maxScore-(1/20 * maxScore))
      setIncorrectAns(item);
      setCorrectAns(decodeURIComponent(questionCounter.correct_answer));
    }
  };
  return (
    <div className="ParentDiv">
      <LoadingBar
        color="#a9aaa9"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={10}
      />
      <div>
        <h1 style={{ margin: "5px 0px" }}>
          Question {questionNumber === 0 ? 20 : questionNumber} of {data.length}
        </h1>
        <h4 style={{ margin: "0px" }}>
          {decodeURIComponent(questionCounter.category)}
        </h4>
        <ReactStars
          count={5}
          size={15}
          value={ questionCounter.difficulty === "easy" ? 1 : questionCounter.difficulty === "medium" ? 2 : 3}
          color2={"#000000"}
          edit={false}
        />
        <h3>{decodeURIComponent(questionCounter.question)}</h3>
      </div>
      <div className="Choices">
        {choices.map((item, index) => {
          return (
            <button
              key={index}
              id="btn"
              onClick={() => {
                checkAnswer(item, index);
              }}
              className={correctAns === item ? "correct" : incorrectAns === item ? "incorrect" : "default"}
              disabled={correctAns || incorrectAns === item ? true : false}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="ChildDiv">
        <h2 className="feedback">
          {incorrectAns ? "Sorry!" : correctAns ? "Correct!" : ""}
        </h2>
        {(correctAns || incorrectAns) && (
          <button
            className="NextBtn"
            onClick={() => {
              setQuestionCounter(data[questionNumber]);
              setCorrectAns("");
              setIncorrectAns("");
              setProgress(progress + 5);
              setQuestionNumber(questionNumber + 1);
            }}
          >
            Next Question
          </button>
        )}
      </div>
      <div style={{ width: "100%" , marginTop:"auto"}}>
      <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
        <h3>Score: {Math.ceil(score)}%</h3>
        <h3>Max Score: {Math.ceil(maxScore)}%</h3>
      </div>
        <ProgressBar completed={score} maxCompleted={maxScore} customLabel="&nbsp;" bgColor="black"
        />
      </div>
    </div>
  );
};
export default Mcq;