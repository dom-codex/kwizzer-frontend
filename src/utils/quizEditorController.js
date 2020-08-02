module.exports.inputReducer = (state, action) => {
  switch (action.type) {
    case "edit":
      return {
        ...state,
        [action.input]: action.value,
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
module.exports.textHandler = (e, name, dispatch, type) => {
  switch (name) {
    case "name":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "nQuestions":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "mark":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "total":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "hr":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "min":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "sec":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
    case "pubMode":
      dispatch({ type: type, input: name, value: e.target.value });
      break;
  }
};
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
        history.push(`/dashboard/quizzes?id=${schid}`, { sref: schid });
      }
    });
};
