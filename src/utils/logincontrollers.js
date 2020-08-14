const { storeData, clearData } = require("./storage");
module.exports.inputReducer = (state, action) => {
  switch (action.type) {
    case "Input":
      return {
        ...state,
        ...action.input,
      };
    case "prefill":
      return {
        ...state,
        email: action.email,
        showToast: !state.showToast,
        password: "",
        message: action.message,
      };
    case "toast":
      return {
        ...state,
        showToast: !state.showToast,
      };
    default:
      return state;
  }
};
module.exports.textHandler = (e, name, dispatch) => {
  switch (name) {
    case "email":
      dispatch({ type: "Input", input: { email: e.target.value } });
      break;
    case "password":
      dispatch({ type: "Input", input: { password: e.target.value } });
      break;
  }
};
module.exports.login = (url, body, redirect, dispatch) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.code === 403) {
        return dispatch({
          type: "prefill",
          email: resp.email,
          message: resp.message,
        });
      }
      if (resp.code === 200) {
        storeData("school", resp.school);
        return redirect(`/dashboard`);
      }
      const ref = resp.user.ref;
      const id = resp.user.id;
      storeData("person", ref);
      redirect(`/menu`);
    });
};
