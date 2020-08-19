import React, { useReducer, useEffect } from "react";
import Timer from "../sub-components/timer";
import Dialog from "../sub-components/dialog";
import QuestionDisplayArea from "../sub-components/question-display";
import OptionLabel from "../sub-components/option-label";
import Toast from "../sub-components/toast";
import { examsReducer } from "../../utils/examstore";
import "../../css/question.css";
const myStyle = {
  backgroundColor: "green",
};
let message =
  "This marks the end of the exam!!! Good luck on checking your result";
let heading = "Congratulations";
const generateJumpers = (n, dispatch, ci) => {
  const jumpers = [];
  for (let i = 0; i < n; i++) {
    jumpers.push(
      <button
        style={ci === i ? { backgroundColor: "#ccc" } : {}}
        onClick={() => dispatch({ type: "select", index: i })}
      >
        {1 + i}
      </button>
    );
  }
  return jumpers;
};
const Examination = (props) => {
  const { state } = props.location;
  const [data, dispatch] = useReducer(examsReducer, {
    id: "",
    quizzes: [],
    questions: [],
    currentquiz: {},
    currentquestion: "",
    currentQuizIndex: 0,
    currentQuestionIndex: 0,
    showDialog: false,
    openSelector: false,
    showToast: false,
    text: "",
  });
  const LoadExam = () => {
    let url = `http://localhost:3500/school/get/exampaper?pid=${state.user}&exam=${state.quiz}&sheet=${state.sheet}`;
    if (state.retry) {
      url = `http://localhost:3500/school/exam/retry?sheet=${state.sheet}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((exam) => {
        const {
          quizzes: { quizzes, _id },
        } = exam;
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
        answer: choice,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          dispatch({ type: "toast", txt: "Saved!!!" });
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
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          dispatch({ type: "dialog" });
        }
      });
  };
  const redirect = () => {
    props.history.replace(`/menu`);
  };
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
  useEffect(LoadExam, []);
  return (
    <section className="question">
      <Toast
        isOpen={data.showToast}
        action={() => dispatch({ type: "toast", txt: "" })}
        text={data.text}
        styles={{}}
        animate={"showToast"}
        main={"toast"}
        top={{ bottom: "25px" }}
      />
      {data.showDialog && (
        <Dialog title={heading} text={message} action={redirect} />
      )}
      <div className="header">
        {/**pass the quiz name from out side and the time too */}
        <h2>{state.title}</h2>
        <button onClick={submitExam}>submit</button>
      </div>
      {
        /*question.questions.length*/ data.questions.length && (
          <Timer time={state.time} submit={submitExam} />
        )
      }
      <div className="question-selector">
        <div className="question-list">{genQuizSelectors(data.quizzes)}</div>
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
      <div className="jump">
        <div
          className="jump-cont"
          onClick={() => dispatch({ type: "openSelector" })}
        >
          Goto
        </div>
        <div className={`jumper ${data.openSelector ? "slideup" : ""}`}>
          <div className="jumper-btn">
            {generateJumpers(
              data.questions.length,
              dispatch,
              data.currentQuestionIndex
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Examination;
