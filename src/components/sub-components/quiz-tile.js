import React from "react";
const QuizTile = (props) => {
  const quiz = props.quiz;
  const LinkTo = () => {
    props.history.push(
      `/dashboard/quizzes/list?sid=${props.school}&quid=${quiz.ref}`
    );
  };
  const openResult = props.openResult ? props.openResult : () => {};
  return (
    <div
      onClick={
        quiz.NumberOfSubmitted || quiz.noOfStudents
          ? openResult
          : props.score
          ? props.showToast
          : null
      }
    >
      <ul className="quizzes-list">
        <li>
          <div className="quiz-name">{quiz.title || quiz.name}</div>
          <div className="quizzes-controls">
            {!props.score && (
              <span>
                <button onClick={props.publish}>pub</button>
                <button onClick={LinkTo}>edit</button>
                <button onClick={props.delete}>delete</button>
              </span>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
export default QuizTile;
