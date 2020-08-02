import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Toast from "../sub-components/toast";
import Switch from "../sub-components/switch";
import ExamCandidatesWindow from "../sub-components/examCandidates";
import QuizCandidates from "../sub-components/quizCandidate";
import CandidateList from "../sub-components/appliedCandidatesList";
import "../../css/candidate.css";
const Published = (props) => {
  const sref = props.location.state.sref;
  const [candidates, setCandidates] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [exams, setExams] = useState([]);
  const [showList, setShowList] = useState(false);
  const [param, setParam] = useState({ sch: sref, quiz: "" });
  const [isToast, setToast] = useState(false);
  const [isExam, setSwitch] = useState(false);
  const fetchCandidates = () => {
    //pass the school refrence from outside
    let url = `http://localhost:3500/school/get/published?sch=${3}`;
    if (isExam) {
      url = `http://localhost:3500/school/get/examinations?sch=${sref}`;
    }
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (!isExam) {
          return setQuizzes(data.quizzes);
        }
        setExams(data.exams);
      });
  };
  const fetchRegCandidates = () => {
    let url = `http://localhost:3500/school/hall/all?sch=${param.sch}&quiz=${param.quiz} `;
    if (isExam) {
      url = `http://localhost:3500/school/get/exam/hallstudents?sch=${sref}&exam=${param.quiz}`;
    }
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setCandidates(data.students);
      });
  };
  useEffect(() => {
    if (showList) {
      fetchRegCandidates();
    } else {
      fetchCandidates();
    }
  }, [isExam, showList]);
  const getParam = (data) => {
    setParam(data);
  };
  return (
    <section className="candidates">
      {isToast && (
        <Toast
          isOpen={isToast}
          action={setToast}
          text={"No candidate has regisetered for the quiz"}
        />
      )}
      {showList && (
        <CandidateList
          candidates={candidates}
          param={param}
          isExam={isExam}
          closeList={() => setShowList(false)}
        />
      )}
      <div className="showcase">
        <Header />
        <Jumbo title={"Published  Quiz"} />
      </div>
      <div className="switch-cont">
        <span>Quiz</span>{" "}
        <Switch setToggle={setSwitch} toggle={isExam} handleInput={() => {}} />{" "}
        <span>Exam</span>
      </div>
      <div className="published-quiz-list">
        {!isExam ? (
          <QuizCandidates
            published={quizzes}
            showList={setShowList}
            setToast={setToast}
            getParam={getParam}
          />
        ) : (
          <ExamCandidatesWindow
            exams={exams}
            isExam={isExam}
            showList={setShowList}
            setToast={setToast}
            getParam={getParam}
          />
        )}
      </div>
    </section>
  );
};
export default Published;
