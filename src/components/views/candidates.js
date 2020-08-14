import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Toast from "../sub-components/toast";
import ExamCandidatesWindow from "../sub-components/examCandidates";
import CandidateList from "../sub-components/appliedCandidatesList";
import "../../css/candidate.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const Published = (props) => {
  const sref = props.location.state.sref;
  const [candidates, setCandidates] = useState([]);
  const [exams, setExams] = useState([]);
  const [showList, setShowList] = useState(false);
  const [param, setParam] = useState({ sch: sref, quiz: "" });
  const [isToast, setToast] = useState(false);
  const fetchExams = () => {
    //pass the school refrence from outside
    /*let url = `http://localhost:3500/school/get/published?sch=${3}`;*/

    let url = `http://localhost:3500/school/get/examinations?sch=${school}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        setExams(data.exams);
      });
  };
  const fetchRegCandidates = (id) => {
    /* let url = `http://localhost:3500/school/hall/all?sch=${param.sch}&quiz=${param.quiz} `;*/

    const url = `http://localhost:3500/school/get/exam/hallstudents?sch=${school}&exam=${id}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setCandidates(data.students);
      });
  };
  const getParam = (data) => {
    setParam(data);

    fetchRegCandidates(data.quiz);
  };
  useEffect(() => {
    fetchExams();
  }, []);
  return (
    <section className="candidates">
      {isToast && (
        <Toast
          isOpen={isToast}
          action={setToast}
          text={"No candidate has regisetered for the quiz"}
          animate={"showToast-top"}
          main={"toast-top"}
          top={{ top: "25px" }}
        />
      )}
      {showList && (
        <CandidateList
          candidates={candidates}
          param={param}
          closeList={() => setShowList(false)}
        />
      )}
      <div className="showcase">
        <Header />
        <Jumbo title={"Published  Quiz"} />
      </div>

      <div className="published-quiz-list">
        <ExamCandidatesWindow
          exams={exams}
          isExam={true}
          showList={setShowList}
          setToast={setToast}
          getParam={getParam}
        />
      </div>
    </section>
  );
};
export default Published;
