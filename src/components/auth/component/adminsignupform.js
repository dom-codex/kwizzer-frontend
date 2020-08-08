import React, { useReducer } from "react";
import * as SignupControllers from "../../../utils/signupcontroller";
import { canSubmit } from "../../../validators/signUp";
const AdminSignup = (props) => {
  const [inputState, dispatch] = useReducer(SignupControllers.inputReducer, {
    name: "",
    notName: false,
    email: "",
    notEmail: false,
    phone: "",
    password: "",
    notPassword: false,
    comfirm: "",
    isconfirm: false,
    cansubmit: false,
  });
  const url = "http://127.0.0.1:3500/school/create";
  const { search } = props.routes.location;
  //const ref = search.split("user=")[1];
  const cansubmit = canSubmit(inputState);

  return (
    <div>
      <div className="signUp-input">
        <label for="name">Display Name</label>
        <input
          id="name"
          className={`${inputState.notName ? "inputerr" : ""}`}
          type="text"
          onInput={(e) => dispatch({ type: "name", value: e.target.value })}
          value={inputState.name}
          maxLength="30"
          placeholder="E.g Crystal academy"
        />
        {inputState.notName ? (
          <small className="input-error-indicator">
            {inputState.nameErrMsg}
          </small>
        ) : null}
      </div>
      <div className="signUp-input">
        <label for="email">Email</label>
        <input
          id="email"
          className={`${inputState.notEmail ? "inputerr" : ""}`}
          type="email"
          onInput={(e) => dispatch({ type: "email", value: e.target.value })}
          value={inputState.email}
          placeholder="email"
        />
        {inputState.notEmail ? (
          <small className="input-error-indicator">
            {inputState.emailErrMsg}
          </small>
        ) : null}
      </div>
      <div className="signUp-input">
        <label for="phone">Phone</label>
        <input
          id="phone"
          type="phone"
          onInput={(e) => SignupControllers.textHandler(e, "phone", dispatch)}
          value={inputState.phone}
          maxLength="20"
          placeholder="phone"
        />
      </div>
      <div className="signUp-input">
        <label for="password">password</label>
        <input
          id="password"
          className={`${inputState.notPassword ? "inputerr" : ""}`}
          type="password"
          onInput={(e) => dispatch({ type: "password", value: e.target.value })}
          value={inputState.password}
          minLength="5"
          placeholder="password"
        />
        {inputState.notPassword ? (
          <small className="input-error-indicator">
            {inputState.passErrMsg}
          </small>
        ) : null}
      </div>
      <div className="signUp-input">
        <label for="comfirm-password">comfirm password</label>
        <input
          id="comfirm-password"
          type="password"
          onInput={(e) =>
            dispatch({ type: "cpassword", value: e.target.value })
          }
          value={inputState.comfirm}
          minLength="20"
          placeholder="comfirm password"
        />
        {inputState.isconfirm ? (
          <small className="input-error-indicator">{inputState.cErrMsg}</small>
        ) : null}
      </div>
      <div className="btn-cont">
        {cansubmit ? (
          <button
            onClick={() =>
              SignupControllers.submitValue(
                url,
                inputState,
                props.redirect,
                dispatch
              )
            }
            class="submit-btn"
          >
            submit
          </button>
        ) : (
          <button disabled={true} className="disable">
            submit
          </button>
        )}
      </div>
    </div>
  );
};
export default AdminSignup;
