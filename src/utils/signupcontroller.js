const { storeData, clearData } = require("./storage");
module.exports.inputReducer = (state, action) => {
  switch (action.type) {
    case "Input":
      return {
        ...state,
        ...action.input,
      };
    default:
      return state;
  }
};
module.exports.textHandler = (e, name, dispatch) => {
  switch (name) {
    case "name":
      dispatch({ type: "Input", input: { name: e.target.value } });
      break;
    case "email":
      dispatch({ type: "Input", input: { email: e.target.value } });
      break;
    case "phone":
      dispatch({ type: "Input", input: { phone: e.target.value } });
      break;
    case "password":
      dispatch({ type: "Input", input: { password: e.target.value } });
      break;
    case "comfirm":
      dispatch({ type: "Input", input: { comfirm: e.target.value } });
      break;
  }
};
module.exports.submitValue = (url, details, redirect, ref = "") => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:
      !ref.length > 0
        ? JSON.stringify(details)
        : JSON.stringify({ ...details, owner: ref }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 201) {
        clearData("person");
        storeData("person", data.user.ref);
        redirect(`/menu`);
      } else if (data.code === 200) {
        storeData("school", data.school.ref);
        redirect(`/dashboard`);
      }
    });
};
