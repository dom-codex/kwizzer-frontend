import React, { useState } from "react";
import QuizList from "../views/quizzes";
import "../../css/quiz-overview.css";
const QuizOverView = (props) => {
  return (
    <div className="quizOverView">
      <div className="quiz-overview">
        <div className="overview-header">
          <h2>Quiz Time</h2>
        </div>
        <div className="overview-title">
          <h1>Virtualization</h1>
        </div>
        <div className="overview-question">
          <p>Total questions</p>
          <p className="q-n">40</p>
        </div>
        <div className="overview-time">
          <p>You have:</p>
          <h3>2hrs 30mins</h3>
          <p>Good luck</p>
        </div>
        <div className="start-btn">
          <button onClick={props.linkTo}>Start</button>
          <button onClick={props.closeOverview}>cancel</button>
        </div>
      </div>
    </div>
  );
};
const StudentQuizList = (props) => {
  const { search } = props.location;
  const user = search.split("=")[1];
  const [showOverview, setShowOverview] = useState(false);
  const showOverView = (choice) => {
    setShowOverview(choice);
  };
  const linkTo = (route) => {
    props.history.push(route);
  };
  return (
    <div>
      {showOverview && (
        <QuizOverView
          linkTo={() => linkTo("/menu/questions")}
          closeOverview={() => showOverView(false)}
        />
      )}
      <QuizList user={user} showOverView={() => showOverView(true)} />
    </div>
  );
};
export default StudentQuizList;
