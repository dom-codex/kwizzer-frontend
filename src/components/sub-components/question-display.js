import React from "react";

const Questiondisplay = (props) => {
  return (
    <div className="question-area">
      <h4>Question {props.index}</h4>
      <p>{props.question}</p>
    </div>
  );
};

export default Questiondisplay;
