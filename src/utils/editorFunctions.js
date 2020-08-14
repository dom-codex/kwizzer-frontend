module.exports.retrieveValue = (key, options) => {
  const option = options.find((opt) => opt.name == key);
  if (!option) return "";
  return option.value;
};
module.exports.inputReducer = (state, action) => {
  let alreadyExisting;
  let todelete = [];
  switch (action.type) {
    case "addQuestion":
      return {
        ...state,
        question: action.value,
      };
    case "newopt": {
      return { ...state, opts: [...state.opts, action.data] };
    }
    case "opt":
      const data = state.opts.map((o) => {
        if (o.name === action.key) {
          o.value = action.value;
          return o;
        } else {
          return o;
        }
      });

      /*data[action.i] = {
        name: action.key,
        value: action.value,
        i: action.i,
        id: action.id,
      };*/
      return {
        ...state,
        opts: [...data],
      };
    case "newOption":
      return {
        ...state,
        options: {
          ...state.options,
          [action.input]: action.value,
        },
      };
    case "ans": {
      return {
        ...state,
        answer: action.answer,
      };
    }
    case "answer":
      return {
        ...state,
        answer: action.answer,
      };
    case "edit":
      return {
        ...state,
        question: action.question,
        opts: action.opts,
        answer: action.answer,
        isEdit: true,
        existing: action.existing,
      };
    case "delete":
      if (state.isEdit) {
        alreadyExisting = state.existing.some((id) => id === action.id);
        if (alreadyExisting) {
          todelete.push(action.id);
        }
      }
      const latest = state.opts.filter((option, i) => i != action.i);
      return {
        ...state,
        opts: latest,
        answer: "",
        todelete: [...state.todelete, action.id],
      };
    case "none":
      return {
        ...state,
        answer: "",
      };
    case "toast":
      return {
        ...state,
        showToast: !state.showToast,
        message: action.message,
      };
    case "success":
      return {
        ...state,
        showToast: !state.showToast,
        question: "",
        options: {},
        answer: "",
        message: action.message,
        isEdit: false,
        opts: [],
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
      if (!e.target.value.length) {
        return dispatch({ type: "none" });
      }
      dispatch({ type: type, answer: e.target.value });
      break;
  }
};
module.exports.save = (data, quid, history, school, dispatch, setoptions) => {
  const url = `http://localhost:3500/school/class/create/question?quid=${quid}`;
  const body = { ...data };
  delete body["showToast"];
  delete body["isEdit"];
  delete body["message"];
  delete body["existing"];
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.code === 403) {
        return dispatch({ type: "toast", message: resp.message });
      }
      if (resp.code === 201) {
        return dispatch({ type: "success", message: resp.message });

        //  history.push(`/dashboard/quizzes/list?quid=${quid}`, {});
      }
    });
};
module.exports.saveEdited = (data, quid, history, quiz, school) => {
  const url = `http://localhost:3500/school/class/update/question?quid=${quid}&quiz=${quiz}`;
  const body = { ...data };
  delete body["showToast"];
  delete body["isEdit"];
  delete body["message"];
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.code === 201) {
        history.push(`/dashboard/quizzes/list?quid=${quiz}`);
      }
    });
};
