import React, { useReducer, useState, useEffect } from "react";
import NewExamForm from "../sub-components/examform";
const NewExam = (props) => {
  let sref = props.location.state.sref;
  let exam = props.location.state.exam;
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "new":
        return {
          ...state,
          [action.input]: action.value,
        };
      case "quiz":
        const inList = state.todelete.some((id) => id === action.value);
        return {
          ...state,
          quiz: [...state.quiz, action.value],
          todelete: inList
            ? state.todelete.filter((id) => id !== action.value)
            : [...state.todelete],
        };
      case "rmv":
        const istobecreated = state.tocreate.some(
          (id) => id.toString() === action.value
        );
        const wasChosed = state.existing.some(
          (id) => id.toString() === action.value
        );
        return {
          ...state,
          quiz: state.quiz.filter((id) => id.toString() !== action.value),
          todelete: wasChosed
            ? [...state.todelete, action.value]
            : state.todelete,
          tocreate: state.tocreate.filter(
            (id) => id.toString() !== action.value
          ),
        };
      case "prefill":
        const {
          name,
          TotalMarks,
          hours,
          minutes,
          seconds,
          nQuiz,
          resultDelivery,
        } = action.exam;
        return {
          ...state,
          title: name,
          total: TotalMarks,
          hr: hours,
          min: minutes,
          sec: seconds,
          nquiz: nQuiz,
          choice: resultDelivery,
          quiz: action.quiz,
          existing: action.quiz,
          type: action.exam.type,
        };
      case "tocreate":
        const isinList = state.tocreate.some((id) => id === action.value);
        const Waschosed = state.existing.some(
          (id) => id.toString() === action.value
        );
        if (isinList || Waschosed) return state;
        return {
          ...state,
          tocreate: [...state.tocreate, action.value],
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
    }
  };
  const [data, dispatch] = useReducer(inputReducer, {
    quiz: {},
    todelete: [],
    existing: [],
    tocreate: [],
    type: "",
    isLoading: true,
  });
  const inputHandler = (e, name) => {
    dispatch({ type: "new", input: name, value: e.target.value });
  };
  const checkboxHandler = (e, name) => {
    const wasChosed = data.quiz.some((id) => id.toString() === e.target.value);
    if (!e.target.checked) {
      dispatch({ type: "rmv", input: name, value: e.target.value });
    } else if (!wasChosed) {
      dispatch({ type: "quiz", input: name, value: e.target.value });
      dispatch({ type: "tocreate", input: name, value: e.target.value });
    } else {
      dispatch({ type: "quiz", input: name, value: e.target.value });
    }
  };
  const getPublishedQuiz = (datas) => {
    const { quiz, exams } = datas;
    //pass the school refrence from outside
    const url = `http://localhost:3500/school/get/all/publishedquiz?sch=${sref}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "prefill", exam: exams, quiz: quiz });
        dispatch({ type: "quizzes", quizzes: data.published });
        dispatch({ type: "isloading" });
      });
  };
  const save = () => {
    const url = `http://localhost:3500/school/exam/save?sch=${sref}&exam=${exam}`;
    let body = { ...data };
    delete body["quizzes"];
    delete body["isOpen"];
    delete body["isLoading"];
    delete body["switch"];

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  const fetchSingleExam = () => {
    const url = `http://localhost:3500/school/get/exam?sch=${sref}&exam=${exam}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        getPublishedQuiz(data);
      });
  };
  useEffect(() => {
    fetchSingleExam();
  }, []);
  return (
    <section>
      <NewExamForm
        title={"Edit Examination"}
        inputHandler={inputHandler}
        save={save}
        isedit={true}
        checkboxHandler={checkboxHandler}
        data={{
          isOpen: data.isOpen,
          isLoading: data.isLoading,
          quizzes: data.quizzes,
          setList: () => dispatch({ type: "isopen" }),
          data: data,
        }}
      />
    </section>
  );
};

export default NewExam;
