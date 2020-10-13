import React from "react";
import Styles from "../../css/studentQuizTile.module.css";
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
    <li className={Styles.examli}>
      <h1>{title}</h1>
      {props.children}
      <div>Time allocated: {time}</div>
      {!props.completed && (
        <button onClick={props.canStart ? () => showOverView(false) : null}>
          {props.canStart ? "take exam" : "cannot start exam now"}{" "}
        </button>
      )}
      {props.canRetake && props.completed && (
        <button onClick={() => showOverView(true)}>Retry</button>
      )}
      {props.completed && !props.canRetake && (
        <button disabled={true}>taken</button>
      )}
    </li>
  );
};
export default StudentQuizTile;
