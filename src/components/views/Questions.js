import React from "react";
import "../../css/question.css";
const Question = () => {
  return (
    <section className="question">
      <div className="header">
        <h2>Virtualization</h2>
        <button>submit</button>
      </div>
      <div className="timer-cont">
        <p>2 : 30 : 00</p>
      </div>
      <div className="question-selector">
        <div className="question-list">
          <button>1</button>
          <button>2</button>
        </div>
        <p>1 / 40</p>
      </div>
      <div className="question-area">
        <h4>Question</h4>
        <p>What is virtualization?</p>
      </div>
      <div className="question-options">
        <ul>
          <li>
            <div>A</div>
            <div>A cloud computing term</div>
          </li>
          <li>
            <div>B</div>
            <div>A library</div>
          </li>
          <li>
            <div>C</div>
            <div>A framework</div>
          </li>
          <li>
            <div>D</div>
            <div>A language</div>
          </li>
        </ul>
      </div>
      <div className="question-controls">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </section>
  );
};
export default Question;
