import React, { useReducer, useEffect } from "react";
import NewExamForm from "../sub-components/examform";
import { validateExamForm } from "../../validators/exam";
import { fetchData } from "../../utils/storage";
const school = fetchData("school");
const NewExam = (props) => {
  //  let sref = props.location.state.sref;
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "new":
        return {
          ...state,
          [action.input]: action.value,
        };
      case "quiz":
        return {
          ...state,
          quiz: [...state.quiz, action.value],
          total: parseInt(state.total) + parseInt(action.total),
        };
      case "rmv":
        return {
          ...state,
          quiz: state.quiz.filter((id) => id !== action.value),
          total: parseInt(state.total) - parseInt(action.total),
        };
      case "switch":
        const type = !state.switch;
        return {
          ...state,
          switch: type,
          type: type ? "custom" : "standard",
        };
      case "isloading":
        return {
          ...state,
          isLoading: !state.isLoading,
        };
      case "isopen":
        return {
          ...state,
          isOpen: !state.isOpen,
        };
      case "quizzes":
        return {
          ...state,
          quizzes: action.quizzes,
        };
      case "setRetry":
        return {
          ...state,
          setRetry: !state.setRetry,
          retries: !state.setRetry === true ? state.retries : 0,
        };
      case "retries":
        return {
          ...state,
          retries: parseInt(action.value),
        };
      case "err":
        return {
          ...state,
          err: action.errors,
        };
      case "clearerr":
        return {
          ...state,
          err: {},
        };
    }
  };
  const [data, dispatch] = useReducer(inputReducer, {
    quiz: [],
    title: "",
    nquiz: "",
    total: 0,
    hr: "",
    min: "",
    sec: "",
    choice: "",
    switch: false,
    type: "standard",
    isLoading: true,
    isOpen: false,
    quizzes: [],
    setRetry: false,
    retries: 0,
    err: {},
  });
  const inputHandler = (e, name) => {
    let value = e.target.value;
    if (name === "total") {
      value = parseInt(e.target.value || 0);
    }
    dispatch({ type: "new", value: value, input: name });
  };
  const checkboxHandler = (e, name, total) => {
    if (!e.target.checked) {
      return dispatch({ type: "rmv", value: e.target.value, total: total });
    }
    dispatch({
      type: "quiz",
      input: name,
      value: e.target.value,
      total: total,
    });
  };
  const toggle = () => {
    dispatch({ type: "switch" });
  };
  const getPublishedQuiz = () => {
    //pass the school refrence from outside
    const url = `http://localhost:3500/school/get/all/publishedquiz?sch=${school}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "isloading" });
        dispatch({ type: "quizzes", quizzes: data.published });
        console.log("published", data);
      });
  };
  const save = () => {
    dispatch({ type: "clearerr" });
    const url = `http://localhost:3500/school/set/examination?sch=${school}`;
    let body = { ...data };
    delete body["quizzes"];
    delete body["isOpen"];
    delete body["isLoading"];
    delete body["switch"];
    delete body["err"];
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 403) {
          dispatch({ type: "err", errors: res.errors });
        }
      });
  };
  useEffect(() => {
    getPublishedQuiz();
  }, []);
  return (
    <section>
      <NewExamForm
        title={"Set Examination"}
        inputHandler={inputHandler}
        save={save}
        toggle={toggle}
        dispatch={dispatch}
        checkboxHandler={checkboxHandler}
        data={{
          isOpen: data.isOpen,
          isLoading: data.isLoading,
          quizzes: data.quizzes,
          setList: () => dispatch({ type: "isopen" }),
          data: data,
        }}
        isValidated={validateExamForm(data)}
      />
    </section>
  );
};

export default NewExam;
