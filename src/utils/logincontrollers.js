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
    case "email":
      dispatch({ type: "Input", input: { email: e.target.value } });
      break;
    case "password":
      dispatch({ type: "Input", input: { password: e.target.value } });
      break;
  }
};
module.exports.login = (url, body, redirect) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.code === 200) {
        const ref = resp.school.ref;
        return redirect(`/dashboard?ref=${ref}`);
      }
      const ref = resp.user;
      redirect(`/menu?ref=${ref}`);
    });
};
