import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import LongTable from "../sub-components/longtable";
import Toast from "../sub-components/toast";
import "../../css/candidate.css";
const CandidateList = (props) => {
  const [candidates, setCandidates] = useState([]);
  const fetchCandidates = () => {
    const url = `http://localhost:3500/school/hall/all?sch=${props.param.sch}&quiz=${props.param.quiz} `;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setCandidates(data.hall);
      });
  };
  useEffect(fetchCandidates, []);
  return (
    <div className="candidates-list">
      <div className="list-body">
        <button onClick={props.closeList}>X</button>
        <div className="quiz-registered-title">
          <h2>{props.param.title}</h2>
          <p className="amt-reg">Total registered: {candidates.length || 0}</p>
        </div>
        <hr />
        <div className="candidates-table">
          <LongTable details={candidates} />
        </div>
      </div>
    </div>
  );
};
const PubTile = (props) => {
  const { quiz, registered } = props;
  return (
    <div className="pub-card">
      <div className="pub-card-body">
        <h3>{quiz.title}</h3>
        <div className="pub-card-item">
          <small>Time: </small>
          <span>
            {" "}
            {quiz.hours > 0 ? ` ${quiz.hours}hr(s) ` : ""}{" "}
            {quiz.minutes >= 0 && quiz.hours > 0 ? ` ${quiz.minutes}min ` : ""}
            {quiz.seconds} seconds
          </span>
        </div>
        <div className="pub-card-item">
          <small>No of Questions: </small>
          <span> {quiz.nQuestions}</span>
        </div>
        <div className="pub-card-item">
          <small>No of registered candidates: </small>
          <span> {registered}</span>
        </div>
      </div>
      <div className="pub-card-item-btn">
        <span>
          <button
            onClick={() => {
              props.getParam({
                sch: quiz.schoolId,
                quiz: quiz.id,
                title: quiz.title,
              });
              registered > 0 ? props.showList() : props.showToast();
            }}
          >
            candidates list
          </button>
        </span>
      </div>
    </div>
  );
};
const Published = (props) => {
  const [published, setPublished] = useState([]);
  const [showList, setShowList] = useState(false);
  const [param, setParam] = useState({ sch: "", quiz: "" });
  const [isToast, setToast] = useState(false);

  const fetchCandidates = () => {
    //pass the school refrence from outside
    const url = `http://localhost:3500/school/get/published?sch=${3}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPublished(data.quizzes);
      });
  };
  useEffect(fetchCandidates, []);
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
        <CandidateList param={param} closeList={() => setShowList(false)} />
      )}
      <div className="showcase">
        <Header />
        <Jumbo title={"Published  Quiz"} />
      </div>
      <div className="published-quiz-list">
        {published.length > 0
          ? published.map((pub) => {
              return (
                <PubTile
                  registered={pub.registered}
                  quiz={pub.quiz}
                  showList={() => setShowList(true)}
                  getParam={getParam}
                  showToast={() => setToast(true)}
                />
              );
            })
          : null}
      </div>
    </section>
  );
};
export default Published;
