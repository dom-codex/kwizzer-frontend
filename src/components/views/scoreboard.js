import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import QuizTile from "../sub-components/quiz-tile";
import Jumbo from "../sub-components/Jumbo";
import ScoreBoardHeader from "../sub-components/scoreboard-header";
import Table from "../sub-components/table";

import "../../css/scoreboard.css";

const ScoreBoard = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const ref = props.location.state.sref;
  const fetchAllQuiz = () => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        setQuizzes(quizzes);
      });
  };
  const viewResults = (id) => {
    props.history.push("/dashboard/mycandidates/result", { quizId: id });
  };
  useEffect(() => {
    fetchAllQuiz();
  }, []);
  return (
    <section className="scoreboard">
      <div className="showcase">
        <Header />
        <Jumbo title={"ScoreBoard"} />
      </div>
      {/*<div className="score-table">
        <ScoreBoardHeader title={"System architecture"} />
        <Table />
      </div>*/}
      {quizzes.length ? (
        quizzes.map((quiz) => {
          return (
            <QuizTile
              key={quiz.id}
              quiz={quiz}
              showOverview={props.showOverView}
              score={true}
              openResult={viewResults}
            />
          );
        })
      ) : (
        <h1>No quiz</h1>
      )}
    </section>
  );
};
export default ScoreBoard;
