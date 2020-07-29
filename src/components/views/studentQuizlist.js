import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import QuizList from "../sub-components/studentQuizTile";
import "../../css/quiz-overview.css";
import "../../css/quizzes.css";

const QuizOverView = (props) => {
  return (
    <div className="quizOverView">
      <div className="quiz-overview">
        <div className="overview-header">
          <h2>Quiz Time</h2>
        </div>
        <div className="overview-title">
          <h1>{props.data.title}</h1>
        </div>
        <div className="overview-question">
          <p>Total questions</p>
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
              props.linkTo("/menu/questions", {
                quiz: props.data.id,
                sch: props.data.sch,
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
const StudentQuizList = (props) => {
  const userIdentity = props.location.state;
  const { search } = props.location;
  const user = search.split("=")[1];
  const [showOverview, setShowOverview] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [overviewData, setOverviewData] = useState({
    title: "",
    time: "",
    rawTime: null,
    quesions: "",
    retry: false,
  });
  const linkTo = (route, data) => {
    props.history.push(route, {
      quiz: data.quiz,
      sch: data.sch,
      time: data.time,
      title: data.title,
      user: userIdentity,
      retry: data.retry,
    });
  };
  const showOverView = (choice, data) => {
    setOverviewData(data);
    setShowOverview(choice);
  };
  const fetchRegisteredQuiz = () => {
    const url = `http://localhost:3500/school/student/get/quiz?pid=${userIdentity.pid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setQuizzes(data.quizzes);
      });
  };
  useEffect(fetchRegisteredQuiz, []);
  return (
    <div>
      <Header />
      {showOverview && (
        <QuizOverView
          data={overviewData}
          linkTo={linkTo}
          closeOverview={() => showOverView(false)}
        />
      )}
      {quizzes.map((quiz, i) => {
        return (
          <QuizList
            key={i}
            location={props.location}
            quiz={quiz.quiz}
            completed={quiz.completed}
            sch={quiz.school}
            user={user}
            showOverView={showOverView}
          />
        );
      })}
    </div>
  );
};
export default StudentQuizList;
