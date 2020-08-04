import React, { useEffect, useState, useReducer } from "react";
import Header from "../sub-components/header";
import QuestionDisplayArea from "../sub-components/question-display";
import OptionLabel from "../sub-components/option-label";
const correct = {
  backgroundColor: "green",
};
const choosed = {
  backgroundColor: "red",
};
const QuestionDisplay = (props) => {
  return (
    <div>
      {props.children}
      <QuestionDisplayArea index={props.index} question={props.question} />
      <div className="question-options">
        <ul>
          {props.options.map((q, i) => {
            const isAnswer = q.isAnswer;
            const chosen = q.option === props.answer;
            return (
              <li style={isAnswer ? correct : chosen ? choosed : null}>
                <OptionLabel i={i} />
                <div>{q.option}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="control-buttons">
        <button onClick={() => props.nav("backward")}>prev</button>
        <button onClick={() => props.nav("forward")}>next</button>
      </div>
    </div>
  );
};
const Solutions = (props) => {
  const { question, isExam } = props.location.state;
  const [questionPaper, setQuestionpaper] = useState([]);
  const questionReducer = (state, action) => {
    let index = 0;
    switch (action.type) {
      case "load":
        return {
          ...state,
          currentQuestionIndex: 0,
          currentQuizIndex: 0,
          quizzes: action.quizzes,
          questions: action.quizzes[0].questions,
          question: action.quizzes[0].questions[0],
        };
      case "currentQuestion":
        return {
          ...state,
        };
      case "switch":
        return {
          ...state,
          currentQuizIndex: action.quid,
          questions: state.quizzes[action.quid].questions,
          currentQuestionIndex: 0,
          question: state.quizzes[action.quid].questions[0],
        };
      case "viewQuestion":
        return {
          ...state,
        };
      case "next":
        index = state.currentQuestionIndex + 1;
        return {
          ...state,
          currentQuestionIndex: index,
          question: state.quizzes[state.currentQuizIndex].questions[index],
        };
      case "prev":
        index = state.currentQuestionIndex - 1;
        return {
          ...state,
          currentQuestionIndex: index,
          question: state.quizzes[state.currentQuizIndex].questions[index],
        };
    }
  };
  const [data, dispatch] = useReducer(questionReducer, {
    quizzes: [],
    currentQuestionIndex: 0,
    currentQuizIndex: 0,
    questions: [],
    question: {},
  });
  const getQuestionPaper = () => {
    let url = `http://localhost:3500/school/get/student/questionpaper?paper=${question}`;
    if (isExam) {
      url = `http://localhost:3500/school/exam/result?sheet=${question}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (isExam) {
          return dispatch({ type: "load", quizzes: data.solution.quizzes });
        }
        // setQuestionpaper(data.questions.questions);
      });
  };
  const genQuizSelectors = (quizzes) => {
    const selectors = quizzes.map((quiz, i) => {
      return (
        <button onClick={() => dispatch({ type: "switch", quid: i })}>
          {quiz.title}
        </button>
      );
    });
    return selectors;
  };
  const switchQuestion = (direction) => {
    if (
      direction === "forward" &&
      data.currentQuestionIndex < data.questions.length - 1
    ) {
      dispatch({ type: "next" });
    } else if (direction === "backward" && data.currentQuestionIndex > 0) {
      dispatch({ type: "prev" });
    }
  };
  useEffect(getQuestionPaper, []);
  return (
    <section>
      <Header />
      <div className="question-paper">
        {data.questions.length && (
          <QuestionDisplay
            index={data.currentQuestionIndex + 1}
            question={data.question.question}
            options={data.question.options}
            answer={data.question.answer}
            answered={data.question.isAnswered}
            nav={switchQuestion}
          >
            {isExam ? genQuizSelectors(data.quizzes) : null}
          </QuestionDisplay>
        )}
        {/*data.questions.length
          ? data.questions.map((paper, i) => {
              return (
                <QuestionDisplay
                  key={i}
                  index={i + 1}
                  question={paper.question}
                  options={paper.options}
                  answer={paper.answer}
                  answered={paper.answered}
                />
              );
            })
          : null*/}
      </div>
    </section>
  );
};
export default Solutions;
