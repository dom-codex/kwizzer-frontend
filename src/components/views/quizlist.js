import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import Header from "../sub-components/header";
import "../../css/questionlist.css";
import {
  inputReducer,
  textHandler,
  saveEditedQuiz,
} from "../../utils/quizEditorController";

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
              <ul>
                <li>
                  <button onClick={() => goToEditor(props.id, props.quiz)}>
                    edit
                  </button>
                </li>
              </ul>
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
    hr: "",
    min: "",
    sec: "",
    pubMode: "",
    total: "",
    mark: "",
    nQuestions: "",
  });
  //retrieve necessary params
  const { search } = props.location;
  const quid = search.split("quid=")[1];
  const { school } = props.location.state;
  //const sid = search.split("sid=")[1].split("&")[0];
  const getQuiz = () => {
    const url = `http://localhost:3500/school/class/questions/all?quid=${quid}`;
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
      <button className="create-fab">
        <Link to={`/dashboard/question/${quid}/?new=true&quid=${quid}`}>+</Link>
      </button>
      <Header />
      <div className="quiz-name-edit">
        <div className="name-quiz">
          <label for="quiz-name">Quiz name:</label>

          <input
            id="quiz-name"
            type="text"
            value={quiz.name}
            onInput={(e) => textHandler(e, "name", dispatch, "edit")}
            maxLength="30"
          />
          <button>edit</button>
        </div>
        <div className="num-to-ans">
          <label for="nQuest">To answer</label>
          <input
            type="number"
            id="nQuest"
            value={quiz.nQuestions}
            onInput={(e) => textHandler(e, "nQuestions", dispatch, "edit")}
          />
        </div>
        <div className="mark-per-question">
          <label for="perMark">Mark(s) per question</label>
          <input
            type="number"
            id="perMark"
            step="0.01"
            value={quiz.mark}
            onInput={(e) => textHandler(e, "mark", dispatch, "edit")}
          />
        </div>
        <div className="total-marks">
          <label for="total">total marks</label>
          <input
            type="number"
            id="total"
            value={quiz.total}
            onInput={(e) => textHandler(e, "total", dispatch, "edit")}
          />
        </div>
        <div className="edit-time">
          <h2>Time: </h2>
          <div className="bar"></div>
          <input
            id="hr"
            type="number"
            onInput={(e) => textHandler(e, "hr", dispatch, "edit")}
            value={quiz.hr}
            placeholder="hr"
          />
          <label for="hr">hr</label>
          <input
            id="min"
            type="number"
            value={quiz.min}
            placeholder="min"
            onInput={(e) => textHandler(e, "min", dispatch, "edit")}
          />
          <label for="min">min</label>
          <input
            id="sec"
            type="number"
            value={quiz.sec}
            placeholder="sec"
            onInput={(e) => textHandler(e, "sec", dispatch, "edit")}
          />
          <label for="s">sec</label>
          <button>edit</button>
        </div>
        <div className="publish-mode">
          <h2>Publish: </h2>

          <label for="public">Public</label>
          {quiz.pubMode === "public" ? (
            <input id="public" type="radio" value={quiz.pubMode} checked />
          ) : (
            <input
              id="public"
              type="radio"
              value="public"
              onInput={(e) => textHandler(e, "pubMode", dispatch, "edit")}
            />
          )}
          <label for="private">private</label>
          {quiz.pubMode === "private" ? (
            <input id="private" type="radio" value={quiz.pubMode} checked />
          ) : (
            <input
              id="private"
              type="radio"
              value="private"
              onInput={(e) => textHandler(e, "pubMode", dispatch, "edit")}
            />
          )}
        </div>
        <button
          onClick={() => saveEditedQuiz(quiz, quid, school, props.history)}
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
                id={question.id}
                history={props.history}
                question={question.question}
                options={question.options}
                quiz={quid}
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
