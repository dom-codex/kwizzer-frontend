import React from "react";
const QuizTile = (props) => {
  const isStudent = props.user === "student";
  return (
    <div>
      <ul className="quizzes-list">
        <li>
          <div className="quiz-name">Virtualization</div>
          <div className="quizzes-controls">
            {!isStudent ? (
              <span>
                <button>edit</button>
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
