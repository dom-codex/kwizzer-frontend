import React, { useReducer } from "react";
import Toast from "../../sub-components/toast";
import {
  textHandler,
  inputReducer,
  login,
} from "../../../utils/logincontrollers";
const error = {
  backgroundColor: "red",
  color: "#fff",
};
const LoginForm = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    email: "",
    password: "",
    showToast: false,
    message: "invalid login details",
  });
  const url = `${process.env.REACT_APP_HEAD}/user/login`;

  return (
    <div className="login-content">
      <Toast
        isOpen={inputState.showToast}
        action={() => dispatch({ type: "toast" })}
        text={inputState.message}
        styles={error}
        animate={"showToast"}
        main={"toast"}
        top={{ bottom: "25px" }}
      />
      <div className="login-input">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => textHandler(e, "email", dispatch)}
          value={inputState.email}
          placeholder="email"
        />
      </div>
      <div className="login-input">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => textHandler(e, "password", dispatch)}
          value={inputState.password}
          minLength="5"
          placeholder="password"
        />
      </div>
      <div className="btn-cont">
        <button
          class="submit-btn"
          onClick={() => login(url, inputState, props.redirect, dispatch)}
        >
          submit
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
