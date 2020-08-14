import React from "react";
import Header from "./header";
import Switch from "../sub-components/switch";
import "../../css/exam.css";
import QuizOverlay from "../sub-components/QuizOverlay";

const ExamForm = (props) => {
  const { state } = props;
  const { err } = state;
  console.log(err);
  return (
    <div className="examform">
      <div className="form-header">
        <h1>Quizzer</h1>
        <h2>{props.title}</h2>
      </div>

      <div className="new-exam-switch">
        <span>Type:</span>
        {!props.isedit && (
          <div>
            <span>Standard</span> &nbsp;{" "}
            <Switch
              toggle={state.switch}
              isExam={true}
              setToggle={props.toggle}
            />{" "}
            &nbsp;
            <span>Custom</span>
          </div>
        )}
        {props.isedit && <div>{state.type}</div>}
      </div>

      <div className="exam-form">
        <div className="exam-forms">
          <label>Name</label>
          <input
            type="text"
            value={state.title}
            onInput={(e) => props.textHandler(e, "title")}
            placeholder="exam name"
            style={err.title ? { borderColor: "red", borderWidth: "2px" } : {}}
          />
          <br />
          <small>{err.title ? err.title.msg : ""}</small>
        </div>
        <div className="exam-forms">
          <label>No of Quiz</label>
          <input
            type="number"
            value={state.nquiz}
            onInput={(e) => props.textHandler(e, "nquiz")}
            placeholder="no of quiz"
            style={err.nquiz ? { borderColor: "red", borderWidth: "2px" } : {}}
          />
          <small>{err.nquiz ? err.nquiz.msg : ""}</small>
        </div>
        <div className="exam-forms">
          <label>Total Marks</label>
          <input
            type="numbers"
            placeholder="total marks"
            value={state.total}
            onInput={(e) => props.textHandler(e, "total")}
            style={err.total ? { borderColor: "red", borderWidth: "2px" } : {}}
          />
          <small>{err.total ? err.total.msg : ""}</small>
        </div>
        <div className="exam-forms-duration">
          <span>Duration</span>
          <br />
          <input
            type="number"
            placeholder="hrs"
            onInput={(e) => props.textHandler(e, "hr")}
            value={state.hr}
            style={err.hr ? { borderColor: "red" } : {}}
          />
          <label>hrs</label>
          <input
            type="number"
            placeholder="min"
            onInput={(e) => props.textHandler(e, "min")}
            value={state.min}
            style={err.min ? { borderColor: "red" } : {}}
          />
          <label>min</label>
          <input
            type="number"
            placeholder="sec"
            onInput={(e) => props.textHandler(e, "sec")}
            value={state.sec}
            style={err.sec ? { borderColor: "red" } : {}}
          />
          <label>sec</label> <br />
        </div>
        {!props.edit && state.type !== "custom" && (
          <div className="exam-forms-result">
            <button
              onClick={() => props.selectQuiz(true)}
              className="select-btn"
            >
              select quiz
            </button>
          </div>
        )}
        {
          <div className="swi">
            <p>Retry</p>
            <Switch
              toggle={state.setRetry}
              isExam={true}
              forRetry={true}
              setToggle={() => props.dispatch({ type: "setRetry" })}
              handleInput={""}
            />
          </div>
        }
        {
          <div className={`max-retries ${state.setRetry ? "" : "zero"}`}>
            <div>
              <label for="max-retries">Max retries</label>
              <input
                type="number"
                id="max-retries"
                step="1"
                onChange={(e) =>
                  props.dispatch({ type: "retries", value: e.target.value })
                }
                value={state.retries}
                placeholder="maximum number of retries"
              />
            </div>
          </div>
        }
        <div className="exam-forms-result">
          <span>Deliver Result on submition</span>
          <br />
          <label>yes</label>
          <input
            type="radio"
            value="onsubmition"
            checked={state.choice === "onsubmition" ? true : false}
            onChange={() =>
              props.textHandler({ target: { value: "onsubmition" } }, "choice")
            }
          />
          <label>no</label>
          <input
            type="radio"
            value="manual"
            checked={state.choice === "manual" ? true : false}
            onChange={() =>
              props.textHandler({ target: { value: "manual" } }, "choice")
            }
          />
        </div>
        <div className="exam-btn">
          {props.isValidated ? (
            <button onClick={props.save}>SET</button>
          ) : (
            <button disabled={true}>set</button>
          )}
        </div>
      </div>
    </div>
  );
};
const Exam = (props) => {
  const { data } = props;
  return (
    <section>
      {!data.isLoading ? (
        <div>
          {data.isOpen && (
            <QuizOverlay
              action={data.setList}
              state={data.data.quiz}
              textHandler={props.checkboxHandler}
              quizzes={data.quizzes}
            />
          )}
          <Header />
          <div className="exam-content">
            <ExamForm
              title={props.title}
              toggle={props.toggle}
              isedit={props.isedit}
              dispatch={props.dispatch}
              selectQuiz={data.setList}
              textHandler={props.inputHandler}
              state={data.data}
              save={props.save}
              isValidated={props.isValidated}
            />
          </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </section>
  );
};

export default Exam;
