import React, { useReducer, useState } from "react";
import Header from "../sub-components/header";
import Switch from "../sub-components/switch";
import Toast from "../sub-components/toast";
import "../../css/quizCreationModal.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const NewQuizWindow = (props) => {
  //  const sref = props.location.state.sref;
  //const [toggle, setToggle] = useState(false);
  const [isToast, setToast] = useState(false);
  const [text, setText] = useState("");
  const inputReducer = (state, action) => {
    let value;
    switch (action.type) {
      case "title":
        return {
          ...state,
          title: action.value,
        };
      case "mark":
        value = parseFloat(action.value);
        return {
          ...state,
          markPerQuestion: value,
          totalMarks: value * state.noOfQuestionForStud,
        };
      case "toanswer":
        value = parseInt(action.value);
        return {
          ...state,
          noOfQuestionForStud: value,
          totalMarks: state.markPerQuestion * value,
        };
      case "total":
        value = parseInt(action.value);
        return {
          ...state,
          totalMarks: value,
        };
      default:
        return state;
    }
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    title: "",
    markPerQuestion: "",
    noOfQuestionForStud: "",
    totalMarks: "",
    school: school,
  });
  const handleInput = (e, name) => {
    //  dispatch({ type: "Input", input: name, value: e.target.value });
  };
  const createQuiz = () => {
    const body = inputState;
    const url = "http://localhost:3500/school/class/create/quiz";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res.code === 200) {
          props.history.push(`/dashboard`);
          return;
        }
        if (res.code === 403) {
          setText(res.message);
          setToast(true);
        }
      });
  };
  return (
    <div className="new-quiz-window">
      {isToast && <Toast text={text} isOpen={isToast} action={setToast} />}
      <Header />
      <div className="new-quiz">
        <div className="new-quiz-header">
          <h1 className="app-title">Quizzer</h1>
          <h1 className="form-title">New Quiz </h1>
        </div>
        <div className="quiz-form">
          <div className="quiz-input">
            <label for="subject">Title</label>
            <input
              id="subject"
              type="text"
              value={inputState.title}
              onInput={(e) =>
                dispatch({ type: "title", value: e.target.value })
              }
              placeholder="course"
            />
          </div>
          <div className="quiz-input">
            <label for="mark">Mark per Question</label>
            <input
              id="mark"
              step="0.01"
              type="number"
              value={inputState.markPerQuestion}
              onInput={(e) => dispatch({ type: "mark", value: e.target.value })}
              placeholder="Mark(s) per question"
            />
          </div>
          <div className="quiz-input">
            <label for="mark">No of question to be answered</label>
            <input
              id="mark"
              type="number"
              value={inputState.noOfQuestionForStud}
              onInput={(e) =>
                dispatch({ type: "toanswer", value: e.target.value })
              }
              placeholder="No of questions to be answered"
            />
          </div>
          <div className="quiz-input">
            <label for="total">Total Marks</label>
            <input
              id="total"
              type="number"
              value={inputState.totalMarks}
              onInput={(e) =>
                dispatch({ type: "total", value: e.target.value })
              }
              placeholder="total quiz mark"
            />
          </div>
          {/*}   <div className="quiz-input time">
            <label for="time">Time</label>
            <input
              id="hr"
              type="number"
              value={inputState.hours}
              onInput={(e) => handleInput(e, "hours")}
              placeholder="hr"
            />
            <label for="hr">hr</label>
            <input
              id="min"
              type="number"
              value={inputState.min}
              onInput={(e) => handleInput(e, "min")}
              placeholder="min"
            />
            <label for="min">min</label>
            <input
              id="sec"
              type="number"
              value={inputState.sec}
              onInput={(e) => handleInput(e, "sec")}
              placeholder="sec"
            />
            <label for="s">sec</label>
          </div>
          <div className="quiz-radio">
            <label>Deliver result on submition</label>
            <div className="radio">
              <div className="radio1">
                <label for="yes">yes</label>
                <input
                  id="yes"
                  type="radio"
                  onChange={(e) => handleInput(e, "resultDelivery")}
                  name="choice"
                  value="onsubmit"
                />
              </div>
              <div className="radio1">
                <label for="no">no</label>
                <input
                  id="no"
                  type="radio"
                  onChange={(e) => handleInput(e, "resultDelivery")}
                  name="choice"
                  value="manual"
                />
              </div>
            </div>
          </div>
          {/*
          <div className="quiz-radio publish">
            <label>Publish Mode</label>
            <div className="radio">
              <div className="radio1">
                <label for="public">public</label>
                <input
                  id="public"
                  type="radio"
                  onChange={(e) => handleInput(e, "publish")}
                  name="publish"
                  value="public"
                />
              </div>
            </div>
          </div>
          {/*<div className="swi">
            <p>Retry</p>
            <Switch
              toggle={toggle}
              setToggle={setToggle}
              handleInput={handleInput}
            />
          </div>*/}
          {/*<div className={`max-retries ${toggle ? "" : "zero"}`}>
            <div>
              <label for="max-retries">Max retries</label>
              <input
                type="number"
                id="max-retries"
                onChange={(e) => handleInput(e, "retries")}
                placeholder="maximum number of retries"
              />
            </div>
          </div>*/}
        </div>
        <div className="create-btn">
          <button onClick={createQuiz}>create quiz</button>
        </div>
      </div>
    </div>
  );
};

export default NewQuizWindow;
