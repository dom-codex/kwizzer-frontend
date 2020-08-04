import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import QuizTile from "../sub-components/quiz-tile";
import Jumbo from "../sub-components/Jumbo";
import "../../css/scoreboard.css";
import Toast from "../sub-components/toast";
import Switch from "../sub-components/switch";
const ScoreBoard = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isToast, setToast] = useState(false);
  const ref = props.location.state.sref;
  const fetchAllQuiz = () => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        console.log(quizzes);
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
      {isToast && (
        <Toast
          isOpen={isToast}
          text={"No student has submitted!!!"}
          action={setToast}
        />
      )}
      <div className="showcase">
        <Header />
        <Jumbo title={"ScoreBoard"} />
      </div>
      <div className="selector">
        <span>Quiz</span>
        <Switch />
        <span>Exam</span>
      </div>
      {quizzes.length ? (
        quizzes.map((quiz) => {
          return (
            <QuizTile
              key={quiz.id}
              quiz={quiz}
              showOverview={props.showOverView}
              score={true}
              openResult={viewResults}
              showToast={setToast}
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
