import React from "react";
const StudentQuizTile = (props) => {
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
      sch: props.quiz.schoolId,
      title: title,
      time: time,
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
      <li
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
      </li>
    </ul>
  );
};
export default StudentQuizTile;
