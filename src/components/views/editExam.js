import React, { useReducer, useState, useEffect } from "react";
import NewExamForm from "../sub-components/examform";
const NewExam = (props) => {
  let sref = props.location.state.sref;
  let exam = props.location.state.exam;
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
        const qui = { ...state.quiz, [action.input]: action.value };
        const inList = state.todelete.some((id) => id === action.value);
        return {
          ...state,
          quiz: qui,
          todelete: inList
            ? state.todelete.filter((id) => id !== action.value)
            : [...state.todelete],
        };
      case "rmv":
        const quiz = { ...state.quiz };
        const istobecreated = state.tocreate.some((id) => id === action.value);
        delete quiz[action.input];
        return {
          ...state,
          quiz: quiz,
          todelete: [...state.todelete, action.value],
          tocreate: istobecreated
            ? state.tocreate.filter((id) => id !== action.value)
            : state.tocreate,
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
          existing: Object.values(action.quiz).map((quiz) => quiz),
        };
      case "tocreate":
        const isinList = state.tocreate.some((id) => id === action.value);
        if (isinList) return;
        return {
          ...state,
          tocreate: [...state.tocreate, action.value],
        };
    }
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    quiz: {},
    todelete: [],
    existing: [],
    tocreate: [],
  });
  const inputHandler = (e, name) => {
    dispatch({ type: "new", input: name, value: e.target.value });
  };
  const checkboxHandler = (e, name) => {
    const ids = Object.values(inputState.existing).map((id) => id);
    const wasChosed = ids.some((id) => id.toString() === e.target.value);
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
        let existing = [];
        let published = [...data.published];
        Object.values(quiz)
          .reverse()
          .forEach((qui) => {
            const selected = published.find(
              (pub) => pub.quizId.toString() === qui.toString()
            );
            const notselected = published.filter(
              (pub) => pub.quizId.toString() !== qui.toString()
            );
            published = [...notselected];
            existing.unshift(selected);
          });
        const appended = existing.concat(published);
        dispatch({ type: "prefill", exam: exams, quiz: quiz });
        setLoader(false);
        console.log("p", appended);
        setQuizzes(appended.length ? appended : data.published);
        //  console.log(data);
      });
  };
  const save = () => {
    const url = `http://localhost:3500/school/exam/save?sch=${sref}&exam=${exam}`;
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
