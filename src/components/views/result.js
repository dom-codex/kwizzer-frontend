import React, { useEffect, useReducer } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import { resulReducer } from "../../utils/studentResults";
import "../../css/result.css";
import { fetchData } from "../../utils/storage";
const person = fetchData("person");
const Tile = (props) => {
  const answeredCorrectly = props.answered - props.fails;
  const viewSolution = () => {
    props.viewSoln({ question: props.paperId });
  };
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
        <button onClick={viewSolution}>solutions</button>
      </div>
    </div>
  );
};
const Result = (props) => {
  const [state, dispatch] = useReducer(resulReducer, {
    exams: [],
  });
  const getExamResults = () => {
    const url = `http://localhost:3500/school/student/myexams?pid=${person}`;
    fetch(url)
      .then((res) => res.json())
      .then((exams) => {
        console.log(exams);
        dispatch({ type: "load", exams: exams.exams });
      });
  };
  /* const getResults = () => {
    const url = `http://localhost:3500/school/student/check/result?pid=${userIdentity.pid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // setResult(data.questionPapers);
        console.log(data);
        getExamResults(data.questionPapers);
      });
  };*/
  const linkTo = (data) => {
    props.history.push("/quiz/solutions", data);
  };
  useEffect(getExamResults, []);
  return (
    <section className="result">
      <div className="showcase">
        <Header />
        <Jumbo title={"Results"} />
      </div>
      {state.exams.length &&
        state.exams.map((r, i) => {
          return (
            <Tile
              key={i}
              title={r.title}
              answered={r.totalAnswered}
              fails={r.fails}
              score={r.score.$numberDecimal}
              total={r.totalMarks}
              paperId={r._id}
              viewSoln={linkTo}
            />
          );
        })}
    </section>
  );
};
export default Result;
