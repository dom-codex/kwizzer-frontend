import React from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import QuizTile from "../sub-components/quiz-tile";
import "../../css/quizzes.css";
const QuizList = (props) => {
  const { user } = props;
  return (
    <section className="quizzes">
      <div className="showcase">
        <Header />
        <Jumbo title={"Quizzes"} />
      </div>
      <div className="quizzes-list">
        <div className="title">
          <h2>List</h2>
          <QuizTile user={user} showOverview={props.showOverView} />
        </div>
      </div>
    </section>
  );
};
export default QuizList;
