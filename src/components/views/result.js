import React, { useState, useEffect, useReducer } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Switch from "../sub-components/switch";
import { resulReducer } from "../../utils/studentResults";
import "../../css/result.css";

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
  const userIdentity = props.location.state;
  const [result, setResult] = useState([]);
  const [state, dispatch] = useReducer(resulReducer, {
    quizzes: [],
    exams: [],
    toggle: false,
  });
  const getExamResults = (quizzes) => {
    const url = `http://localhost:3500/school/student/myexams?pid=${userIdentity.pid}`;
    fetch(url)
      .then((res) => res.json())
      .then((exams) => {
        console.log(exams);
        dispatch({ type: "load", quizzes: quizzes, exams: exams.exams });
      });
  };
  const getResults = () => {
    const url = `http://localhost:3500/school/student/check/result?pid=${userIdentity.pid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // setResult(data.questionPapers);
        console.log(data);
        getExamResults(data.questionPapers);
      });
  };
  const linkTo = (data) => {
    props.history.push("/quiz/solutions", data);
  };
  useEffect(getResults, []);
  return (
    <section className="result">
      <div className="showcase">
        <Header />
        <Jumbo title={"Results"} />
      </div>
      <div>
        <span>standard</span>
        <Switch
          toggle={state.toggle}
          isExam={true}
          setToggle={() => dispatch({ type: "toggle" })}
        />
        <span>exam</span>
      </div>
      {state.toggle ? (
        state.exams.length ? (
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
          })
        ) : (
          <h1>no exam was found</h1>
        )
      ) : state.quizzes.length ? (
        state.quizzes.map((r, i) => {
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
        })
      ) : (
        <h1>you dont have any result</h1>
      )}
    </section>
  );
};
export default Result;
