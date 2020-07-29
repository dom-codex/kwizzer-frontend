import React, { useState, useReducer } from "react";
import Header from "../sub-components/header";
import Jumbo from "../sub-components/Jumbo";
import Menutile from "../sub-components/menu-tile";
import "../../css/dashboard.css";
import "../../css/quizCreationModal.css";
const NewQuizWindow = (props) => {
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "Input":
        return {
          ...state,
          ...action.input,
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
    resultDelivery: "",
    hours: "",
    min: "",
    sec: "",
    school: props.sid,
  });
  const handleInput = (e, name) => {
    switch (name) {
      case "title":
        dispatch({ type: "Input", input: { title: e.target.value } });
        break;
      case "permark":
        dispatch({ type: "Input", input: { markPerQuestion: e.target.value } });
        break;
      case "nquestion":
        dispatch({
          type: "Input",
          input: { noOfQuestionForStud: e.target.value },
        });
        break;
      case "tmarks":
        dispatch({ type: "Input", input: { totalMarks: e.target.value } });
        break;
      case "hr":
        dispatch({ type: "Input", input: { hours: e.target.value } });
        break;
      case "min":
        dispatch({ type: "Input", input: { min: e.target.value } });
        break;
      case "sec":
        dispatch({ type: "Input", input: { sec: e.target.value } });
        break;
    }
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
          props.close();
        }
      });
  };
  return (
    <div className="new-quiz-window">
      <div className="new-quiz">
        <button onClick={props.close} className="quiz-close">
          X
        </button>
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
              onInput={(e) => handleInput(e, "title")}
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
              onInput={(e) => handleInput(e, "permark")}
              placeholder="Mark(s) per question"
            />
          </div>
          <div className="quiz-input">
            <label for="mark">No of question to be answered</label>
            <input
              id="mark"
              type="number"
              value={inputState.noOfQuestionForStud}
              onInput={(e) => handleInput(e, "nquestion")}
              placeholder="No of questions to be answered"
            />
          </div>
          <div className="quiz-input">
            <label for="total">Total Marks</label>
            <input
              id="total"
              type="number"
              value={inputState.totalMarks}
              onInput={(e) => handleInput(e, "tmarks")}
              placeholder="total quiz mark"
            />
          </div>
          <div className="quiz-input time">
            <label for="time">Time</label>
            <input
              id="hr"
              type="number"
              value={inputState.hours}
              onInput={(e) => handleInput(e, "hr")}
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
                <input id="yes" type="radio" name="choice" value="true" />
              </div>
              <div className="radio1">
                <label for="no">no</label>
                <input id="no" type="radio" name="choice" value="false" />
              </div>
            </div>
          </div>
        </div>
        <div className="create-btn">
          <button onClick={createQuiz}>create quiz</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  const [quizModalIsOpen, setQuizModalIsOpen] = useState(false);
  const { search } = props.location;
  const id = search.split("=")[1]; //sch ref
  const schId = props.location.state.sch;
  const schRef = props.location.state.ref;
  const LinkTo = (route, id = "") => {
    props.history.push(route, { sref: id });
  };
  //get examiners id
  return (
    <section className="dashboard">
      {quizModalIsOpen ? (
        <NewQuizWindow sid={id} close={() => setQuizModalIsOpen(false)} />
      ) : (
        ""
      )}
      <div className="dashboard-contents">
        <div className="showcase">
          <Header />
          <Jumbo
            title={"Crystal Academy"}
            desc={"Do something amazing today"}
          />
        </div>
        <div className="dash-options">
          <Menutile
            title={"New Quiz"}
            action={() => setQuizModalIsOpen(true)}
          />
          <Menutile
            title={"Quizzes"}
            action={() => LinkTo(`/dashboard/quizzes?id=${id}`)}
          />
          <Menutile
            title={"Candidates"}
            action={() => LinkTo("/dashboard/candidates")}
          />
          <Menutile
            title={"Scoreboard"}
            action={() => LinkTo("/dashboard/scoreboard", schRef)}
          />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
