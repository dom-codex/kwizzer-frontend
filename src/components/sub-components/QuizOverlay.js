import React from "react";

const QuizOverlay = (props) => {
  const { state } = props;
  const quizzes = props.quizzes;
  let len;
  return (
    <div className="exam-quiz-overlay">
      <div className="quiz-overlay-content">
        <button onClick={props.action}>close</button>
        <h2>Quiz list</h2>
        {quizzes.length &&
          quizzes.map((quiz, i) => {
            console.log(state);
            const isChosed = state.some(
              (val) => parseInt(val) === parseInt(quiz.quiz.id)
            );
            return (
              <div className="overlay-input" key={i}>
                <label>{quiz.quiz.title}</label>

                {
                  <input
                    type="checkbox"
                    value={quiz.quiz.id.toString()}
                    checked={isChosed ? true : false}
                    onChange={(e) => props.textHandler(e, `quiz${i + 1}`)}
                  />
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default QuizOverlay;
