import React, { useReducer, useEffect } from "react";
import Header from "../sub-components/header";
import QuizOverlay from "../sub-components/QuizOverlay";
import "../../css/registration.css";
const Registration = (props) => {
  //get url params
  const {
    match,
    location: { search },
  } = props;
  const { sch, quiz } = match.params;
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "email":
        return {
          ...state,
          email: action.email,
        };
      case "quiz":
        return {
          ...state,
          quiz: action.quiz,
        };
      case "published":
        return {
          ...state,
          published: action.published,
        };
      case "overlay":
        return {
          ...state,
          overlay: !state.overlay,
        };
      case "subjects":
        return {
          ...state,
          subjects: [...state.subjects, action.value],
        };
      case "rmv":
        return {
          ...state,
          subjects: state.subjects.filter((id) => id !== action.value),
        };
    }
  };
  const [data, dispatch] = useReducer(inputReducer, {
    email: "",
    quiz: {},
    published: [],
    subjects: [],
    overlay: false,
  });
  const type = search.split("type=")[1];
  const register = (email) => {
    let body = { email, email };
    let url = `http://localhost:3500/school/exam/register?sch=${sch}&exam=${quiz}`;

    if (data.quiz.type === "custom") {
      body = {
        subjects: data.subjects,
        email: email,
        type: data.quiz.type,
      };
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 201) {
          alert("sucessfully  registered");
        }
      });
  };
  const getPublishedQuiz = () => {
    //pass the school refrence from outside
    const url = `http://localhost:3500/school/get/all/publishedquiz?sch=${sch}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "published",
          published: data.published,
        });
        console.log(data);
      });
  };

  const findTest = () => {
    const url = `http://localhost:3500/school/find/exam?eid=${quiz}&sch=${sch}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "quiz",
          quiz: data.quiz,
        });
        if (data.quiz.type === "custom") {
          getPublishedQuiz();
        }
      });
  };
  const checkboxHandler = (e) => {
    if (!e.target.checked) {
      return dispatch({
        type: "rmv",
        value: e.target.value,
      });
    }
    dispatch({
      type: "subjects",
      value: e.target.value,
    });
  };
  const toggleOverlay = () => {
    dispatch({ type: "overlay" });
  };
  useEffect(findTest, []);
  return (
    <section className="reg-page">
      {data.overlay && (
        <QuizOverlay
          quizzes={data.published}
          isExam={true}
          textHandler={checkboxHandler}
          state={data.subjects}
          action={toggleOverlay}
        />
      )}
      <Header />
      <div className="reg-content">
        <div className="reg-header">
          <h1>Quiz</h1>
          <h2>Application</h2>
        </div>
        <div className="reg-body">
          <div className="quiz-name">
            <h4>Name:</h4>
            <span>cloud computing</span>
          </div>
          <div className="quiz-name">
            <h4>Total Questions:</h4>
            <span>20</span>
          </div>
          <div className="quiz-name">
            <h4>Total Marks</h4>
            <span>100</span>
          </div>
          <div className="quiz-name">
            <h4>Time</h4>
            <span>2hrs 30mins</span>
          </div>
          <hr />

          <div className="candidate-email">
            {data.quiz.type === "custom" && (
              <div className="quiz-selector">
                <p>select quiz(s):</p>
                <button onClick={toggleOverlay}>select</button>
              </div>
            )}
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              onInput={(e) =>
                dispatch({
                  type: "email",
                  email: e.target.value,
                })
              }
              placeholder="enter your email address"
            />
          </div>
          <div className="reg-btn">
            <button onClick={() => register(data.email)}>Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
