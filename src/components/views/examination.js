import React, { useReducer, useEffect } from "react";
import Timer from "../sub-components/timer";
import Dialog from "../sub-components/dialog";
import QuestionDisplayArea from "../sub-components/question-display";
import OptionLabel from "../sub-components/option-label";
import { examsReducer } from "../../utils/examstore";
import "../../css/question.css";
const myStyle = {
  backgroundColor: "green",
};
let message =
  "This marks the end of the quiz!!! Good luck on checking your result";
let heading = "Congratulations";
const Examination = (props) => {
  console.log(props);
  const { state } = props.location;
  const [data, dispatch] = useReducer(examsReducer, {
    id: "",
    quizzes: [],
    questions: [],
    currentquiz: {},
    currentquestion: "",
    currentQuizIndex: 0,
    currentQuestionIndex: 0,
  });
  const LoadExam = () => {
    const url = `http://localhost:3500/school/get/exampaper?pid=${state.user.pid}&exam=${state.quiz}&sch=${state.sch}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const {
          quizzes: { quizzes, _id },
        } = data;
        dispatch({ type: "init", quizzes: quizzes, sheet: _id });
      });
  };
  const submit = (choice) => {
    const url = `http://localhost:3500/school/submit/exam/question`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quid: data.currentQuizIndex,
        quest: data.currentQuestionIndex,
        id: data.id,
        student: state.user.pid,
        answer: choice,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          alert("submitted");
        }
      });
  };
  const submitExam = () => {
    const url = `http://localhost:3500/school/submit/examination`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizzes: data.quizzes,
        sheet: data.id,
        student: state.user.pid,
      }),
    });
  };
  const redirect = () => {};
  const selectAnswer = (i, option) => {
    dispatch({ type: "answer_a_question", answer: option, submit: submit });
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
  const selectQuiz = (index) => {
    dispatch({ type: "change_quiz", index: index });
  };
  const genQuizSelectors = (quizzes) => {
    const selectors = quizzes.map((quiz, i) => {
      return <button onClick={() => selectQuiz(i)}>{quiz.title}</button>;
    });
    return selectors;
  };
  const showDialog = false;
  console.log(data);
  useEffect(LoadExam, []);
  return (
    <section className="question">
      {showDialog && (
        <Dialog title={heading} text={message} action={redirect} />
      )}
      <div className="header">
        {/**pass the quiz name from out side and the time too */}
        <h2>{state.title}</h2>
        <button onClick={submitExam}>submit</button>
      </div>
      {
        /*question.questions.length*/ false && (
          <Timer time={state.time} submit={submit} />
        )
      }
      <div className="question-selector">
        <div className="question-list">
          {genQuizSelectors(data.quizzes)}
          <button>1</button>
          <button>2</button>
        </div>
        <p>{`${data.currentQuestionIndex + 1} / ${data.questions.length}`}</p>
      </div>
      {data.questions.length && (
        <div>
          <QuestionDisplayArea
            index={data.currentQuestionIndex + 1}
            question={
              data.questions[data.currentQuestionIndex]
                .question /*question.questions[index].question*/
            }
          />
          <div className="question-options">
            <ul>
              {data.questions[data.currentQuestionIndex].options.map((q, i) => {
                return (
                  <li
                    key={i}
                    style={
                      data.questions[data.currentQuestionIndex].answer ===
                      q.option
                        ? myStyle
                        : null
                    }
                    onClick={() => selectAnswer(0, q.option)}
                  >
                    <OptionLabel i={i} />
                    <div>{q.option}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div className="question-controls">
        <button onClick={() => switchQuestion("backward")}>Prev</button>
        <button onClick={() => switchQuestion("forward")}>Next</button>
      </div>
    </section>
  );
};

export default Examination;
