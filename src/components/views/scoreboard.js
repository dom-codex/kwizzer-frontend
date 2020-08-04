import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import "../../css/scoreboard.css";
import Toast from "../sub-components/toast";
import Switch from "../sub-components/switch";
import ExamScore from "../sub-components/examScore";
import QuizScore from "../sub-components/quizScore";
const ScoreBoard = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isToggle, setToggle] = useState(false);
  const [isToast, setToast] = useState(false);
  const [Exams, setExams] = useState([]);
  const ref = props.location.state.sref;
  const fetchAllQuiz = (exams) => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        console.log(quizzes);
        setQuizzes(quizzes);
        setExams(exams);
      });
  };
  const fetchAllExams = () => {
    const url = `http://localhost:3500/school/get/exams?sch=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        fetchAllQuiz(data.exams);
      });
  };
  const viewResults = (route, id, mode = "quiz") => {
    // props.history.push("/dashboard/mycandidates/result", { quizId: id });
    props.history.push(route, { quizId: id, mode: mode });
  };
  useEffect(() => {
    fetchAllExams();
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
        <Switch toggle={isToggle} setToggle={setToggle} isResult={true} />
        <span>Exam</span>
      </div>
      {!isToggle ? (
        <QuizScore
          quizzes={quizzes}
          setToast={setToast}
          viewResults={viewResults}
        />
      ) : (
        <ExamScore
          quizzes={Exams}
          setToast={setToast}
          viewResults={viewResults}
        />
      )}
    </section>
  );
};
export default ScoreBoard;
