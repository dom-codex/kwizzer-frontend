import React, { useEffect, useReducer, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Loading from "../sub-components/Loading";
import { modeContext } from "../../context/mode";
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
  const { switchMode, setHeading } = useContext(modeContext);
  const [state, dispatch] = useReducer(resulReducer, {
    exams: [],
  });
  const [loading, setLoading] = useState(true);
  const getExamResults = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/student/myexams?pid=${person}`;
    fetch(url)
      .then((res) => res.json())
      .then((exams) => {
        dispatch({ type: "load", exams: exams.exams });
        setLoading(false);
      });
  };
  const linkTo = (data) => {
    props.history.push("/myexam/solutions", data);
  };
  useEffect(() => {
    setHeading("Results");
    switchMode(true);
    getExamResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="result">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {state.exams.length ? (
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
            <h1>no result found</h1>
          )}
        </div>
      )}
    </section>
  );
};
export default withRouter(Result);
