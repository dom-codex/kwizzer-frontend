module.exports.inputReducer = (state, action) => {
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
    default:
      return state;
  }
};
module.exports.textHandler = (e, name, dispatch, type) => {};
module.exports.saveEditedQuiz = (data, quizid, schid, history) => {
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
      if (data.code === 201) {
        history.push(`/dashboard/quizzes`);
      }
    });
};
