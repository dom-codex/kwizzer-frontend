import React from "react";
const StudentQuizTile = (props) => {
  console.log(props);
  const hours = props.quiz.hours;
  const minutes = props.quiz.minutes;
  const seconds = props.quiz.seconds;
  const title = props.title;
  const n = props.n;
  const time = `${hours > 0 ? hours + " hour(s)" : ""} 
      ${parseInt(minutes) > 0 ? minutes + " minute(s)" : ""}
      ${seconds + " seconds"}
  `;
  const showOverView = (isretry) => {
    const rawTime = {
      hr: hours,
      min: minutes,
      sec: seconds,
    };
    const data = {
      id: props.id,
      title: title,
      time: time,
      sheet: props.sheet,
      rawTime: rawTime,
      n: n,
      retry: isretry,
    };
    props.showOverView(true, data);
  };
  return (
    <ul className="student-quiz-controls">
      <li>
        <h1>{title}</h1>
      </li>
      {props.children}
      <li>Time allocated: {time}</li>
      {props.isExam && (
        <button onClick={props.completed ? null : () => showOverView(false)}>
          {props.completed ? "taken" : "take exam"}
        </button>
      )}
      {/*<li
        className={
          props.completed && props.quiz.canRetake
            ? "take-quiz"
            : "take-quiz disabled"
        }
      >
        {
          <button
            onClick={
              !props.completed
                ? () => showOverView(false)
                : props.completed && props.quiz.canReTake
                ? () => showOverView(true)
                : null
            }
          >
            {!props.completed
              ? "take quiz"
              : props.completed && props.quiz.canReTake
              ? "retake"
              : "Already taken"}
          </button>
        }
      </li>*/}
    </ul>
  );
};
export default StudentQuizTile;
