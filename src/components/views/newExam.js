import React, { useReducer, useState, useEffect } from "react";
import NewExamForm from "../sub-components/examform";
const NewExam = (props) => {
  let sref = props.location.state.sref;
  const [isOpen, setList] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
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
          quiz: {
            ...state.quiz,
            [action.input]: action.value,
          },
        };
      case "rmv":
        const quiz = { ...state.quiz };
        delete quiz[action.input];
        return {
          ...state,
          quiz: quiz,
        };
      case "switch":
        const type = !state.switch;
        return {
          ...state,
          switch: type,
          type: type ? "custom" : "standard",
        };
    }
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    quiz: {},
    switch: false,
    type: "standard",
  });
  const inputHandler = (e, name) => {
    dispatch({ type: "new", input: name, value: e.target.value });
  };
  const checkboxHandler = (e, name) => {
    if (!e.target.checked) {
      return dispatch({ type: "rmv", input: name });
    }
    dispatch({ type: "quiz", input: name, value: e.target.value });
  };
  const toggle = () => {
    dispatch({ type: "switch" });
  };
  const getPublishedQuiz = () => {
    //pass the school refrence from outside
    const url = `http://localhost:3500/school/get/all/publishedquiz?sch=${sref}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setLoader(false);
        setQuizzes(data.published);
        console.log(data);
      });
  };
  const save = () => {
    const url = `http://localhost:3500/school/set/examination?sch=${sref}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputState),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
        checkboxHandler={checkboxHandler}
        data={{
          isOpen: isOpen,
          isLoading: isLoading,
          quizzes: quizzes,
          setList: setList,
          inputState: inputState,
        }}
      />
    </section>
  );
};

export default NewExam;
