module.exports.inputReducer = (state, action) => {
  switch (action.type) {
    case "addQuestion":
      return {
        ...state,
        question: action.question,
      };
    case "newOption":
      return {
        ...state,
        options: {
          ...state.options,
          [action.input]: action.value,
        },
      };
    case "answer":
      return {
        ...state,
        answer: action.answer,
      };
    case "edit":
      return {
        ...state,
        question: action.question,
        options: { ...action.options },
        answer: action.answer,
      };
    default:
      return state;
  }
};
module.exports.textHandler = (e, input, name, dispatch, type) => {
  switch (name) {
    case "question":
      dispatch({ type: type, question: e.target.value });
      break;
    case "option":
      dispatch({ type: type, input: input, value: e.target.value });
      break;
    case "answer":
      dispatch({ type: type, answer: e.target.value });
      break;
  }
};
module.exports.save = (data, quid, history) => {
  const url = `http://localhost:3500/school/class/create/question?quid=${quid}`;

  if (!data.question.length) {
    //visit later
  }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.code === 201) {
        history.push(`/dashboard/quizzes/list?quid=${quid}`);
      }
    });
};
module.exports.saveEdited = (data, quid, history, quiz) => {
  const url = `http://localhost:3500/school/class/update/question?quid=${quid}`;
  if (!data.question.length) {
    //visit later
  }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.code === 201) {
        history.push(`/dashboard/quizzes/list?quid=${quiz}`);
      }
    });
};
