import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import "../../css/candidate_result.css";
const CandidatesResults = (props) => {
  const [result, setResult] = useState([]);
  const { quizId } = props.location.state;
  const fetchResult = () => {
    const url = `http://localhost:3500/school/get/students/result?quiz=${quizId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data.result);
      });
  };
  const linkTo = (paper) => {
    props.history.push(`/quiz/solutions`, { question: paper });
  };
  const ApproveResults = () => {
    const url = `http://localhost:3500/school/approve/results?quiz=${quizId}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  };
  const ApproveSingleResult = (id) => {
    const url = `http://localhost:3500/school/approve/result?paper=${id}`;
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
                      <small>Name</small>:<span> {r.name}</span>
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
