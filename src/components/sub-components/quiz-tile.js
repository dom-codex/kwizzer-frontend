import React from "react";
const QuizTile = (props) => {
  const isStudent = props.user === "student";
  const quiz = props.quiz;
  const LinkTo = () => {
    props.history.push(
      `/dashboard/quizzes/list?sid=${props.school}&quid=${quiz.id}`,
      {
        school: props.school,
      }
    );
  };
  const publish = (quiz, school) => {
    const url = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {});
  };
  return (
    <div>
      <ul className="quizzes-list">
        <li>
          <div className="quiz-name">{quiz.title}</div>
          <div className="quizzes-controls">
            {!isStudent ? (
              <span>
                <button onClick={() => publish(quiz.id, props.school)}>
                  pub
                </button>
                <button onClick={LinkTo}>edit</button>
                <button>delete</button>
              </span>
            ) : (
              <ul className="student-quiz-controls">
                <li>created by : Crystal academy</li>
                <li>Total questions: 40</li>
                <li>Time allocated: 2hrs 30mins</li>
                <li className="take-quiz">
                  <button onClick={props.showOverview}>Take quiz</button>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
export default QuizTile;
