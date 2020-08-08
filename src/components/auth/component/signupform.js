import React, { useReducer } from "react";
import * as SignupControllers from "../../../utils/signupcontroller";
import { canSubmit } from "../../../validators/signUp";
const UserSignup = (props) => {
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
  const url = "http://127.0.0.1:3500/user/create";
  const cansubmit = canSubmit(inputState);
  return (
    <div>
      <div className="signUp-input">
        <label for="name">Name</label>
        <input
          id="name"
          className={`${inputState.notName ? "inputerr" : ""}`}
          autoComplete="off"
          value={inputState.name}
          onInput={(e) => dispatch({ type: "name", value: e.target.value })}
          type="text"
          maxLength="30"
          placeholder="name"
          required
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
          value={inputState.email}
          onInput={(e) => dispatch({ type: "email", value: e.target.value })}
          type="email"
          placeholder="email"
          required
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
          value={inputState.phone}
          onInput={(e) => SignupControllers.textHandler(e, "phone", dispatch)}
          type="phone"
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
          value={inputState.password}
          onInput={(e) => dispatch({ type: "password", value: e.target.value })}
          minLength="5"
          placeholder="password"
          required
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
          value={inputState.comfirm}
          onInput={(e) =>
            dispatch({ type: "cpassword", value: e.target.value })
          }
          minLength="5"
          placeholder="comfirm password"
          required
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
            className="submit-btn"
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
export default UserSignup;
