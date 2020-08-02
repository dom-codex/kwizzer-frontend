import React, { useState, useReducer, useEffect } from "react";
import Header from "./header";
import "../../css/exam.css";
let t;
const QuizOverlay = (props) => {
  const { state } = props;
  const quizzes = props.quizzes;
  let len;
  return (
    <div className="exam-quiz-overlay">
      <div className="quiz-overlay-content">
        <button onClick={() => props.action(false)}>close</button>
        <h2>Quiz list</h2>
        {quizzes.length &&
          quizzes.map((quiz, i) => {
            const values = Object.values(state).map((quid) => quid);
            len = values.length;
            t = values.length;
            const isChosed = values.some(
              (val) => parseInt(val) === parseInt(quiz.quiz.id)
            );
            return (
              <div className="overlay-input" key={i}>
                <label>{quiz.quiz.title}</label>

                <input
                  type="checkbox"
                  value={quiz.quiz.id.toString()}
                  checked={isChosed ? true : false}
                  onChange={(e) => props.textHandler(e, `quiz${i + 1}`)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const ExamForm = (props) => {
  const { state } = props;
  return (
    <div className="examform">
      <div className="form-header">
        <h1>Quizzer</h1>
        <h2>{props.title}</h2>
      </div>
      <div className="exam-form">
        <div className="exam-forms">
          <label>Name</label>
          <input
            type="text"
            value={state.title}
            onInput={(e) => props.textHandler(e, "title")}
            placeholder="exam name"
          />
        </div>
        <div className="exam-forms">
          <label>No of Quiz</label>
          <input
            type="number"
            value={state.nquiz}
            onInput={(e) => props.textHandler(e, "nquiz")}
            placeholder="no of quiz"
          />
        </div>
        <div className="exam-forms">
          <label>Total Marks</label>
          <input
            type="numbers"
            placeholder="total marks"
            value={state.total}
            onInput={(e) => props.textHandler(e, "total")}
          />
        </div>
        <div className="exam-forms-duration">
          <span>Duration</span>
          <br />
          <input
            type="number"
            placeholder="hrs"
            onInput={(e) => props.textHandler(e, "hr")}
            value={state.hr}
          />
          <label>hrs</label>
          <input
            type="number"
            placeholder="min"
            onInput={(e) => props.textHandler(e, "min")}
            value={state.min}
          />
          <label>min</label>
          <input
            type="number"
            placeholder="sec"
            onInput={(e) => props.textHandler(e, "sec")}
            value={state.sec}
          />
          <label>sec</label>
        </div>
        <div className="exam-forms-result">
          <button onClick={() => props.selectQuiz(true)} className="select-btn">
            select quiz
          </button>
        </div>
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
          <button onClick={props.save}>SET</button>
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
              state={data.inputState.quiz}
              textHandler={props.checkboxHandler}
              quizzes={data.quizzes}
            />
          )}
          <Header />
          <div className="exam-content">
            <ExamForm
              title={props.title}
              selectQuiz={data.setList}
              textHandler={props.inputHandler}
              state={data.inputState}
              save={props.save}
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
