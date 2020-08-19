import React from "react";
const QuizOverView = (props) => {
  return (
    <div className="quizOverView">
      <div className="quiz-overview">
        <div className="overview-header">
          <p>{props.heading}</p>
        </div>
        <div className="overview-title">
          <h1>{props.data.title}</h1>
        </div>
        <div className="overview-question">
          <p>Total {props.type}</p>
          <p className="q-n">{props.data.n}</p>
        </div>
        <div className="overview-time">
          <p>You have:</p>
          <h3>{props.data.time}</h3>
          <p>Good luck</p>
        </div>
        <div className="start-btn">
          <button
            onClick={() =>
              props.linkTo(props.route, {
                quiz: props.data.id,
                sheet: props.data.sheet,
                time: props.data.rawTime,
                title: props.data.title,
                retry: props.data.retry,
              })
            }
          >
            Start
          </button>
          <button onClick={props.closeOverview}>cancel</button>
        </div>
      </div>
    </div>
  );
};
export default QuizOverView;
