import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import Toast from "../sub-components/toast";
import "../../css/questionlist.css";
import { inputReducer, saveEditedQuiz } from "../../utils/quizEditorController";
import { fetchData } from "../../utils/storage";
const error = {
  backgroundColor: "red",
  color: "#fff",
};
const school = fetchData("school");
const QuestionTile = (props) => {
  const goToEditor = (question, quiz) => {
    props.history.push(`/dashboard/question/${quiz}/?new=false&qu=${question}`);
  };
  return (
    <div className="questions-tile">
      <ul className="q-ul">
        <li>
          <div className="questions">
            <div className="quiz-nav">
              <button className="question-delete-btn">Delete</button>
              <button
                className="question-edit-btn"
                onClick={() => goToEditor(props.id, props.quiz)}
              >
                edit
              </button>
            </div>
            <h4>Question</h4>
            <div>{props.question}</div>
            <h4>options</h4>
            <ul className="options-li">
              {props.options.map((option) => {
                return (
                  <li key={option.option}>
                    {option.option} {option.isAnswer ? " (answer)" : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};
const QuizList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [quiz, dispatch] = useReducer(inputReducer, {
    name: "",
    total: "",
    mark: "",
    nQuestions: "",
    showToast: false,
    hasErr: false,
    message: "",
  });
  //retrieve necessary params
  const { search } = props.location;
  const quid = search.split("quid=")[1];
  //const { school } = props.location.state;
  //const sid = search.split("sid=")[1].split("&")[0];
  const getQuiz = () => {
    const url = `${process.env.REACT_APP_HEAD}/school/class/questions/all?quid=${quid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions(data.questions);
        dispatch({ type: "prefill", values: data.quiz });
      });
  };
  useEffect(getQuiz, []);
  return (
    <section className="quiz-editor">
      <Toast
        isOpen={quiz.showToast}
        action={() => dispatch({ type: "toast" })}
        text={quiz.message}
        styles={quiz.hasErr ? error : {}}
        animate={"showToast-top"}
        main={"toast-top"}
        top={{ top: "25px" }}
      />
      <button className="create-fab">
        <Link to={`/dashboard/question/${quid}/?new=true&quid=${quid}`}>+</Link>
      </button>
      <div className="quiz-name-edit">
        <div className="name-quiz design-1">
          <label htmlFor="quiz-name">Quiz name:</label>

          <input
            id="quiz-name"
            type="text"
            value={quiz.name}
            onChange={(e) => dispatch({ type: "title", value: e.target.value })}
            maxLength="30"
          />
        </div>
        <div className="num-to-ans design-1">
          <label htmlFor="nQuest">To answer</label>
          <input
            type="number"
            id="nQuest"
            value={quiz.nQuestions}
            onChange={(e) =>
              dispatch({ type: "toanswer", value: e.target.value })
            }
          />
        </div>
        <div className="mark-per-question design-1">
          <label htmlFor="perMark">Mark(s) per question</label>
          <input
            type="number"
            id="perMark"
            step="0.01"
            value={quiz.mark}
            onChange={(e) => dispatch({ type: "mark", value: e.target.value })}
          />
        </div>
        <div className="total-marks design-1">
          <label htmlFor="total">total marks</label>
          <input
            type="number"
            id="total"
            value={quiz.total}
            onChange={(e) => dispatch({ type: "total", value: e.target.value })}
          />
        </div>
        <button
          onClick={() =>
            saveEditedQuiz(quiz, quid, school, props.history, dispatch)
          }
        >
          save
        </button>
      </div>

      <div className="question-header">
        <h2>Questions</h2>
        <p>Total: {questions.length}</p>
      </div>
      <hr />
      <div className="questions-list">
        {questions.length ? (
          questions.map((question) => {
            return (
              <QuestionTile
                key={question.id}
                id={question.id}
                history={props.history}
                question={question.question}
                options={question.options}
                quiz={quid}
                school={school}
              />
            );
          })
        ) : (
          <h1>No Question</h1>
        )}
      </div>
    </section>
  );
};
export default QuizList;
