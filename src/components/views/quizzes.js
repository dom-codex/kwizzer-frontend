import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import QuizTile from "../sub-components/quiz-tile";
import "../../css/quizzes.css";
const QuizList = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = props;
  //retrieve id(sch ref)
  const { search } = props.location;
  const id = search.split("=")[1];
  const fetchAllQuiz = () => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        setQuizzes(quizzes);
      });
  };
  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const publish = (id) => {
    const url = `http://localhost:3500/school/quiz/publish`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };
  return (
    <section className="quizzes">
      <div className="showcase">
        <Header />
        <Jumbo title={"Quizzes"} />
      </div>
      <div className="quizzes-list">
        <div className="title">
          <h2>List</h2>
          {!quizzes.length ? (
            <h1>NO quiz</h1>
          ) : (
            quizzes.map((quiz) => {
              return (
                <QuizTile
                  key={quiz.id}
                  school={id}
                  history={props.history}
                  quiz={quiz}
                  user={user}
                  showOverview={props.showOverView}
                  publish={() => publish(quiz.id)}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
export default QuizList;
