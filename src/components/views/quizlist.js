import React, { useState } from "react";
import Header from "../sub-components/header";
import QuizEditor from "../sub-components/quiz-editor";
import "../../css/questionlist.css";
const QuizList = () => {
  const [isOpenEditor, openEditor] = useState(false);
  const showQuestionEditor = () => {
    openEditor((prevstate) => !prevstate);
  };
  return (
    <section className="quiz-editor">
      {isOpenEditor ? <QuizEditor closeEditor={showQuestionEditor} /> : ""}
      <Header />
      <div className="quiz-name-edit">
        <div className="name-quiz">
          <label for="quiz-name">Quiz name:</label>
          <input
            id="quiz-name"
            disabled
            type="text"
            value="dominic"
            maxLength="30"
          />
          <button>edit</button>
        </div>
      </div>
      <div className="question-header">
        <h2>Questions</h2>
        <p>Total: 50</p>
      </div>
      <hr />
      <div className="questions-list">
        <div className="questions-tile">
          <ul className="q-ul">
            <li>
              <div className="questions">
                <div className="quiz-nav">
                  <ul>
                    <li>
                      <button onClick={showQuestionEditor}>edit</button>
                    </li>
                  </ul>
                </div>
                <h4>Question</h4>
                <div>what is javascript ?</div>
                <h4>options</h4>
                <ul className="options-li">
                  <li>A language</li>
                  <li>A framework</li>
                  <li>A library</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default QuizList;
