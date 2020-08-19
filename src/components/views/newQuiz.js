import React, { useReducer, useState } from "react";
import Layout from "../sub-components/layout";
import Toast from "../sub-components/toast";
import Dialog from "../sub-components/dialog";
import "../../css/quizCreationModal.css";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const stylesheet = {
  backgroundColor: "red",
  color: "#fff",
};
const NewQuizWindow = (props) => {
  //  const sref = props.location.state.sref;
  //const [toggle, setToggle] = useState(false);
  const [isToast, setToast] = useState(false);
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
      case "dialog":
        return {
          ...state,
          showDialog: !state.showDialog,
          message: action.message,
        };
      case "toast":
        return {
          ...state,
          showToast: !state.showToast,
          message: action.message,
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
    showDialog: false,
    message: "",
    showToast: false,
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
          dispatch({ type: "dialog", message: "Quiz created succesfully!!!" });
          //props.history.push(`/dashboard`);
          return;
        }
        if (res.code === 403) {
          dispatch({ type: "toast", message: res.message });
          // setText(res.message);
          //  setToast(true);
        }
      });
  };
  return (
    <Layout>
      <section className="new-quiz-window">
        {inputState.showDialog && (
          <Dialog
            title={"Success"}
            text={"Quiz created sucessfully!!!"}
            action={() => props.history.push(`/dashboard`)}
          />
        )}
        {inputState.showToast && (
          <Toast
            text={inputState.message}
            isOpen={inputState.showToast}
            action={() => dispatch({ type: "toast", message: "" })}
            styles={stylesheet}
            animate={"showToast-top"}
            main={"toast-top"}
          />
        )}
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
                onInput={(e) =>
                  dispatch({ type: "mark", value: e.target.value })
                }
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
          </div>
          <div className="create-btn">
            <button onClick={createQuiz}>create quiz</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewQuizWindow;
