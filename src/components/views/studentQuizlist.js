import React, { useState, useEffect } from "react";
import QuizList from "../sub-components/studentQuizTile";
import QuizOverView from "../sub-components/quizOverview";
import { fetchData } from "../../utils/storage";
import "../../css/quiz-overview.css";
import "../../css/quizzes.css";
const pid = fetchData("person");
const StudentQuizList = (props) => {
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
      user: pid,
      retry: data.retry,
    });
  };
  const showOverView = (choice, data) => {
    setOverviewData(data);
    setShowOverview(choice);
  };
  const fetchRegisteredQuiz = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/student/get/quiz?pid=${pid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setQuizzes(data.quizzes);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchRegisteredQuiz, []);
  return (
    <div>
      {showOverview && (
        <QuizOverView
          data={overviewData}
          linkTo={linkTo}
          closeOverview={() => showOverView(false)}
        />
      )}
      {quizzes.length &&
        quizzes.map((quiz, i) => {
          return (
            <QuizList
              key={i}
              id={quiz.quiz.id}
              location={props.location}
              quiz={quiz.quiz}
              completed={quiz.completed}
              user={user}
              route={"/menu/questions"}
              showOverView={showOverView}
            >
              <li>created by : {quiz.school.name}</li>
              <li>Total questions: {quiz.nQuestions}</li>
            </QuizList>
          );
        })}
    </div>
  );
};
export default StudentQuizList;
