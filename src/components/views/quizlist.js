import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../sub-components/header";
import "../../css/questionlist.css";
const QuestionTile = (props) => {
  const goToEditor = (question, quiz) => {
    props.history.push(`/dashboard/question/${quiz}/?new=false&qu=${question}`);
  };
  console.log(props);
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
  console.log(props);
  //retrieve necessary params
  const { search } = props.location;
  const quid = search.split("quid=")[1];
  //const sid = search.split("sid=")[1].split("&")[0];
  const getQuiz = () => {
    const url = `http://localhost:3500/school/class/questions/all?quid=${quid}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions(data.questions);
      });
  };
  useEffect(() => {
    getQuiz();
  }, []);
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
            disabled
            type="text"
            value="dominic"
            maxLength="30"
          />
          <button>edit</button>
        </div>
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
