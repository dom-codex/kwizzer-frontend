import React from "react";
const QuizTile = (props) => {
  const quiz = props.quiz;
  const LinkTo = () => {
    props.history.push(
      `/dashboard/quizzes/list?sid=${props.school}&quid=${quiz.ref}`
    );
  };
  return (
    <li>
      <div>{props.sn}</div>
      <div className="quiz-name">{quiz.title || quiz.name}</div>
      <div>{quiz.totalQuestions ? quiz.totalQuestions : 0}</div>
      <div>{quiz.published ? "true" : "false"}</div>
      <div className="showmore">
        ...
        <div className="show-more">
          {" "}
          <button onClick={LinkTo}>edit</button>
          <button onClick={props.publish}>publish</button>
          <button onClick={props.delete}>delete</button>
        </div>
      </div>
    </li>
  );
};
export default QuizTile;
