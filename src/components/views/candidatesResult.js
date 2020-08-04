import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import "../../css/candidate_result.css";
const CandidatesResults = (props) => {
  const [result, setResult] = useState([]);
  const { quizId, mode } = props.location.state;
  const isExam = mode === "exam";
  const fetchResult = () => {
    let url = `http://localhost:3500/school/get/students/result?quiz=${quizId}`;
    if (isExam) {
      url = `http://localhost:3500/school/exam/results?exam=${quizId}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data.result);
      });
  };
  const linkTo = (paper) => {
    props.history.push(`/quiz/solutions`, { question: paper, isExam: isExam });
  };
  const ApproveResults = () => {
    let url = `http://localhost:3500/school/approve/results?quiz=${quizId}`;
    if (isExam) {
      url = `http://localhost:3500/school/exam/approve/result?exam=${quizId}`;
    }
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  };
  const ApproveSingleResult = (id) => {
    let url = `http://localhost:3500/school/approve/result?paper=${id}`;
    if (isExam) {
      url = `http://localhost:3500/school/exam/approve/single?paper=${id}`;
    }
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  };
  useEffect(fetchResult, []);
  return (
    <section>
      <Header />
      <div className="results-topic">
        <h1>Results</h1>
        <small>total submitted: {result.length}</small>
        <div>
          <button onClick={ApproveResults}>Approve all results</button>
        </div>
      </div>
      <div className="result-content">
        <ul>
          {result.length ? (
            result.map((r) => {
              const correct = r.totalAnswered - r.fails;
              return (
                <li onClick={r.isComplete ? () => linkTo(r._id) : null}>
                  <div className="res-details">
                    <small>correct :{correct <= 0 ? 0 : correct}</small>
                    <small>fails: {r.fails}</small>
                    <small>total: {r.totalMarks}</small>
                    <small>
                      %:{" "}
                      {Math.round(
                        (r.score.$numberDecimal / r.totalMarks) * 100
                      )}
                    </small>
                  </div>
                  <div className="res-title">
                    <h2>Score</h2>
                  </div>
                  <div className="res-score">
                    <h2>{r.score.$numberDecimal}</h2>
                  </div>
                  <div className="res-owner">
                    <p>
                      <small>Name</small>:<span> {r.studentName}</span>
                    </p>
                    <button onClick={() => ApproveSingleResult(r._id)}>
                      approve
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <h1>no result yet</h1>
          )}
        </ul>
      </div>
    </section>
  );
};
export default CandidatesResults;
