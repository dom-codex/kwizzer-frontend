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
        const sch = resp.school;
        return redirect(`/dashboard?ref=${sch.ref}`, {
          sch: sch.id,
          ref: sch.ref,
        });
      }
      const ref = resp.user.ref;
      const id = resp.user.id;
      redirect(`/menu?ref=${ref}`, { pid: id, pref: ref });
    });
};
