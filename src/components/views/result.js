import React, { useState, useEffect } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import "../../css/result.css";

const Tile = (props) => {
  const answeredCorrectly = props.answered - props.fails;
  return (
    <div className="stud-result">
      <div>
        <h2>{props.title}</h2>
        <p>Score: {props.score}</p>
        <p>
          Answered correctly:{" "}
          {props.answered - props.fails <= 0 ? 0 : answeredCorrectly}
        </p>
        <p>Failed: {props.fails}</p>
        <p>Percentage: {(props.score / props.total) * 100}%</p>
      </div>
      <div>
        <button>solutions</button>
      </div>
    </div>
  );
};
const Result = (props) => {
  const userIdentity = props.location.state;
  const [result, setResult] = useState([]);
  const getResults = () => {
    const url = `http://localhost:3500/school/student/check/result?pid=${userIdentity.pid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setResult(data.questionPapers);
      });
  };
  useEffect(getResults, []);
  return (
    <section className="result">
      <div className="showcase">
        <Header />
        <Jumbo title={"Results"} />
      </div>
      {result.length ? (
        result.map((r, i) => {
          return (
            <Tile
              key={i}
              title={r.title}
              answered={r.totalAnswered}
              fails={r.fails}
              score={r.score.$numberDecimal}
              total={r.totalMarks}
            />
          );
        })
      ) : (
        <h1>you dont have any result</h1>
      )}
    </section>
  );
};
export default Result;
