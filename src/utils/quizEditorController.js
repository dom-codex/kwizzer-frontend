export const inputReducer = (state, action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        name: action.value,
      };
    case "mark":
      return {
        ...state,
        mark: action.value,
        total: state.nQuestions * action.value,
      };
    case "toanswer":
      return {
        ...state,
        nQuestions: action.value,
        total: state.mark * action.value,
      };
    case "total":
      return {
        ...state,
        total: action.value,
      };
    case "prefill":
      return {
        ...state,
        ...action.values,
      };
    case "toast":
      return {
        ...state,
        showToast: !state.showToast,
        message: action.message,
        hasErr: action.hasErr,
      };
    default:
      return state;
  }
};
export const textHandler = (e, name, dispatch, type) => {};
export const saveEditedQuiz = (data, quizid, schid, history, dispatch) => {
  const url = `http://localhost:3500/school/class/quiz/edit?quizid=${quizid}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 403) {
        dispatch({
          type: "toast",
          message: data.message,
          hasErr: true,
        });
      }
      if (data.code === 201) {
        dispatch({ type: "toast", message: data.message, hasErr: false });
        //history.push(`/dashboard/quizzes`);
      }
    });
};
