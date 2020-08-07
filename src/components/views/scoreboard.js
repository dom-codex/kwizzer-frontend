import React, { useEffect, useState } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import "../../css/scoreboard.css";
import Toast from "../sub-components/toast";
import ExamScore from "../sub-components/examScore";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const ScoreBoard = (props) => {
  const [isToast, setToast] = useState(false);
  const [Exams, setExams] = useState([]);
  /*const fetchAllQuiz = (exams) => {
    const url = `http://localhost:3500/school/class/quiz/all?sid=${ref}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const quizzes = res.quizzes;
        console.log(quizzes);
        setQuizzes(quizzes);
        setExams(exams);
      });
  };*/
  const fetchAllExams = () => {
    const url = `http://localhost:3500/school/get/exams?sch=${school}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setExams(data.exams);
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
      {
        <ExamScore
          quizzes={Exams}
          setToast={setToast}
          viewResults={viewResults}
        />
      }
    </section>
  );
};
export default ScoreBoard;
