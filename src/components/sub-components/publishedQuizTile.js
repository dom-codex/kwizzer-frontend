import React from "react";
import QuizCandidate from "./quizCandidate";
const PubTile = (props) => {
  const { quiz, registered, isExam } = props;
  return (
    <div className="pub-card">
      <div className="pub-card-body">
        <h3>{isExam ? quiz.name : quiz.title}</h3>
        <div className="pub-card-item">
          <small>Time: </small>
          <span>
            {" "}
            {quiz.hours > 0 ? ` ${quiz.hours}hr(s) ` : ""}{" "}
            {quiz.minutes > 0 ? ` ${quiz.minutes}min ` : ""}
            {quiz.seconds} seconds
          </span>
        </div>
        <div className="pub-card-item">
          <small>{isExam ? "No of Quiz" : "No of Questions"}: </small>
          <span> {isExam ? quiz.nQuiz : quiz.nQuestions}</span>
        </div>
        <div className="pub-card-item">
          <small>No of registered candidates: </small>
          <span> {isExam ? quiz.noOfStudents : registered}</span>
        </div>
      </div>
      <div className="pub-card-item-btn">
        <span>
          <button
            onClick={() => {
              props.getParam({
                quiz: quiz.id,
                title: isExam ? QuizCandidate.name : quiz.title,
              });
              registered > 0 || (isExam && quiz.noOfStudents > 0)
                ? props.showList()
                : props.showToast();
            }}
          >
            candidates list
          </button>
        </span>
      </div>
    </div>
  );
};
export default PubTile;
