import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import "../../css/quizzes.css";
const QuizEditor = (props) => {
  return (
    <section className="quizzes">
      <div className="showcase">
        <Header />
        <Jumbo title={"Quizzes"} />
      </div>
      <div className="quizzes-list">
        <div className="title">
          <h2>List</h2>
        </div>
        <ul className="quizzes-list">
          <li>
            <div className="quiz-name">Virtualization</div>
            <div className="quizzes-controls">
              <button>edit</button>
              <button>delete</button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default QuizEditor;
