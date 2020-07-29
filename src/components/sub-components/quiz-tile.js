import React from "react";
const QuizTile = (props) => {
  const quiz = props.quiz;
  const LinkTo = () => {
    props.history.push(
      `/dashboard/quizzes/list?sid=${props.school}&quid=${quiz.id}`,
      {
        school: props.school,
      }
    );
  };
  const openResult = props.openResult || null;
  return (
    <div onClick={() => openResult(quiz.id)}>
      <ul className="quizzes-list">
        <li>
          <div className="quiz-name">{quiz.title}</div>
          <div className="quizzes-controls">
            {!props.score && (
              <span>
                <button onClick={props.publish}>pub</button>
                <button onClick={LinkTo}>edit</button>
                <button>delete</button>
              </span>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
export default QuizTile;
